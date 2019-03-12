import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import $ from "jquery";

export default Controller.extend({
  isActive: false,
  showSignUp: false,
  username: "",
  password: "",
  email: "",
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
    emailLogin(...userData) {
      console.log("EMAIL LOGIN " + userData);
      if (!this.get("session").isAuthenticated)
        this.get("session").authenticate("authenticator:email", userData);
      console.log(this.get("session"));
      if (this.get("session").isAuthenticated) this.transitionToRoute("home");
    },
    toggleSignUp() {
      this.toggleProperty("showSignUp");
    },
    createUser() {
      // POST users
      $.ajax({
        url: "http://api.tstfy.co/users",
        type: "POST",
        crossDomain: true,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password,
          f_name: "Jeryy",
          l_name: "ASMDPAS"
        })
      })
        .then(function(resp) {
          // handle your server response here
          console.log("CREATE USER RESPONSE: " + resp);
          return resp;
        })
        .then(resp => this.send("emailLogin", resp))
        .catch(function(error) {
          // handle errors here
          console.log("CREATE USER ERROR: " + error);
        });
    }
  }
});
