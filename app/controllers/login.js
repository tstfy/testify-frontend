import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import $ from "jquery";

export default Controller.extend({
  isLoading: false,
  showSignUp: false,
  username: "",
  email: "",
  password: "",
  confirm_password: "",
  first_name: "",
  last_name: "",
  company: "",
  error: "",
  session: service(),
  actions: {
    clearFields() {
      this.set("username", "");
      this.set("email", "");
      this.set("password", "");
      this.set("confirm_password", "");
      this.set("first_name", "");
      this.set("last_name", "");
      this.set("company", "");
      this.set("error", "");
    },
    githubLogin() {
      if (!this.get("session").isAuthenticated) {
        this.get("session")
          .authenticate("authenticator:torii", "github")
          .then(() => {
            if (this.get("session").isAuthenticated) {
              this.transitionToRoute("home");
            }
          });
      }
    },
    emailLogin(...userData) {
      this.set("isLoading", true);
      console.log("EMAIL LOGIN " + userData);
      if (!this.get("session").isAuthenticated) {
        this.get("session")
          .authenticate("authenticator:email", userData)
          .then(() => {
            this.set("isLoading", false);
            if (this.get("session").isAuthenticated) {
              this.transitionToRoute("home");
            }
          })
          .catch(reason => {
            this.set("isLoading", false);
            alert(reason.error || reason);
            this.set("errorMessage", reason.error || reason);
          });
      }
    },
    toggleSignUp() {
      this.send("clearFields");
      this.toggleProperty("showSignUp");
    },
    createUser() {
      // POST users
      this._super(...arguments);
      this.set("isLoading", true);
      $.ajax({
        url: "http://api.tstfy.co/users",
        type: "POST",
        crossDomain: true,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password,
          f_name: this.first_name,
          l_name: this.last_name,
          company: this.company
        })
      })
        .then(resp => {
          // handle your server response here
          this.set("isLoading", false);
          console.log("CREATE USER RESPONSE: ", resp);
          if (resp != "LOGIN SUCCESS") {
            throw JSON.stringify(`Sign Up Failed: ${resp}`);
          } else {
            return resp;
          }
        })
        .then(resp => this.send("emailLogin", resp))
        .catch(error => {
          // handle errors here
          this.set("isLoading", false);
          this.set("error", JSON.parse(error));
          console.log("CREATE USER ERROR: ", JSON.parse(error));
        });
    }
  }
});
