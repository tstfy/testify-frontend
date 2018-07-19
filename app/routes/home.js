import Route from "@ember/routing/route";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return [
      {
        id: "facebook",
        title: "Facebook Coding Challenge",
        owner: "Veruca Salt",
        startData: "Tue Jul 17 2018",
        endDate: "Tue Jul 24 2018",
        category: "Algorithm",
        candidates: 15,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg",
        description:
          "This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests."
      },
      {
        id: "google",
        title: "Google Coding Challenge",
        owner: "Mike TV",
        startData: "Tue Jul 17 2018",
        endDate: "Tue Jul 24 2018",
        category: "Design",
        candidates: 10,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg",
        description:
          "A commuters dream. This rental is within walking distance of 2 bus stops and the Metro."
      },
      {
        id: "amazon",
        title: "Amazon Coding Challenge",
        owner: "Violet Beauregarde",
        startData: "Tue Jul 17 2018",
        endDate: "Tue Jul 24 2018",
        category: "Data Structures",
        candidates: 30,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg",
        description:
          "Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet."
      }
    ];
  }
});
