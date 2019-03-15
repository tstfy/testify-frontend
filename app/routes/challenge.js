import Route from "@ember/routing/route";
import RSVP from "rsvp";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import $ from "jquery";
import { run } from "@ember/runloop";
import config from "../config/environment";

export default Route.extend(AuthenticatedRouteMixin, {
  challengeid: 1,
  model(params) {
    return RSVP.hash({
      challenges: this.store
        .query("challenge", {
          eid: params.userid
        })
        .then(challenges => {
          return challenges
            .filter(challenge => {
              return params.challenge_id == challenge.challenge_id;
            })
            .get("firstObject");
        })
        .then(data => {
          console.log(data);
          return data;
        }),
      candidates: $.ajax({
        url:
          config.APP.baseURL +
          "/challenges/candidates?cid=" +
          params.challenge_id,
        type: "GET",
        crossDomain: true,
        contentType: "application/json;charset=UTF-8"
      })
        .then(resp => {
          run(() => {
            // begin loop
            // Code that results in jobs being scheduled goes here
            this.store.unloadAll("candidate");
          }); // end loop, jobs are flushed and executed
          return resp;
        })
        .then(resp => {
          run(() => {
            // begin loop
            // Code that results in jobs being scheduled goes here
            this.set("num_candidates", resp.data.length);
            console.log("num_candidates ", this.num_candidates);
            this.get("store").pushPayload("candidate", resp);
          }); // end loop, jobs are flushed and executed
          return this.get("store").peekAll("candidate");
        })
    });
  },
  actions: {
    refreshCurrentRoute() {
      this.refresh();
    }
  }
});
