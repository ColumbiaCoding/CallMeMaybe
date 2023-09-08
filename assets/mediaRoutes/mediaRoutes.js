// The following Node.js code creates a session that uses the OpenTok Media Router:
var opentok = new OpenTok(API_KEY, API_SECRET);
var sessionId;
opentok.createSession({mediaMode:"routed"}, function(error, session) {
    if (error) {
        console.log("Error creating session:", error)
    } else {
        sessionId = session.sessionId;
        console.log("Session ID: " + sessionId);
    }
});
// Use the session ID in an OpenTok client library to connect to an OpenTok session.


