import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import $ from "jquery";
import { run } from "@ember/runloop";
import config from "../config/environment";

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
    validateSignUpFields() {
      if (
        this.username &&
        this.password &&
        this.confirm_password &&
        this.first_name &&
        this.last_name &&
        this.company &&
        this.email &&
        this.password === this.confirm_password &&
        this.password.length >= 6
      ) {
        this.set("signupValid", true);
      } else {
        this.set("signupValid", false);
      }
    },
    validateLoginFields() {
      if (this.username && this.password) {
        this.set("loginValid", true);
      } else {
        this.set("loginValid", false);
      }
    },
    githubLogin() {
      if (!this.get("session").isAuthenticated) {
        this.get("session")
          .authenticate("authenticator:torii", "github")
          .then(() => {
            if (this.get("session").isAuthenticated) {
              this.transitionToRoute(
                "home",
                this.session.data.authenticated.user.employer_id
              );
            }
          });
      }
    },
    emailLogin(...userData) {
      this.send("validateLoginFields");
      if (this.loginValid) {
        this.set("isLoading", true);
        console.log("email login :");
        console.log(userData);
        if (!this.get("session").isAuthenticated) {
          this.get("session")
            .authenticate("authenticator:email", this.username, this.password)
            .then(() => {
              this.set("isLoading", false);
              if (this.get("session").isAuthenticated) {
                this.transitionToRoute(
                  "home",
                  this.session.data.authenticated.user.employer_id
                );
              }
            })
            .catch(() => {
              this.set("isLoading", false);
              this.send("snackText", "Incorrect Username/Password!");
            });
        }
      } else {
        run(() => {
          // begin loop
          // Code that results in jobs being scheduled goes here
          this.send("snackText", "Please make sure all fields are correct!");
        }); // end loop, jobs are flushed and executed
      }
    },
    toggleSignUp() {
      this.send("clearFields");
      this.toggleProperty("showSignUp");
    },
    createUser() {
      // POST users
      this.send("validateSignUpFields");
      if (this.signupValid) {
        this._super(...arguments);
        this.set("isLoading", true);
        $.ajax({
          url: config.APP.baseURL + "/users",
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
            run(() => {
              // begin loop
              // Code that results in jobs being scheduled goes here
              this.set("isLoading", false);
            }); // end loop, jobs are flushed and executed
            if (!resp.employer_id) {
              throw JSON.stringify(JSON.stringify(resp));
            } else {
              console.log("Sign Up Success: ", resp);
              return resp;
            }
          })
          .then(resp => this.send("emailLogin", resp))
          .catch(error => {
            // handle errors here
            console.log("Sign Up Failed: ", JSON.parse(error));
            this.set("isLoading", false);
            this.send("snackText", JSON.parse(error));
          });
      } else {
        run(() => {
          // begin loop
          // Code that results in jobs being scheduled goes here
          this.send("snackText", "Please make sure all fields are correct!");
        }); // end loop, jobs are flushed and executed
      }
    },
    snackText(text) {
      var x = document.getElementById("snackbar");
      this.set("error", text);
      // Add the "show" class to DIV
      x.className = "show has-text-danger";

      // After 3 seconds, remove the show class from DIV
      setTimeout(function() {
        x.className = x.className.replace("show", "");
      }, 3000);
    }
  }
});
