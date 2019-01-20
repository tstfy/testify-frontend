import DS from 'ember-data';

export default DS.Model.extend({
   challengeid: DS.attr(),
   title: DS.attr(),
   owner: DS.attr(),
   startdate: DS.attr(),
   enddate: DS.attr(),
   category: DS.attr(),
   candidates: DS.attr(),
   description: DS.attr()
});
