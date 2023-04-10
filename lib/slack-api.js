let rp = require('request-promise');

let slackApi = {

  respond: function(responseUrl, payload) {
    let options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      uri: responseUrl,
      json: payload
    };

    return rp(options);
  },

  openModal: function(trigger_id, modal) {
    let message = {
      "trigger_id": trigger_id,
      "view": modal
    };
    let options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + process.env.SLACKTOKEN
      },
      uri: "https://slack.com/api/views.open",
      json: message
    };

    return rp(options);
  }
};

module.exports = slackApi;
