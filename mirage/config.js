export default function() {
  this.passthrough();

  let challenges = [
    {
      type: "challenge",
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
          "This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.",
        gitrepo: "gitlab@git.uwaterloo.ca:ece1337-1191/ece69-12345-a3-abcdef.git"
      }
    },
    {
      type: "challenge",
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
          "A commuters dream. This rental is within walking distance of 2 bus stops and the Metro.",
        gitrepo: "gitlab@git.uwaterloo.ca:ece1337-1191/ece69-12345-a5-abcdef.git"
      }
    },
    {
      type: "challenge",
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
          "Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet.",
        gitrepo: "gitlab@git.uwaterloo.ca:ece1337-1191/ece141-12345-a7-abcdef.git"
      }
    }
  ];
  
  let candidates = [
    {
      type: "candidate",
      id: "1",
      attributes: {
        challengeid: "1",
        user: "first-to-last@gmail.com",
        gitrepo: "https://gerrit.googlesource.com/git-repo",
        status: "1"
      }
    },
    {
      type: "candidate",
      id: "2",
      attributes: {
		challengeid: "1",
        user: "failed-user@hotmail.com",
        gitrepo: "https://github.com/git/git.git",
        status: "2"
      }
    },
	{
      type: "candidate",
      id: "3",
      attributes: {
		challengeid: "1",
        user: "pending@someemail.com",
        gitrepo: "https://github.com/git/git.git",
        status: "0"
      }
    },
    {
      type: "candidate",
      id: "4",
      attributes: {
		challengeid: "2",
        user: "mynameis@jeff.com",
        gitrepo: "https://gerrit.googlesource.com/git-repo",
        status: "2"
      }
    }
  ];

  this.get("/challenges", function(db, request) {
    console.log(db, request);
    return { data: challenges };
  });

  this.get("/challenges/:id", function(db, request) {
    console.log(db, request);
    return {
      data: challenges.find(challenge => request.params.id === challenge.id)
    };
  });
  
  this.get("/candidates", function(db, request) {
    console.log(db, request);
    return { data: candidates };
  });
  
  this.get("/candidates/:id", function(db, request) {
    console.log(db, request);
    return {
      data: candidates.find(candidate => request.params.id === candidate.attributes.challengeid)
    };
  });
}
