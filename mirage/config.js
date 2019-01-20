export default function() {
  this.namespace = '/api';

  let challenges = [
    {
        type: 'challenge',
        id: "facebook",
        attributes: {
        challengeid: "1",
        title: "Facebook Coding Challenge",
        owner: "Veruca Salt",
        startdate: "Tue Jul 17 2018",
        enddate: "Tue Jul 24 2018",
        category: "Algorithm",
        candidates: 15,
        description:
          "This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests."
        }
      },
      {
        type: 'challenge',
        id: "google",
        attributes: {
        challengeid: "2",
        title: "Google Coding Challenge",
        owner: "Mike TV",
        startdate: "Tue Jul 17 2018",
        enddate: "Tue Jul 24 2018",
        category: "Design",
        candidates: 10,
        description:
          "A commuters dream. This rental is within walking distance of 2 bus stops and the Metro."
        }
      },
      {
        type: 'challenge',
        id: "amazon",
        attributes: {
        challengeid: "3",
        title: "Amazon Coding Challenge",
        owner: "Violet Beauregarde",
        startdate: "Tue Jul 17 2018",
        enddate: "Tue Jul 24 2018",
        category: "Data Structures",
        candidates: 30,
        description:
          "Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet."
        }
      }
  ];

  this.get('/challenges', function(db, request) {
      return { data: challenges };
  });

  this.get('/challenges/:id', function (db, request) {
    return { data: challenges.find((challenge) => request.params.id === challenge.id) };
  });
  
  
}
