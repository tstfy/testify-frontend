import Route from "@ember/routing/route";
import RSVP from "rsvp";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return RSVP.hash({
      challenges: this.store.findRecord("challenges", params.challenge_id),
      candidates: this.store.findAll("candidates")
    });
  }
});
