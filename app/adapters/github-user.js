// import DS from 'ember-data';
//
// export default DS.JSONAPIAdapter.extend({
// });
// app/adapters/github-user.js

import GitHubUserAdapter from "ember-data-github/adapters/github-user";
import DataAdapterMixin from "ember-simple-auth/mixins/data-adapter-mixin";

export default GitHubUserAdapter.extend(DataAdapterMixin, {
  authorizer: "authorizer:github"
});
