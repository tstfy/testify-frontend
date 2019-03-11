import DS from 'ember-data';

export default DS.Model.extend({
   id: DS.attr('number'),
   username: DS.attr('string'),
   email: DS.attr('string'),
   unique: DS.attr('boolean'),
   fname: DS.attr('string'),
   lname: DS.attr('string'),
   role: DS.attr('number'),
   created: DS.attr('date'),
   lastModified: DS.attr('date')
});
