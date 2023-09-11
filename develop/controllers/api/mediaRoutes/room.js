// The GET /room/:name route associates an OpenTok session with a "room" name. This route handles the passed room name and performs a check to determine whether the app should generate a new session ID or retrieve a session ID from the local in-memory hash. Then, it generates an OpenTok token for that session ID. Once the API key, session ID, and token are ready, it sends a response with the body set to a JSON object containing the information.

if (localStorage[roomName]) {
    // fetch an existing sessionId
    const sessionId = localStorage[roomName];
  
    // generate token
    token = opentok.generateToken(sessionId);
    res.setHeader('Content-Type', 'application/json');
    res.send({
      apiKey: apiKey,
      sessionId: sessionId,
      token: token,
    });
  } else {
    // Create a session that will attempt to transmit streams directly between
    // clients. If clients cannot connect, the session uses the OpenTok TURN server:
    opentok.createSession({ mediaMode: 'relayed' }, function (err, session) {
      if (err) {
        console.log(err);
        res.status(500).send({ error: 'createSession error:', err });
        return;
      }
  
      // store into local
      localStorage[roomName] = session.sessionId;
  
      // generate token
      token = opentok.generateToken(session.sessionId);
      res.setHeader('Content-Type', 'application/json');
      res.send({
        apiKey: apiKey,
        sessionId: session.sessionId,
        token: token,
      });
    });
  }