import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import config from "../config/environment";
import $ from "jquery";
import { run } from "@ember/runloop";

export default Controller.extend({
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
      let { title, description, category, employer } = this.getProperties(
        "title",
        "description",
        "category",
        "employer"
      );
      console.log("Create Challenge: ", title, description, category, employer);
      //Include POST call somewhere to save challenge
      this._super(...arguments);
      this.set("isLoading", true);
      $.ajax({
        url: config.APP.baseURL + "/challenges",
        type: "POST",
        crossDomain: true,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
          description: description,
          category: category,
          employer: employer,
          title: title
        })
      })
        .then(resp => {
          // handle your server response here
          run(() => {
            // begin loop
            // Code that results in jobs being scheduled goes here
            this.set("isLoading", false);
            console.log("Create Challenge Response: ", resp);
          }); // end loop, jobs are flushed and executed
          if (!resp.repo_link) {
            throw JSON.stringify(`Create Challenge Failed: ${resp}`);
          } else {
            this.toggleProperty("showModal");
            this.toggleProperty("showNewChallenge");
            this.send("clearFields");
            this.refreshCurrentRoute();
          }
        })
        .catch(error => {
          // handle errors here
          this.set("isLoading", false);
          this.set("error", JSON.parse(error));
          console.log("Create Challenge Error: ", JSON.parse(error));
        });
    },
    newCandidate() {
      //TODO
      let { title, description, category, employer } = this.getProperties(
        "title",
        "description",
        "category",
        "employer"
      );
      console.log("Create Challenge: ", title, description, category, employer);
      //Include POST call somewhere to save challenge
      this._super(...arguments);
      this.set("isLoading", true);
      $.ajax({
        url: config.APP.baseURL + "/challenges",
        type: "POST",
        crossDomain: true,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
          description: description,
          category: category,
          employer: employer,
          title: title
        })
      })
        .then(resp => {
          // handle your server response here
          run(() => {
            // begin loop
            // Code that results in jobs being scheduled goes here
            this.set("isLoading", false);
            console.log("Create Challenge Response: ", resp);
          }); // end loop, jobs are flushed and executed
          if (!resp.repo_link) {
            throw JSON.stringify(`Create Challenge Failed: ${resp}`);
          } else {
            this.toggleProperty("showModal");
            this.toggleProperty("showNewChallenge");
            this.send("clearFields");
            this.refreshCurrentRoute();
          }
        })
        .catch(error => {
          // handle errors here
          this.set("isLoading", false);
          this.set("error", JSON.parse(error));
          console.log("Create Challenge Error: ", JSON.parse(error));
        });
    }
  }
});
