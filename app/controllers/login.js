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
    githubLogin() {
      if (!this.get("session").isAuthenticated)
        this.get("session").authenticate("authenticator:torii", "github");
      if (this.get("session").isAuthenticated) this.transitionToRoute("home");
    },
    emailLogin() {
      if (!this.get("session").isAuthenticated)
        this.get("session").authenticate("authenticator:email", "email");
      if (this.get("session").isAuthenticated) this.transitionToRoute("home");
    },
    toggleSignUp() {
      this.toggleProperty("showSignUp");
    },
    createUser() {
      // POST users
      Ember.$.ajax({
        url: "api.tstfy.co/users",
        type: "POST",
        data: JSON.stringify({
          username: "",
          email: "",
          password: "",
          f_name: "",
          l_name: "",
          role: 0
        })
      })
        .then(function(resp) {
          // handle your server response here
          console.log(resp);
        })
        .then(this.actions.emailLogin)
        .catch(function(error) {
          // handle errors here
          console.log(error);
        });
      // then emailLogin()
    }
  }
});
