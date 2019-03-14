import DS from 'ember-data';

export default DS.Model.extend({
   challengeid: DS.attr(),
   user: DS.attr(),
   gitrepo: DS.attr(),
   status: DS.attr()
});
