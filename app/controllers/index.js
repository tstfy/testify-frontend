import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  isActive: false,
  session: service(),
  actions: {
    toggleModal() {
      this.toggleProperty("isActive");
    }
  }
});
