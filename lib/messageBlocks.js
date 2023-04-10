let format = require('../lib/format');

let messageBlocks = {

  candidates: function(candidates) {
    let message = {"blocks": []};
    if(candidates.length == 1 || !candidates.length) {
      let candidate = !candidates.length ? candidates : candidates[0];
      let header = candidate.firstName + ' ' + candidate.lastName;
      message['blocks'].push(messageBlocks.candidateHeader(header));
      message['blocks'].push(messageBlocks.candidateBlock(candidate));
    } else {
      let i = 1;
      candidates.forEach((candidate) => {
        let header = i + ": " +  candidate.firstName + ' ' + candidate.lastName;
        message['blocks'].push(messageBlocks.candidateHeader(header));
        message['blocks'].push(messageBlocks.candidateBlock(candidate));
        i++;
      });
    }
    return message;
  },

  candidateHeader: function(headerText) {
    return {
      "type": "header",
      "text": {
          "type": "plain_text",
          "text": headerText
      }
    };
  },

  candidateBlock: function(candidate) {
    return {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "<https://cls42.bullhornstaffing.com/BullhornStaffing/OpenWindow.cfm?Entity=Candidate&ID=" + candidate.id + "|View " + candidate.firstName + ' ' + candidate.lastName + " in Bullhorn →>"
      },
      "fields": [
        {
          "type": "mrkdwn",
          "text": "*Name*\n" + candidate.firstName + ' ' + candidate.lastName
        },
        {
          "type": "mrkdwn",
          "text": "*Id*\n" + candidate.id
        },
        {
          "type": "mrkdwn",
          "text": "*Phone*\n" + candidate.phone
        },
        {
          "type": "mrkdwn",
          "text": "*Email*\n" + candidate.email
        },
        {
          "type": "mrkdwn",
          "text": "*Salary*\n" + format.salary(candidate.salary)
        },
        {
          "type": "mrkdwn",
          "text": "*Hourly Rate*\n" + format.hourlyRate(candidate.hourlyRate)
        },
        {
          "type": "mrkdwn",
          "text": "*Skills*\n" + candidate.primarySkills.data.map((s) => { return s.name }).join(', ')
        },
        {
          "type": "mrkdwn",
          "text": "*Date Added*\n" + format.relativeTime(candidate.dateAdded)
        }
      ]
    };
  },

  prescreenModalBlock: function(candidate) {
    let header = candidate ?
      candidate.firstName + " " + candidate.lastName + " Prescreen" :
      "Candidate Prescreen";
    return {
    	"type": "modal",
    	"submit": {
    		"type": "plain_text",
    		"text": "Submit",
    		"emoji": true
    	},
    	"close": {
    		"type": "plain_text",
    		"text": "Cancel",
    		"emoji": true
    	},
    	"title": {
    		"type": "plain_text",
    		"text": header,
    		"emoji": true
    	},
    	"blocks": [
    		{
    			"type": "input",
    			"element": {
    				"type": "plain_text_input",
    				"action_id": "plain_text_input-action"
    			},
    			"label": {
    				"type": "plain_text",
    				"text": "Why is the candidate looking?",
    				"emoji": true
    			}
    		},
    		{
    			"type": "input",
    			"element": {
    				"type": "plain_text_input",
    				"multiline": true,
    				"action_id": "plain_text_input-action"
    			},
    			"label": {
    				"type": "plain_text",
    				"text": "What get's you excited about a new position besides compensation?",
    				"emoji": true
    			}
    		},
    		{
    			"type": "input",
    			"element": {
    				"type": "plain_text_input",
    				"multiline": true,
    				"action_id": "plain_text_input-action"
    			},
    			"label": {
    				"type": "plain_text",
    				"text": "Please tell me aobut your current team and the projec you are currently working on",
    				"emoji": true
    			}
    		},
    		{
    			"type": "input",
    			"element": {
    				"type": "plain_text_input",
    				"multiline": true,
    				"action_id": "plain_text_input-action"
    			},
    			"label": {
    				"type": "plain_text",
    				"text": "What's the size of your current team? What's your role on the team?",
    				"emoji": true
    			}
    		},
    		{
    			"type": "input",
    			"element": {
    				"type": "plain_text_input",
    				"multiline": true,
    				"action_id": "plain_text_input-action"
    			},
    			"label": {
    				"type": "plain_text",
    				"text": "What are the main technologies you work with?",
    				"emoji": true
    			}
    		}
    	]
    };
  }

};

module.exports = messageBlocks;
