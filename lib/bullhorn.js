const rp = require('request-promise');

const fields = [
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

const bullhornAPI = 'https://rest42.bullhornstaffing.com/rest-services/6axbbd/';
const candidateEndPoint = `${bullhornAPI}entity/Candidate/`;
const searchEndPoint = `${bullhornAPI}search/Candidate/`;

let cache = {};

async function getCandidateById(candidateId, BhRestToken) {
  const uri = candidateEndPoint + candidateId;
  const options = {
    uri,
    qs: {
      fields: fields.join(','),
      BhRestToken
    },
    json: true
  };

  return rp(options);
}

async function getCandidateByName(name, BhRestToken) {
  const nameParts = name.split(' ');

  const conditions = nameParts.map(part => {
    const sw = part + '*';
    return `firstName:${sw} OR lastName:${sw}`;
  });

  const query = { query: '(' + conditions.join(' AND ') + ')' };
  const options = {
    method: 'POST',
    uri: searchEndPoint,
    qs: {
      fields: fields.join(','),
      BhRestToken
    },
    json: query
  };

  if (cache[BhRestToken]) {
    console.log('Token Cache Hit');
    options.qs.BhRestToken = cache[BhRestToken];
  } else {
    cache[BhRestToken] = BhRestToken;
  }
  return rp(options);
}

async function getCandidateBySkills(skills, BhRestToken) {
  const conditions = skills.map(skill => `primarySkills.id:^${skill}`);

  const query = { query: '(' + conditions.join(' OR ') + ')' };
  const options = {
    method: 'POST',
    uri: searchEndPoint,
    qs: {
      fields: fields.join(','),
      BhRestToken
    },
    json: query
  };

  if (cache[BhRestToken]) {
    console.log('Token Cache Hit');
    options.qs.BhRestToken = cache[BhRestToken];
  } else {
    cache[BhRestToken] = BhRestToken;
  }
  return rp(options);
}

async function getCandidate(search, BhRestToken) {
  let conditions = [];

  if (cache[BhRestToken]) {
    console.log('Token Cache Hit');
    options.qs.BhRestToken = cache[BhRestToken];
  } else {
    cache[BhRestToken] = BhRestToken;
  }

  if (search.hasOwnProperty('name')) {
    const name = search.name.trim();
    const nameParts = name.split(' ');
    conditions = nameParts.map(part => `firstName:${part}* OR lastName:${part}*`);
  }

  if (search.hasOwnProperty('skills')) {
    conditions.push(`(${search.skills.map(skill => `primarySkills.id:^${skill}`).join(' OR ')})`);
  }

  const query = { query: conditions.join(' AND ') };
  const options = {
    method: 'POST',
    uri: searchEndPoint,
    qs: {
      fields: fields.join(','),
      BhRestToken
    },
    json: query
  };

  return rp(options);
}

module.exports = {
  getCandidateById,
  getCandidateBySkills,
  getCandidateByName,
  getCandidate
};
',
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
