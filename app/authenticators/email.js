import Base from "ember-simple-auth/authenticators/base";
import { inject as service } from "@ember/service";

export default Base.extend({
  restore(data) {
    console.log(data);
  },
  ajax: service(),
  authenticate(...args) {
    const ajax = this.get("ajax");
    console.log("email authenticate: ", args);
    return ajax
      .request("http://api.tstfy.co/login", {
        type: "POST",
        crossDomain: true,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
          username: args[0][0],
          password: args[0][1]
        })
      })
      .then(response => {
        console.log("email authenticate response ", response);
        if (response != "LOGIN SUCCESS") throw new Error(response);
        return {
          access_token: JSON.parse(response),
          provider: "email"
        };
      })
      .catch(error => {
        console.log("email authenticate error ", error);
      });
  },
  invalidate(data) {
    console.log(data);
  }
});
