import Route from "@ember/routing/route";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.query("challenge", {
      eid: this.session.data.authenticated.user.employer_id
    });
  },
  actions: {
    refreshCurrentRoute() {
      this.refresh();
    },
    goToChallenge(challenge_id) {
      this.transitionTo(
        "challenge",
        this.session.data.authenticated.user.employer_id,
        challenge_id
      );
    }
  }
});
