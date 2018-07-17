import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  showModal: false,
  session: service(),
  actions: {
    toggleModal() {
      this.toggleProperty("showModal");
    },
    logout() {
      this.get("session").invalidate();
    }
  }
});
