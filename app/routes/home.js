import Route from "@ember/routing/route";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.find(
      "challenges",
      this.session.data.authenticated.user.employer_id
    );
  }
});
