import DS from "ember-data";

export default DS.JSONAPIAdapter.extend({
  host: "http://api.tstfy.co",
  namespace: "",
  pathForType: function(type) {
    return type;
  }
});
