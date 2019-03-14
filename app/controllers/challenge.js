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
      // let { title, description, category, employer } = this.getProperties(
      //   "title",
      //   "description",
      //   "category",
      //   "employer"
      // );
      // console.log("Create Challenge: ", title, description, category, employer);
      // //Include POST call somewhere to save challenge
      // this._super(...arguments);
      // this.set("isLoading", true);
      // $.ajax({
      //   url: config.APP.baseURL + "/challenges",
      //   type: "POST",
      //   crossDomain: true,
      //   contentType: "application/json;charset=UTF-8",
      //   data: JSON.stringify({
      //     description: description,
      //     category: category,
      //     employer: employer,
      //     title: title
      //   })
      // })
      //   .then(resp => {
      //     // handle your server response here
      //     run(() => {
      //       // begin loop
      //       // Code that results in jobs being scheduled goes here
      //       this.set("isLoading", false);
      //       console.log("Create Challenge Response: ", resp);
      //     }); // end loop, jobs are flushed and executed
      //     if (!resp.repo_link) {
      //       throw JSON.stringify(`Create Challenge Failed: ${resp}`);
      //     } else {
      //       this.toggleProperty("showModal");
      //       this.toggleProperty("showNewChallenge");
      //       this.send("clearFields");
      //       this.refreshCurrentRoute();
      //     }
      //   })
      //   .catch(error => {
      //     // handle errors here
      //     this.set("isLoading", false);
      //     this.set("error", JSON.parse(error));
      //     console.log("Create Challenge Error: ", JSON.parse(error));
      //   });
    },
    newCandidate() {
      this._super(...arguments);
      console.log(this.model.candidates);
      let { email, f_name, l_name } = this.getProperties(
        "email",
        "f_name",
        "l_name"
      );
      console.log("Add Candidate: ", email, f_name, l_name);
      //Include POST call somewhere to save challenge
      this.set("isLoading", true);
      $.ajax({
        url:
          config.APP.baseURL +
          `/challenges/${
            this.session.data.authenticated.user.employer_id
          }/candidates`,
        type: "POST",
        crossDomain: true,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
          email: email,
          f_name: f_name,
          l_name: l_name
        })
      })
        .then(resp => {
          // handle your server response here
          run(() => {
            // begin loop
            // Code that results in jobs being scheduled goes here
            this.set("isLoading", false);
            console.log("Add Candidate Response: ", resp);
          }); // end loop, jobs are flushed and executed
          if (!resp[0].last_modified) {
            throw JSON.stringify(`Add Candidate Failed: ${resp}`);
          } else {
            this.send("toggleNewCandidate");
            this.send("refreshModel");
          }
        })
        .catch(error => {
          // handle errors here
          this.set("isLoading", false);
          this.set("error", JSON.parse(error));
          console.log("Add Candidate Error: ", JSON.parse(error));
        });
    },
    copyToClipboard(text) {
      var dummyElement = document.createElement("input");
      document.body.appendChild(dummyElement);
      dummyElement.setAttribute("value", text);
      dummyElement.select();
      document.execCommand("copy");
      document.body.removeChild(dummyElement);
    },
    refreshModel: function() {
      this._super(...arguments);
      $.ajax({
        url:
          config.APP.baseURL +
          "/challenges/candidates?cid=" +
          this.model.challenges.challenge_id,
        type: "GET",
        crossDomain: true,
        contentType: "application/json;charset=UTF-8"
      })
        .then(resp => {
          this.set("num_candidates", resp.data.length);
          console.log("num_candidates ", this.num_candidates);
          this.get("store").pushPayload("candidate", resp);
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
