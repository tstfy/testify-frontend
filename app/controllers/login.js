import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  isActive: false,
  showSignUp: false,
  session: service(),
  actions: {
    toggleModal() {
      this.toggleProperty("isActive");
    },
    login() {
      if (!this.get("session").isAuthenticated)
        this.get("session").authenticate("authenticator:torii", "github");
      if (this.get("session").isAuthenticated) this.transitionToRoute("home");
    },
    toggleSignUp() {
      this.toggleProperty("showSignUp");
    },
    createUser() {
      //TODO
    }
  }
});
