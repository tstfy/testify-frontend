import Base from "ember-simple-auth/authenticators/base";
import { inject as service } from "@ember/service";

export default Base.extend({
  ajax: service(),
  restore: function(data) {
    return new Promise(function(resolve, reject) {
      console.log("email session: ", data);
      if (data.access_token) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  authenticate(...args) {
    const ajax = this.get("ajax");
    const data = JSON.stringify({
      username: args[0][0],
      password: args[0][1]
    });
    console.log("email authenticate args: ", data);
    return new Promise(function(resolve, reject) {
      ajax
        .request("http://api.tstfy.co/login", {
          type: "POST",
          crossDomain: true,
          contentType: "application/json;charset=UTF-8",
          data: data
        })
        .then(
          function(response) {
            console.log("email authenticate response ", response);
            resolve({
              access_token: "1234567889",
              provider: "api"
            });
          },
          function(xhr, status, error) {
            console.log("email authenticate error ", xhr, status, error);
            reject(xhr.responseJSON || xhr.responseText);
          }
        );
    });
  }
});
