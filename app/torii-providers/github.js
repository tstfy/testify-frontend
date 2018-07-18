// app/torii-providers/github.js
import GitHubOAuth2Provider from "torii/providers/github-oauth2";

export default GitHubOAuth2Provider.extend({
  fetch(data) {
    console.log("torii-provider ", data);
    return data;
  }
});
