import DS from "ember-data";

export default DS.Model.extend({
  employer_id: DS.attr("number"),
  username: DS.attr("string"),
  email: DS.attr("string"),
  f_name: DS.attr("string"),
  l_name: DS.attr("string"),
  company: DS.attr("string")
});
