const router = require('express').Router();
const OpenTok = require("opentok");
const opentok = new OpenTok(API_KEY, apiSecret);
const { User } = require('../../../models');

// Publish a video and audio stream in a session that others can view by subscribing to it.
// Checking whether a client has publish capabilities
// Once you have connected to a session, you can check if the client can publish. Check the value of the capabilities.publish property of the Session object. If it is set to 1, the client can publish:

if (session.capabilities.publish == 1) {
    // The client can publish. See the next section.
} else {
    // The client cannot publish.
    // You may want to notify the user.
}

// Initializing a Publisher
// The OT.initPublisher() method initializes and returns a Publisher object. The Publisher object represents the view of a video you publish:

var publisher;
var targetElement = 'publisherContainer';

publisher = OT.initPublisher(targetElement, null, function(error) {
  if (error) {
      // Notify the user.
    console.log('You cannot publish a video.') .
  } else {
    console.log('Publisher initialized.');
  }
});

// The OT.initPublisher() method takes three parameters:
//     targetElement— (Optional) Defines the DOM element that the Publisher video replaces.
//     properties— (Optional) A set of properties that customize the Publisher. The properties parameter also includes options to specify an audio and video input device used by the publisher (see Setting the camera and microphone used by the publisher). The properties parameter also includes options for customizing the appearance of view in the HTML page (see Customizing the UI) and select whether to publish audio and video (see Publishing audio or video only). For more publisher options, see the documentation of the properties parameter of the OT.initPublisher() method.
//     completionHandler— (Optional) A completion handler that specifies whether the publisher instantiated successfully or with an error.

// You can pass this Publisher object into the Session.publish() method to publish a stream to a session. See Publishing a stream.
// Before calling Session.publish(), you can use this Publisher object to test the microphone and camera attached to the Publisher.
// The insertMode property of the properties parameter of the OT.initPublisher() method specifies how the Publisher object will be inserted in the HTML DOM, in relation to the targetElement parameter. You can set this parameter to one of the following values:
//     "replace" — The Publisher object replaces contents of the targetElement. This is the default.
//     "after" — The Publisher object is a new element inserted after the targetElement in the HTML DOM. (Both the Publisher and targetElement have the same parent element.)
//     "before" — The Publisher object is a new element inserted before the targetElement in the HTML DOM. (Both the Publisher and targetElement have the same parent element.)
//     "append" — The Publisher object is a new element added as a child of the targetElement. If there are other child elements, the Publisher is appended as the last child element of the targetElement.
// For example, the following code adds a new Publisher object as a child of a publisherContainer DOM element:

// Try setting insertMode to other values: "replace", "after", or "before":
var publisherProperties = {insertMode: "append"};
var publisher = OT.initPublisher('publisherContainer', publisherProperties, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Publisher initialized.");
  }
});

// Detecting when a client has granted access to the camera and microphone
// Before a Publisher object can access the client's camera and microphone, the user must grant access to them. The Publisher object dispatches events when the user grants or denies access to the camera and microphone:
publisher.on({
  accessAllowed: function (event) {
    // The user has granted access to the camera and mic.
  },
  accessDenied: function accessDeniedHandler(event) {
    // The user has denied access to the camera and mic.
  }
});
// Also, a Publisher object dispatches events when the user is presented with the option to allow or deny access to the camera and microphone:
publisher.on({
  accessDialogOpened: function (event) {
    // The Allow/Deny dialog box is opened.
  },
  accessDialogClosed, function (event) {
    // The Allow/Deny dialog box is closed.
  }
});

// The Publisher has an accessAllowed property, which indicates whether a client has (true) or has not (false) granted access to the camera and microphone.

// Setting the camera and microphone used by the publisher
// You can (optionally) specify an audio and video input device for the publisher to use. When you call the OT.initPublisher() method, you can (optionally) set the audioSource and videoSource properties of the properties object passed into the OT.initPublisher() method.
// First, use the OT.getDevices() method to enumerate available devices. The array of devices is passed in as the devices parameter of the callback function passed into the OT.getDevices() method. For example, the following code gets a list of audio and video input devices:

var audioInputDevices;
var videoInputDevices;
OT.getDevices(function(error, devices) {
  audioInputDevices = devices.filter(function(element) {
    return element.kind == "audioInput";
  });
  videoInputDevices = devices.filter(function(element) {
    return element.kind == "videoInput";
  });
  for (var i = 0; i < audioInputDevices.length; i++) {
    console.log("audio input device: ", audioInputDevices[i].deviceId);
  }
  for (i = 0; i < videoInputDevices.length; i++) {
    console.log("video input device: ", videoInputDevices[i].deviceId);
  }
});

// Each device listed by OT.getDevices() has a unique device ID, set as the deviceId property. You can use these device ID values as the audioSource and videoSource properties of the properties object passed into OT.initPublisher():
var pubOptions =
  {
    audioSource: audioInputDevices[0].deviceId,
    videoSource: videoInputDevices[0].deviceId
  };
var publisher = OT.initPublisher(null, pubOptions, function(error) {
  console.log("OT.initPublisher error: ", error);
});

// Publishing a stream
// Now that we've created a Publisher object, we could now pass it into the publish() method of a Session object to publish a stream to the session:
    publisher = OT.initPublisher('replacementElementId');
    session.publish(publisher, function(error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Publishing a stream.');
      }
    });

    // The second parameter is a completion handler function that is passed an error object if publishing fails. Otherwise the completion handler function is called with no error passed in.

// The Publish object dispatches a streamCreated event when it starts streaming to the session:
// The Publisher object has an element property, which is set to the HTML DOM element containing it.
var publisher = OT.initPublisher();
session.publish(publisher, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Publishing a stream.');
  }
});
publisher.on('streamCreated', function (event) {
    console.log('The publisher started streaming.');
});

// Stopping a publisher from streaming to a session
// You can stop publisher from streaming to the session by calling the unpublish() method of the Session object:

session.unpublish(publisher);

// Detecting when a published stream leaves a session: The Publisher object dispatches a streamDestroyed event when it stops streaming to the session: The streamDestroyed event is defined by the StreamEvent class. The event includes a reason property, which details why the stream ended. These reasons include "clientDisconnected", "forceDisconnected", "forceUnpublished", or "networkDisconnected". 
var publisher = OT.initPublisher();
session.publish(publisher);
publisher.on("streamDestroyed", function (event) {
  console.log("The publisher stopped streaming. Reason: "
    + event.reason);
});

// By default, when a Publisher dispatches the streamDestroyed event, the Publisher is destroyed and removed from the HTML DOM. You can prevent this default behavior by calling the preventDefault() method of the StreamEvent object:

publisher.on("streamDestroyed", function (event) {
    event.preventDefault();
    console.log("The publisher stopped streaming.");
});
// You may want to prevent the default behavior, and retain the Publisher, if you want to reuse the Publisher object to publish again to the session.

// Setting the video resolution of a stream: To set a recommended video resolution for a published stream, set the resolution property of the properties parameter you pass into the OT.initPublisher() method:
var publisherProperties = {resolution: '1280x720'};
var publisher = OT.initPublisher(targetElement,
                                 publisherProperties);
publisher.on('streamCreated', function(event) {
   console.log('Stream resolution: ' +
     event.stream.videoDimensions.width +
     'x' + event.stream.videoDimensions.height);
});
// This resolution property is a string, defining the desired resolution of the video. The format of the string is "widthxheight", where the width and height are represented in pixels. Valid values are "1920x1080", "1280x720", "640x480", and "320x240".

// Setting the frame rate of a stream: To set a recommended frame rate for a published stream, set the frameRate property of the properties parameter you pass into the OT.initPublisher() method:
var publisherProperties = {frameRate: 7};
var publisher = OT.initPublisher(targetElement,
                                 publisherProperties);
publisher.on('streamCreated', function(event) {
   console.log('Frame rate: ' + event.stream.frameRate);
});

// Deleting a Publisher: You can delete a Publisher by calling its destroy() method:
publisher.destroy();

// Getting statistics about a publisher's stream
let prevStats = {};
window.setInterval(() => {
  publisher.getStats((error, statsArray) => {
    if (error) {
      return console.log(error);
    }
    statsArray.forEach(statsObj => {
      if (statsObj.connectionId) {
        let prevStatsObj = prevStats[connectionId];
        console.log('stats for connection', statsObj.connectionId);
      } else {
        prevStatsObj = prevStats;
      }
      const stats = statsObj.stats;
      if (prevStatsObj.video) {
        var videoBitRate = 8 * (stats.video.bytesSent - prevStatsObj.video.bytesSent);
        console.log('video bit rate: ', videoBitRate, 'bps');
        var audioBitRate = 8 * (stats.audio.bytesSent - prevStatsObj.audio.bytesSent);
        console.log('audio bit rate: ', audioBitRate, 'bps');
      }
      if (stats.connectionId) {
        prevStats[connectionId] = stats;
      } else {
        prevStats = stats;
      }
    });
})}, 1000);

// Allowing Device Access
// It is best practice to let your users know that they are going to be asked to allow access to their camera and microphone. We find that by far the largest number of failures to publish are a result of users clicking the "deny" button or not clicking the allow button at all. We provide you with all of the events you need to be able to guide your users through this process:

publisher.on({
  accessDialogOpened: function (event) {
    // Show allow camera message
    pleaseAllowCamera.style.display = 'block';
  },
  accessDialogClosed: function (event) {
    // Hide allow camera message
    pleaseAllowCamera.style.display = 'none';
  }
});

// Handling Errors
// There are callback methods for both Session.publish() and OT.initPublisher(). We recommend handling the error responses to both of these methods. As mentioned earlier, it is best to split up these steps and call OT.initPublisher() before you have started connecting to your Session. It also makes error handling easier if you are not calling both of these methods at the same time. This is because both error handlers will fire if there is any error publishing. It is best to wait for OT.initPublisher() to complete and Session.connect() to complete and then call Session.publish(). This way you can handle all hardware related issues in the OT.initPublisher() callback and all network related issues in the Session.publish() callback.
var connected = false,
  publisherInitialized = false;
var publisher = OT.initPublisher(function(err) {
  if (err) {
    // handle error
  } else {
    publisherInitialized = true;
    publish();
  }
});
var publish = function() {
  if (connected && publisherInitialized) {
    session.publish(publisher);
  }
};
session.connect(token, function(err) {
  if (err) {
    // handle error
  } else {
    connected = true;
    publish();
  }
});

// Access Denied
// The highest number of failures to OT.initPublisher() are a result of the end-user denying access to the camera and microphone. This can either be handled by listening for the accessDenied event or by listening for an error response to the OT.initPublisher() method with a code property set to 1500 and a message property set to "Publisher Access Denied:". We recommend that you handle this case and surface a message to the user indicating that they should try to publish again and allow access to the camera.
publisher.on({
  'accessDenied': function() {
    showMessage('Please allow access to the Camera and Microphone and try publishing again.');
  }
});

// Device Access
// Another reason for OT.initPublisher() to fail is if OpenTok cannot get access to a camera or microphone. This can happen if there is no camera or microphone attached to the machine, if there is something wrong with the driver for the camera or microphone, or if some other application is using the camera or microphone (this only happens in Windows). You can try to minimize the occurrence of these issues by using our Hardware Setup Component or by calling the OT.getDevices() method directly. However you should also handle any error when calling OT.initPublisher() because something could still go wrong. For example, the user could have denied access to the camera or microphone. In this case, the error.name property is set to "OT_USER_MEDIA_ACCESS_DENIED":
publisher = OT.initPublisher('publisher', {}, function (err) {
  if (err) {
    if (err.name === 'OT_USER_MEDIA_ACCESS_DENIED') {
      // Access denied can also be handled by the accessDenied event
      showMessage('Please allow access to the Camera and Microphone and try publishing again.');
    } else {
      showMessage('Failed to get access to your camera or microphone. Please check that your webcam'
        + ' is connected and not being used by another application and try again.');
    }
    publisher.destroy();
    publisher = null;
  }
});

// Network Errors
// The other reasons for failures in publishing are usually due to some kind of network failure. We handle these in the callback to Session.publish(). If the user is not connected to the network, the callback function is passed an error object with the name property set to "OT_NOT_CONNECTED". If the user is on a really restrictive network connection that does not allow for WebRTC connections, the Publisher fails to connect, and the Publisher element will just display a spinning wheel. This error has an name property set to "OT_CREATE_PEER_CONNECTION_FAILED". In this case recommend that you surface a message to the user indicating that they failed to publish and that they should check their network connection. Handling these errors looks like this:
session.publish(publisher, function(err) {
  if (err) {
    switch (err.name) {
      case "OT_NOT_CONNECTED":
        showMessage("Publishing your video failed. You are not connected to the internet.");
        break;
      case "OT_CREATE_PEER_CONNECTION_FAILED":
        showMessage("Publishing your video failed. This could be due to a restrictive firewall.");
        break;
      default:
        showMessage("An unknown error occurred while trying to publish your video. Please try again later.");
    }
    publisher.destroy();
    publisher = null;
  }
});

// Losing Connectivity
// Your Publisher can also lose its connection after it has already succeeded in connecting. More often than not, this will also result in the Session losing its connection, but that's not always the case. You can handle the Publisher disconnecting by listening for the streamDestroyed event with a reason property set to "networkDisconnected" like so:
publisher.on({
  streamDestroyed: function (event) {
    if (event.reason === 'networkDisconnected') {
      showMessage('Your publisher lost its connection. Please check your internet connection and try publishing again.');
    }
  }
});

// Putting it all together
// The following code creates a publisher, connects to a session (see Session basics), publishes a stream to the session when the client connects to the session, and detects when the publisher starts and stops streaming:
var session;
var publisher;
// Replace with the replacement element ID:
publisher = OT.initPublisher(replacementElementId);
publisher.on({
  streamCreated: function (event) {
    console.log("Publisher started streaming.");
  },
  streamDestroyed: function (event) {
    console.log("Publisher stopped streaming. Reason: "
      + event.reason);
  }
});
// Replace API_KEY and sessionID with your own values:
session = OT.initSession(API_KEY, sessionID);
// Replace token with your own value:
session.connect(token, function (error) {
  if (session.capabilities.publish == 1) {
    session.publish(publisher);
  } else {
    console.log("You cannot publish an audio-video stream.");
  }
});
