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
  this.route("profile", { path: "/user/:userid/profile" });
  this.route("home", { path: "/user/:userid/challenges" });
  this.route("login");
  this.route("challenges", { path: "/user/:userid/challenges/:challenge_id" });
});

export default Router;
