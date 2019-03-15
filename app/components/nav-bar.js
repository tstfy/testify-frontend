import Component from "@ember/component";
import { inject as service } from "@ember/service";
import $ from "jquery";
import { run } from "@ember/runloop";
import config from "../config/environment";

export default Component.extend({
  isLoading: false,
  showModal: false,
  showMenu: false,
  showNewChallenge: false,
  session: service(),
  actions: {
    toggleMenu() {
      this.toggleProperty("showMenu");
    },
    toggleModal() {
      this.toggleProperty("showModal");
    },
    toggleNewChallenge() {
      this.toggleProperty("showModal");
      this.toggleProperty("showNewChallenge");
    },
    setSelection(value) {
      this.set("category", value);
    },
    clearFields() {
      this.set("category", "");
      this.set("description", "");
      this.set("employer", "");
      this.set("title", "");
    },
    createChallenge() {
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
          employer: this.session.data.authenticated.user.employer_id,
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
    logout() {
      this.get("session").invalidate();
    }
  }
});
