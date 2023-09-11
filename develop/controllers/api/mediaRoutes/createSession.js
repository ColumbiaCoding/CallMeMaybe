const router = require('express').Router();
const OpenTok = require("opentok");
const opentok = new OpenTok(apiKey, apiSecret);
const { User } = require('../../../models');

// The following Node.js code creates a session that uses the OpenTok Media Router:
var opentok = new OpenTok(API_KEY, API_SECRET);
var sessionId;
opentok.createSession({mediaMode:"routed"}, function(error, session) {
  if (error) {
    console.log("Error creating session:", error)
  } else {
    sessionId = session.sessionId;
    console.log("Session ID: " + sessionId);
//  Use the role value appropriate for the user:
    var tokenOptions = {};
    tokenOptions.role = "publisher";
    tokenOptions.data = "username=bob";
// Generate a token.
    token = opentok.generateToken(sessionId, tokenOptions);
    console.log(token);
  }
});

// The method takes the following arguments:
// sessionId (String) — The session ID corresponding to the session to which the user will connect.
// options (Object) — An object that includes optional settings for the token:
// role (String) — Optional. This defines the role the user will have. There are three roles: "subscriber", "publisher", and "moderator". Subscribers can only subscribe to streams in the session (they cannot publish). Publishers can subscribe and publish streams to the session, and they can use the signaling API. Moderators have the privileges of publishers and, in addition, they can also force other users to disconnect from the session or to cease publishing. The default role (if no value is passed) is publisher.
// data (String) — Optional. A string containing metadata describing the connection. For example, you can pass the user ID, name, or other data describing the connection. You may obtain this data from a server-side database or from data provided to you by the client, depending on your application.
// expireTime (Number) — Optional. The time when the token will expire, defined as an integer value for a Unix timestamp (in seconds). If you do not specify this value, tokens expire in 24 hours after being created. The expire_time value, if specified, must be within 30 days of the creation time.


