import Route from "@ember/routing/route";
import RSVP from "rsvp";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    //return this.store.findRecord('challenge', params.challenge_id);
    return RSVP.hash({
      challenge: this.store.findRecord("challenge", params.challenge_id),
      candidates: this.store.findAll("candidate")
    });
  }
});
