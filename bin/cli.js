#!/usr/bin/env node

const bullhorn = require('../lib/bullhorn');
const auth = require('../lib/bullhornAuth');
const dotenv = require('dotenv').config();
const cliOptions = require("yargs");

cliOptions.usage("Usage: -c <command> -p <payload> -r <rest-token>")
    .option("c", {
        alias: "command",
        describe: "Slack command",
        type: "string",
        demandOption: true
    })
    .option("n", {
        alias: "name",
        describe: "Candidate name",
        type: "string",
        demandOption: false
    })
    .option("s", {
        alias: "skills",
        describe: "Candidate skills",
        type: "string",
        demandOption: false
    })
    .option("r", {
        alias: "resttoken",
        describe: "Bullhorn rest token",
        type: "string",
        demandOption: false
    })
    .argv;

const getCandidatePayload = () => {
    let payload = {
        name: cliOptions.name,
        skills: cliOptions.skills ? cliOptions.skills.split(/\s+/) : null
    };
    return payload;
};

(async () => {
    try {
        process.env.BHRESTTOKEN = cliOptions.resttoken;
        console.log(`Proceeding with rest token: ${process.env.BHRESTTOKEN}`);

        const commands = {
            "/token": async () => {
                const [username, password] = [process.env.BHAPIUSERNAME, process.env.BHPASSWORD];
                const response = await auth.authenticate(username, password);
                console.log(`BhRestToken is ${response.BhRestToken}`);
            },

            "/candidate": async (restToken) => {
                const payload = getCandidatePayload();
                const response = await bullhorn.searchCandidate(payload, restToken);
                const noCandidateMsg = "No candidate found related to the given search term(s)";

                if (response.data.length) {
                    response.data.forEach(({ firstName, lastName, primarySkills: { data } }) => {
                        console.log(`Candidate: ${firstName} ${lastName}`);
                        console.log(data.map(({ name }) => name));
                    });
                }
                else {
                    console.log(noCandidateMsg);
                }
            },
        };

        commands[cliOptions.command](process.env.BHRESTTOKEN);

    } catch (err) {
        console.log(`An error occurred: ${err.message}`);
    }
})();
rgs = require("yargs");

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
