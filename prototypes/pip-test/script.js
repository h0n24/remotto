// This part should automatically show video
// in the picture-in-picture mode when the tab/window is hidden.

let video = document.querySelector("video");

// Listen for visibility change event
document.addEventListener("visibilitychange", () => {
  // Check if the document is hidden
  if (document.hidden) {
    // Check if picture-in-picture is supported
    let video = document.querySelector("video");

    console.log("video", video);
    console.log(
      "document.pictureInPictureEnabled",
      document.pictureInPictureEnabled
    );

    if (
      video !== undefined &&
      video !== null &&
      document.pictureInPictureEnabled
    ) {
      // Request picture-in-picture mode
      video.requestPictureInPicture();
    }
  }
});

// Add a button to the picture-in-picture mode via MediaSession's setActionHandler() method
if ("mediaSession" in navigator) {
  navigator.mediaSession.setActionHandler("togglemicrophone", () => {
    toggleMicrophone();
  });

  // set action handler for MediaPlayPause
  // this is usefull when people use the play/pause button on their keyboard
  // we can utilize it for muting/unmuting the microphone
  navigator.mediaSession.setActionHandler("play", () => {
    console.log("play");
  });

  navigator.mediaSession.setActionHandler("pause", () => {
    console.log("pause");
  });
}

function toggleMicrophone() {
  console.log("toggleMicrophone");
}
