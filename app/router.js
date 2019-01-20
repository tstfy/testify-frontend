import EmberRouter from "@ember/routing/router";
import config from "./config/environment";
import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";

const Router = EmberRouter.extend(ApplicationRouteMixin, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("about");
  this.route("contact");
  this.route("profile");
  this.route("home");
  this.route('login');
  this.route('challenge', { path: '/challenge/:challenge_id' });
});

export default Router;
