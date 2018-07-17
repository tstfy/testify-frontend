import Controller from "@ember/controller";
import config from "../config/environment";

export default Controller.extend({
  session: Ember.inject.service(),
  config: config.torii.providers["github-oauth2"]
});
