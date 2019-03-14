import Route from "@ember/routing/route";
import RSVP from "rsvp";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import $ from "jquery";
import config from "../config/environment";

export default Route.extend(AuthenticatedRouteMixin, {
  challengeid: 1,
  model(params) {
    return RSVP.hash({
      challenges: this.store
        .query("challenge", {
          eid: this.session.data.authenticated.user.employer_id
        })
        .then(challenges => {
          challenges.filter(challenge => {
            this.set("challengeid", challenge.challengeid);
            return params.id === challenge.challengeid;
          });
        }),
      candidates: $.ajax({
        url:
          config.APP.baseURL + "/challenges/candidates?cid=" + this.challengeid,
        type: "GET",
        crossDomain: true,
        contentType: "application/json;charset=UTF-8"
      }).then(resp => {
        return resp;
      })
    });
  }
});
