"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function createPictureInPicture(moderatorId) {
  showPictureInPicture(moderatorId);

  // Add a button to the picture-in-picture mode via MediaSession's setActionHandler() method
  if ("mediaSession" in navigator) {
    // @ts-ignore
    var currentState = APP.conference.isLocalAudioMuted();

    // set the initial state of the microphone
    // has to be opposite due to the isLocalAudioMuted() function
    // @ts-ignore
    navigator.mediaSession.setMicrophoneActive(!currentState);

    // @ts-ignore
    navigator.mediaSession.setActionHandler("togglemicrophone", function () {
      toggleMicrophone();
    });
  }
  function toggleMicrophone() {
    // get the current state of the microphone
    // @ts-ignore
    var currentState = APP.conference.isLocalAudioMuted();

    // toggle the state of the microphone in the remotto
    // @ts-ignore
    APP.conference.toggleAudioMuted(!currentState);

    // toggle the state inside Picture-in-Picture window
    // @ts-ignore
    navigator.mediaSession.setMicrophoneActive(currentState);
  }
}
function showPictureInPicture(moderatorId) {
  var videoID = "#remoteVideo_".concat(moderatorId, "-video-1");

  // Listen for visibility change event
  document.addEventListener("visibilitychange", function () {
    // Check if the document is hidden
    if (document.hidden) {
      // Check if picture-in-picture is supported
      var video = document.querySelector(videoID);
      if (video !== undefined && video !== null && document.pictureInPictureEnabled) {
        // Request picture-in-picture mode
        video.requestPictureInPicture();
      }

      // if picture is disabled
      if (!document.pictureInPictureEnabled) {
        console.info("picture in picture is disabled");
      }
    }
  });
}
var _default = createPictureInPicture;
exports.default = _default;