const router = require('express').Router();
const OpenTok = require("opentok");
const opentok = new OpenTok(API_KEY, API_SECRET);
const { User } = require('../../../models');


// Initializing a Session object
// Before you can connect to a session, instantiate a Session object by calling the OT.initSession() method with your OpenTok API key and the appropriate session ID:
// Replace with your OpenTok API key and session ID:
var session = OT.initSession(API_KEY, sessionID);


// The OT.initSession() method returns a Session object, through which subsequent API calls take place.
// Note that calling the OT.initSession() method does not create an OpenTok session; it creates a JavaScript Session object, which represents an existing OpenTok session. You create an OpenTok session using the OpenTok server-side libraries. See Creating an OpenTok session.
// If the user's browser does not support WebRTC, the call to OT.initSession() results in the page displaying a message to the user. To check for WebRTC support and prevent this message from being displayed, you can call the OT.checkSystemRequirements() method before calling OT.initSession():

if (OT.checkSystemRequirements() == 1) {
  var session = OT.initSession(API_KEY, sessionId);
} else {
  // The client does not support WebRTC.
  // You can display your own message.
}

// Connecting to a session
// Once you have initialized a Session object, call its connect() method, passing in a token and a completion handler function:

var session = OT.initSession(API_KEY, sessionId);
session.connect(token, function(error) {
  if (error) {
    console.log("Error connecting: ", error.name, error.message);
  } else {
    console.log("Connected to the session.");
  }
});
// An error object is passed into the completion handler of the connect event when the client fails to connect to the OpenTok session. Otherwise, no error object is passed in, indicating that the client connected successfully to the session.
// The Session object also dispatches a sessionConnected event when the client connects to the OpenTok session. And the OT object dispatches an exception event when there is an error in connecting. However, it is simpler to check for success in connecting by passing a completion handler into the connect() method, as the last parameter.

// Disconnecting from a session
// To disconnect from a session, call the disconnect() method of the Session object:
session.on("sessionDisconnected", function (event) {
  // The event is defined by the SessionDisconnectEvent class
  if (event.reason == "networkDisconnected") {
    alert("Your network connection terminated.")
  }
});
session.connect(token);

// Automatic reconnection
// In response to these events, your application can (optionally) display user interface notifications indicating the temporary disconnection, reconnection, and disconnection states:
session.on(
  sessionReconnecting: function() {
    // Display a user interface notification.
  },
  sessionReconnected: function() {
    // Adjust user interface.
  },
  sessionDisconnected: function() {
    // Adjust user interface.
  }
);

// Detecting when clients have connected and disconnected
// The Session object dispatches a connectionCreated event when a new client (including your own) connects to the session. The Session object dispatches a connectionDestroyed event when other clients leave the session. These events are defined by the ConnectionEvent class, which has a connection object, which is a Connection object for the connection (created or destroyed) related to the event:

var connectionCount;
session.on({
  connectionCreated: function (event) {
    connectionCount++;
    if (event.connection.connectionId != session.connection.connectionId) {
      console.log('Another client connected. ' + connectionCount + ' total.');
    }
  },
  connectionDestroyed: function connectionDestroyedHandler(event) {
    connectionCount--;
    console.log('A client disconnected. ' + connectionCount + ' total.');
  }
});
session.connect(token, function (error) {
  if (error) {
    console.log("Failed to connect.");
  } else {
    console.log('You have connected to the session.');
  }
});

// Troubleshooting session connection issues
// The Session.connect() method has a callback function which is passed an optional error parameter. If this parameter is present and defined (not null or undefined), then there was an error when connecting. Looking for this error in your code will help you decipher why the end-user was unable to connect:
session.connect(token, function(err) {
  if (err) {
    // handle error
  } else {
    // connection succeeded
  }
});

// error handling code:

session.connect(token, function(err) {
  if (err) {
    if (err.name === "OT_NOT_CONNECTED") {
      showMessage('Failed to connect. Please check your connection and try connecting again.');
    } else {
      showMessage('An unknown error occurred connecting. Please try again later.');
    }
  }
});
// You can lose your connection after you have already successfully connected to a Session. You can handle this case by listening for the sessionDisconnected event with a reason of "networkDisconnected":
session.on({
  sessionDisconnected: function(event) {
    if (event.reason === 'networkDisconnected') {
      showMessage('You lost your internet connection.'
        + 'Please check your connection and try connecting again.');
    }
  }
});

// Putting it all together
// The following code includes a connect() method, which connects to a session. Once connected, the code tracks when clients join and leave the session. It also has a method for disconnecting from the session:

var session;
var connectionCount = 0;

function connect() {
  // Replace API_KEY and sessionId with your own values:
  session = OT.initSession(API_KEY, sessionId);
  session.on({
    connectionCreated: function (event) {
      connectionCount++;
      console.log(connectionCount + ' connections.');
    },
    connectionDestroyed: function (event) {
      connectionCount--;
      console.log(connectionCount + ' connections.');
    },
    sessionDisconnected: function sessionDisconnectHandler(event) {
      // The event is defined by the SessionDisconnectEvent class
      console.log('Disconnected from the session.');
      document.getElementById('disconnectBtn').style.display = 'none';
      if (event.reason == 'networkDisconnected') {
        alert('Your network connection terminated.')
      }
    }
  });
  // Replace token with your own value:
  session.connect(token, function(error) {
    if (error) {
      console.log('Unable to connect: ', error.message);
    } else {
      document.getElementById('disconnectBtn').style.display = 'block';
      console.log('Connected to the session.');
      connectionCount = 1;
    }
  });
}

function disconnect() {
  session.disconnect();
}

connect();