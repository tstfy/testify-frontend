import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  showModal: false,
  showMenu: false,
  session: service(),
  actions: {
    toggleMenu() {
      this.toggleProperty("showMenu");
    },
    toggleModal() {
      this.toggleProperty("showModal");
    },
    logout() {
      this.get("session").invalidate();
    }
  }
});
