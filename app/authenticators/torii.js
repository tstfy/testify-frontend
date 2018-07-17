// import Base from "ember-simple-auth/authenticators/base";
// import ToriiAuthenticator from "ember-simple-auth/authenticators/torii";
//
// export default Base.extend({
//   restore(data) {},
//
//   authenticate(/*args*/) {},
//
//   invalidate(data) {}
// });
import { inject as service } from "@ember/service";
import ToriiAuthenticator from "ember-simple-auth/authenticators/torii";

export default ToriiAuthenticator.extend({
  torii: service()
});
