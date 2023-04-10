// www

/**
 * Required External Modules
 */
 let bullhorn     = require('../lib/bullhorn');
 let bullhornAuth = require('../lib/bullhornAuth');

 let slackApi     = require('../lib/slack-api');
 let messageBlocks= require('../lib/messageBlocks');


 const express = require("express");
 const path = require("path");
 const session = require('express-session');
 const FileStore = require('session-file-store')(session);
 const fileStoreOptions = {};
 const rp = require('request-promise');

 const sessionOptions = {
   resave: false, // don't save session if unmodified
   saveUninitialized: false, // don't create session until something stored
   secret: 'shhhh, very secret',
 };

 if(process.env.DEV) {
   sessionOptions.store = new FileStore(fileStoreOptions);
 }

/**
 * App Variables
 */

 const app = express();
 const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

 app.use(express.json());
 app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
 app.use(session(sessionOptions));

 // Immediately respond to all requests
 app.use((req, res, next) => {
   let payload = req.body;
   res.status(200).send("Executing \"" + payload.command + " " + payload.text + "\":hourglass:");
   next();
 });

 // Always keep a valid rest token
 // TODO: Add expiration and refresh
 app.use((req, res, next) => {
   if(!process.env.BHRESTTOKEN) {
     let username = process.env.BHAPIUSERNAME;
     let password = process.env.BHPASSWORD;

     bullhornAuth.authenticate(username, password)
       .then(function(restData){
         process.env.BHRESTTOKEN = restData.BhRestToken;
         next();
       });
   } else {
     next();
   }
 });
/**
 * Routes Definitions
 */

app.post("/commands/prescreen", (req, res) => {
  let payload = req.body;

  let BhRestToken = process.env.BHRESTTOKEN;
  let trigger_id  = payload.trigger_id;

  let modal = messageBlocks.prescreenModalBlock();

  slackApi.openModal(trigger_id, modal)
  .then((response) => {
    res.end();
  });
});

app.post("/commands/skills", async(req, res) => {
  let payload = req.body;

  let search = {
    skills: payload.text.split(/\s+/)
  };

  let response = await bullhorn.getCandidate(search, process.env.BHRESTTOKEN);

  let message = messageBlocks.candidates(response.data);

  response = await slackApi.respond(payload.response_url, message);

  return res.end();
});

app.post("/commands/candidate", async (req, res) => {
  let payload = req.body;

  let getFunction = isNaN(payload.text) ? bullhorn.getCandidate : bullhorn.getCandidateById;

  let response = await getFunction(payload.text, process.env.BHRESTTOKEN);

  let message = messageBlocks.candidates(response.data);

  response = await slackApi.respond(payload.response_url, message);

  return res.end();
});

/**
 * Server Activation
 */

 app.listen(port, () => {
   console.log(`Listening to requests on http://localhost:${port}`);
 });
