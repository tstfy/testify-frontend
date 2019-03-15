import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import config from "../config/environment";
import $ from "jquery";
import { run } from "@ember/runloop";

export default Controller.extend({
  router: service(),
  showModalChallenge: false,
  showUpdateChallenge: false,
  showNewCandidate: false,
  session: service(),
  actions: {
    toggleUpdateChallenge() {
      this.toggleProperty("showModalChallenge");
      this.toggleProperty("showUpdateChallenge");
    },
    toggleNewCandidate() {
      this.toggleProperty("showModalChallenge");
      this.toggleProperty("showNewCandidate");
    },
    updateChallenge() {
      //TODO
    },
    newCandidate() {
      this._super(...arguments);
      console.log(this.model, this.model.challenges.challenge_id);
      let { email, f_name, l_name } = this.getProperties(
        "email",
        "f_name",
        "l_name"
      );
      console.log("Add Candidate: ", email, f_name, l_name);
      this.set("isLoading", true);
      $.ajax({
        url:
          config.APP.baseURL +
          `/challenges/${this.model.challenges.challenge_id}/candidates`,
        type: "POST",
        crossDomain: true,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
          email: email,
          f_name: f_name,
          l_name: l_name
        })
      })
        .then((resp, textStatus, xhr) => {
          // handle your server response here
          run(() => {
            // begin loop
            // Code that results in jobs being scheduled goes here
            this.set("isLoading", false);
            console.log("Add Candidate Response: ", resp, textStatus, xhr);
          }); // end loop, jobs are flushed and executed
          if (!resp[0].last_modified) {
            throw JSON.stringify(`Add Candidate Failed: ${resp}`);
          } else {
            this.send("toggleNewCandidate");
            this.send("refreshModel", this.model.challenges.challenge_id);
          }
        })
        .catch(error => {
          // handle errors here
          this.set("isLoading", false);
          this.set("error", JSON.parse(error));
          console.log("Add Candidate Error: ", JSON.parse(error));
        });
    },
    inviteAllCandidates(candidates) {
      let invites = [];
      candidates.forEach(candidate => {
        invites.push(candidate.candidate_id);
      });
      console.log("Invite All Candidate: ", invites);
      this._super(...arguments);
      $.ajax({
        url:
          config.APP.baseURL +
          `/challenges/${
            this.session.data.authenticated.user.employer_id
          }/invite`,
        type: "POST",
        crossDomain: true,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
          candidate_ids: invites,
          employer_id: this.session.data.authenticated.user.employer_id
        })
      });
    },
    refreshModel: function(challenge_id) {
      this._super(...arguments);
      $.ajax({
        url: config.APP.baseURL + "/challenges/candidates?cid=" + challenge_id,
        type: "GET",
        crossDomain: true,
        contentType: "application/json;charset=UTF-8"
      })
        .then(resp => {
          run(() => {
            // begin loop
            // Code that results in jobs being scheduled goes here
            this.set("num_candidates", resp.data.length);
            console.log("num_candidates ", this.num_candidates);
            this.get("store").pushPayload("candidate", resp);
          }); // end loop, jobs are flushed and executed
        })
        .catch(error => {
          // handle errors here
          this.set("isLoading", false);
          this.set("error", JSON.parse(error));
          console.log("Refresh Candidate Error: ", JSON.parse(error));
        });
    }
  }
});
