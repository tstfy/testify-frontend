import DS from "ember-data";

export default DS.Model.extend({
  candidate_id: DS.attr(),
  email: DS.attr(),
  f_name: DS.attr(),
  l_name: DS.attr(),
  repo_link: DS.attr("string", { defaultValue: "" }),
  status: DS.attr("number", { defaultValue: 0 })
});
