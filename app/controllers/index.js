import Controller from "@ember/controller";

export default Controller.extend({
  isActive: false,
  isLoggedIn: false,
  actions: {
    toggleModal() {
      this.toggleProperty("isActive");
    },
    checkLoginAuth() {
      this.toggleProperty("isLoggedIn");
      this.transitionTo("about");
    }
  }
});
