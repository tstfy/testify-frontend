import Component from "@ember/component";
import $ from "jquery";
import { inject as service } from "@ember/service";
import { run } from "@ember/runloop";
import config from "../config/environment";

export default Component.extend({
  router: service(),
  actions: {
    copyToClipboard(text) {
      var dummyElement = document.createElement("input");
      document.body.appendChild(dummyElement);
      dummyElement.setAttribute("value", text);
      dummyElement.select();
      document.execCommand("copy");
      document.body.removeChild(dummyElement);
    },
    inviteCandidate(candidate_id, employer_id) {
      console.log("Invite Candidate: ", candidate_id, this.router);
      this._super(...arguments);
      $.ajax({
        url: config.APP.baseURL + `/challenges/${employer_id}/invite`,
        type: "POST",
        crossDomain: true,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
          candidate_ids: [candidate_id],
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
            this.send("clearFields");
            this.refreshCurrentRoute();
          }
        })
        .catch(error => {
          // handle errors here
          this.set("isLoading", false);
          this.set("error", JSON.parse(error));
          console.log("Invite Candidate Error: ", JSON.parse(error));
        });
    }
  }
});
