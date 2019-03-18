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
  validUsername(username) {
    const usernameRegex = RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);
    return usernameRegex.test(username);
  },
  validEmail(email) {
    const emailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    return emailRegex.test(email);
  },
  validPassword(password) {
    const passwordRegex = new RegExp("(?=.{6,}).*", "g");
    return passwordRegex.test(password);
  },
  validConfirmPassword(password, confirm_password) {
    const passwordRegex = new RegExp("(?=.{6,}).*", "g");
    return passwordRegex.test(confirm_password) && password == confirm_password;
  },
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
      if (!this.validUsername(this.username)) {
        this.set("signupValid", false);
        this.set("error", "Username Invalid");
      } else if (!this.validEmail(this.email)) {
        this.set("signupValid", false);
        this.set("error", "Invalid Email");
      } else if (!this.validPassword(this.password)) {
        this.set("signupValid", false);
        this.set("error", "Invalid Password");
      } else if (
        !this.validConfirmPassword(this.password, this.confirm_password)
      ) {
        this.set("signupValid", false);
        this.set("error", "Invalid Confirm Password");
      } else if (
        !(
          this.username &&
          this.password &&
          this.company &&
          this.confirm_password &&
          this.first_name &&
          this.last_name &&
          this.email
        )
      ) {
        this.set("signupValid", false);
        this.set("error", "Please make sure all fields are correct!");
      } else {
        this.set("signupValid", true);
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
        this.set("error", "");
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
          this.send("snackText", this.error);
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
