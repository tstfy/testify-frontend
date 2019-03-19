import DS from "ember-data";

export default DS.Model.extend({
  challenge_id: DS.attr(),
  title: DS.attr(),
  employer_id: DS.attr(),
  category: DS.attr(),
  description: DS.attr(),
  finished: DS.attr(),
  repo_link: DS.attr()
});
