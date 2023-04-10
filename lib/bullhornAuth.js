let rp = require('request-promise');
function debug(string) {
  if(process.env.DEV) {
    // console.log(string);
  }
}

let bullhornAuth = {

  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,

  authCodeUrl: 'https://auth.bullhornstaffing.com/oauth/authorize',
  authTokenUrl: 'https://auth.bullhornstaffing.com/oauth/token',
  loginUrl: 'https://rest.bullhornstaffing.com/rest-services/login',

  authCodeParams: {
    response_type: 'code',
    action: 'Login',
    client_id: undefined,
    username: undefined,
    password: undefined
  },

  getAuthCodeParams: function(username, password) {
    var params = this.authCodeParams;
    params.username = username;
    params.password = password;
    params.client_id = this.clientId;
    return params;
  },

  getAuthCodeUrl: function(username, password) {
    var params = this.getAuthCodeParams(username, password);
    var url = new URL(this.authCodeUrl);
    var searchParams = new URLSearchParams(params);
    url.search = searchParams;
    return url.href;
  },

  authenticate: async function(username, password) {

    // Get
    var params = this.getAuthCodeParams(username, password);

    var options = {
      uri: this.authCodeUrl,
      qs: params,
      resolveWithFullResponse: true
    };

    // Post
    var params2 = {
      grant_type: 'authorization_code',
      code: 'authCodeHere',
      client_id: this.clientId,
      client_secret: this.clientSecret

    };

    var options2 = {
      method: 'POST',
      uri: this.authTokenUrl,
      qs: params2,
      json: true
    };

    // BhRest
    var params3 = {
      version: '*',
      access_token: 'accessToken'
    };

    var options3 = {
      uri: this.loginUrl,
      qs: params3,
      json: true
    };

    var restData = undefined;

    debug('Authenticating for ' + username);

    await rp(options)
      .then(function(resp){

        var url = new URL(resp.request.uri.href);
        var code = url.searchParams.get('code');

        debug('Received auth code ' + code + ' for user ' + username);

        options2.qs.code = code;

        return rp(options2);

      })
      .then(function(resp) {
        options3.qs.access_token = resp.access_token

        debug('Received access token ' + resp.access_token + ' for user ' + username);

        return rp(options3);
      })
      .then(function(resp) {

        debug('Received BhRestToken ' + resp.BhRestToken + ' for user ' + username);

        restData = resp;
      })
      .catch(function(err){
        throw new Error("Unable to login, check username and password, or click the \"first login\" link");
      });

      return restData;
  }

};

module.exports = bullhornAuth;
