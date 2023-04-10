#!/usr/bin/env node

let bullhorn     = require('../lib/bullhorn');
let bullhornAuth = require('../lib/bullhornAuth');

const yargs = require("yargs");

const options = yargs
 .usage("Usage: -c <command> -p <payload> -r <rest-token>")
 .option("c", { alias: "command", describe: "Slack command", type: "string", demandOption: true })
 .option("n", { alias: "name", describe: "Candidate name", type: "string", demandOption: false })
 .option("s", { alias: "skills", describe: "Candidate skills", type: "string", demandOption: false })
 .option("r", { alias: "resttoken", describe: "Bullhorn rest token", type: "string", demandOption: false })
 .argv;

process.env.BHRESTTOKEN = options.resttoken;

console.log("Proceeding with rest token: " + process.env.BHRESTTOKEN);

let commands = {
  "token": async (options) => {
    let username = process.env.BHAPIUSERNAME;;
    let password = process.env.BHPASSWORD;

    bullhornAuth.authenticate(username, password)
    .then(function(restData){
      console.log(`BhRestToken is ${restData.BhRestToken}`);
    });

  },
  "/candidate": async (options) => {

    console.log(`/candidate ${process.env.BHRESTTOKEN}`);

    if(options.skills) {
      options.skills = options.skills.split(/\s+/);
    }

    let search = {
      name: options.name,
      skills: options.skills
    };

    let response = await bullhorn.getCandidate(search, process.env.BHRESTTOKEN);

    response.data.forEach((candidate) => {
      console.log("Candidate: " + candidate.firstName + " " + candidate.lastName);
      console.log(candidate.primarySkills.data.map((skill) => { return skill.name; } ));
    });
  }
};

commands[options.command](options);
