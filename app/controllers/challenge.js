import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

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
      console.log(model.toJSON());
    },
    updateChallenge() {
      //TODO
    },
    newCandidate() {
      //TODO
    }
  }
});
