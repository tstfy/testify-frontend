import Controller from '@ember/controller';
import { inject as service } from "@ember/service";

export default Controller.extend({
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
      //TODO
    }
	}
});
