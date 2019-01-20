import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
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
    saveChallenge() {
    //Include POST call somewhere to save challenge
    },
    logout() {
      this.get("session").invalidate();
    }
  }
});
