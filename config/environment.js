"use strict";

module.exports = function(environment) {
  let ENV = {
    modulePrefix: "testify",
    environment,
    rootURL: "/",
    locationType: "auto",
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    torii: {
      allowUnsafeRedirects: true,
      sessionServiceName: "session",
      providers: {
        "github-oauth2": {
          scope: "repo user"
        }
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === "development") {
    ENV.torii.providers["github-oauth2"].apiKey =
      process.env.GITHUB_DEV_CLIENT_ID;
    ENV.torii.providers["github-oauth2"].redirectUri =
      "http://localhost:4200/home";
    ENV.torii.providers["github-oauth2"].tokenExchangeUri =
      process.env.DEV_TOKEN_EXCHANGE_URL;
    ENV.APP.LOG_RESOLVER = false;
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_TRANSITIONS = false;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV["ember-cli-mirage"] = {
      enabled: true
    };
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.locationType = "none";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;
  }

  if (environment === "production") {
    // here you can enable a production-specific feature
    ENV["ember-cli-mirage"] = {
      enabled: true
    };
    ENV.APP.LOG_RESOLVER = false;
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_TRANSITIONS = false;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.torii.providers["github-oauth2"].apiKey =
      process.env.GITHUB_STAGING_CLIENT_ID;
    ENV.torii.providers["github-oauth2"].redirectUri =
      process.env.STAGING_REDIRECT_URL;
    ENV.torii.providers["github-oauth2"].tokenExchangeUri =
      process.env.STAGING_TOKEN_EXCHANGE_URL;
  }

  return ENV;
};
