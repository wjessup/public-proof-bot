let rp = require('request-promise');

let bullhorn = {

  getCandidateById: function(candidateId, BhRestToken) {
    let fields = [
      'id',
      'firstName',
      'lastName',
      'email',
      'phone',
      'salary',
      'hourlyRate'
    ];

    let options = {
      uri: 'https://rest42.bullhornstaffing.com/rest-services/6axbbd/entity/Candidate/' + candidateId,
      qs: {
        fields: fields.join(','),
        BhRestToken: BhRestToken
      },
      json: true
    };

    return rp(options);
  },

  getCandidate: function(search, BhRestToken) {
    let fields = [
      'id',
      'firstName',
      'lastName',
      'email',
      'phone',
      'salary',
      'hourlyRate',
      'primarySkills(id,name)',
      'dateAdded'
    ];

    if(typeof search == "string") {
      search = {
        name: search
      };
    }

    let conditions = [];

    if(search.name) {
      let words = search.name.split(/\s+/);

      if(words.length == 2) {
        conditions.push("firstName:" + words[0] + "* AND lastName:" + words[1] + "*");
      } else {
        conditions.push("name:" + search.name + "*");
      }
    }

    if(search.skills) {
      Array.prototype.push.apply(conditions, search.skills.map((skill) => { return `primarySkills.id:"^(name like '${skill}')"`}));
    }

    let query = { "query": conditions.join(' AND ') };

    let options = {
      method: 'POST',
      uri: 'https://rest42.bullhornstaffing.com/rest-services/6axbbd/search/Candidate',
      qs: {
        fields: fields.join(','),
        BhRestToken: BhRestToken
      },

      json: query
    };

    return rp(options);
  }
};

module.exports = bullhorn;
