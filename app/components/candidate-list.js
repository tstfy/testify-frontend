import Component from "@ember/component";

export default Component.extend({
  status: "N/A",
  actions: {
    onSuccess() {
      this.set("status", "Success");
    },
    onError() {
      this.set("status", "Error");
    }
  }
});
