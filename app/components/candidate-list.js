import Component from "@ember/component";
import $ from "jquery";
import { inject as service } from "@ember/service";
import { run } from "@ember/runloop";
import config from "../config/environment";

export default Component.extend({
  router: service(),
  snackText: "",
  actions: {
    snackText(text) {
      var x = document.getElementById("snackbar");
      this.set("snackText", text);
      // Add the "show" class to DIV
      x.className = "show";

      // After 3 seconds, remove the show class from DIV
      setTimeout(function() {
        x.className = x.className.replace("show", "");
      }, 3000);
    },
    copyToClipboard(text) {
      var dummyElement = document.createElement("input");
      document.body.appendChild(dummyElement);
      dummyElement.setAttribute("value", text);
      dummyElement.select();
      document.execCommand("copy");
      document.body.removeChild(dummyElement);
    },
    inviteCandidate(candidate, employer_id, challenge_id) {
      console.log("Invite Candidate: ", candidate.candidate_id, this.router);
      this._super(...arguments);
      $.ajax({
        url: config.APP.baseURL + `/challenges/${challenge_id}/invite`,
        type: "POST",
        crossDomain: true,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
          candidate_ids: [candidate.candidate_id],
          employer_id: employer_id
        })
      })
        .then((resp, textStatus, xhr) => {
          // handle your server response here
          run(() => {
            // begin loop
            // Code that results in jobs being scheduled goes here
            console.log("Invite Candidate Response: ", resp, textStatus, xhr);
          }); // end loop, jobs are flushed and executed
          if (xhr.status != 200) {
            throw JSON.stringify(`Invite Candidate Failed: ${resp}`);
          } else {
            this.toggleProperty("showModal");
            this.toggleProperty("showNewChallenge");
            this.send(
              "snackText",
              `Invited ${candidate.f_name} ${candidate.l_name}`
            );
            this.refreshCurrentRoute();
          }
        })
        .catch(error => {
          // handle errors here
          this.set("isLoading", false);
          this.send(
            "snackText",
            `Invite Candidate Error: ${JSON.parse(error)}`
          );
          this.set("error", JSON.parse(error));
          console.log("Invite Candidate Error: ", JSON.parse(error));
        });
    },
    statusChanged(challenge_id, candidate_id, status) {
      console.log(challenge_id, candidate_id, status.target.value);
      this._super(...arguments);
      $.ajax({
        url:
          config.APP.baseURL +
          `/challenges/${challenge_id}/candidates/${candidate_id}`,
        type: "PUT",
        crossDomain: true,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
          status: status.target.value
        })
      })
        .then((resp, textStatus, xhr) => {
          // handle your server response here
          run(() => {
            // begin loop
            // Code that results in jobs being scheduled goes here
            console.log("Updated Status Response: ", resp, textStatus, xhr);
          }); // end loop, jobs are flushed and executed
          if (xhr.status != 200) {
            throw JSON.stringify(`Updated Status Failed: ${resp}`);
          } else {
            this.send(
              "snackText",
              `Updated Status For ${candidate.f_name} ${candidate.l_name}`
            );
            this.refreshCurrentRoute();
          }
        })
        .catch(error => {
          // handle errors here
          this.set("isLoading", false);
          this.send("snackText", `Updated Status Error JSON.parse(error)`);
          this.set("error", JSON.parse(error));
          console.log("Invite Candidate Error: ", JSON.parse(error));
        });
    }
  }
});
