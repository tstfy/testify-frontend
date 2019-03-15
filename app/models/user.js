import DS from "ember-data";

export default DS.Model.extend({
  "employer-id": DS.attr("number"),
  username: DS.attr("string"),
  email: DS.attr("string"),
  "f-name": DS.attr("string"),
  "l-name": DS.attr("string"),
  company: DS.attr("string")
});
