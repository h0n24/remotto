import translate from "./_translate";

let wasModeratorScreenForced = false;

function toggleMicrophone() {
  // get the current state of the microphone
  // @ts-ignore
  const currentState = APP.conference.isLocalAudioMuted();

  // toggle the state of the microphone in the remotto
  // @ts-ignore
  APP.conference.toggleAudioMuted(!currentState);

  // toggle the state inside Picture-in-Picture window
  // @ts-ignore
  navigator.mediaSession.setMicrophoneActive(currentState);
}

function showPictureInPicture(moderatorId: any) {
  const videoID = `#remoteVideo_${moderatorId}-video-1`;

  // Listen for visibility change event
  document.addEventListener("visibilitychange", () => {
    // Check if the document is hidden
    if (document.hidden) {
      // Check if picture-in-picture is supported
      const video = document.querySelector(videoID) as HTMLVideoElement;

      if (
        video !== undefined &&
        video !== null &&
        document.pictureInPictureEnabled
      ) {
        // Request picture-in-picture mode
        try {
          if (document.pictureInPictureElement) return;

          if (video.readyState === 4) {
            // it's loaded
            console.log("video is loaded");
            video.requestPictureInPicture();
          }

          video.addEventListener("leavepictureinpicture", (event) => {
            // alert("Picture-in-Picture mode has been closed");
            createPiPButton(moderatorId);

            let pictureInPictureButton = document.querySelector(
              "#pictureInPictureButton"
            ) as HTMLElement;

            pictureInPictureButton.style.display = "block";
          });
        } catch (error) {
          console.warn("error requesting picture in picture", error);
        }
      }

      // if picture is disabled
      if (!document.pictureInPictureEnabled) {
        console.info("picture in picture is disabled");
      }
    }
  });
}

function createPiPButton(moderatorId: any) {
  const largeVideo = document.querySelector(
    "#largeVideoElementsContainer"
  ) as HTMLElement;

  if (largeVideo?.style.visibility !== "visible") {
    // at the beginning, show the moderator's video

    // skip it if it was already shown after page refresh
    if (wasModeratorScreenForced) {
      return;
    }

    const videoID = `#remoteVideo_${moderatorId}-video-1`;
    const video = document.querySelector(videoID) as HTMLVideoElement;
    video.click();

    wasModeratorScreenForced = true;
  } else {
    // check if pictureInPicture is enabled, otherwise dont create the button
    if (!document.pictureInPictureEnabled) {
      return;
    }

    // add new element to the largeVideo
    // create element inside the largeVideo's parent
    const largeVideoWrapper = document.querySelector(
      "#largeVideoWrapper"
    ) as HTMLElement;

    // check if the element already exists
    let pictureInPictureButton = document.querySelector(
      "#pictureInPictureButton"
    ) as HTMLElement;

    // if the element doesnt exist, create it
    if (!pictureInPictureButton) {
      pictureInPictureButton = document.createElement("div");
      pictureInPictureButton.id = "pictureInPictureButton";
      pictureInPictureButton.title = translate("pipTitle");

      // when clicked, hide the pictureInPictureButton
      pictureInPictureButton.addEventListener("click", () => {
        pictureInPictureButton.style.display = "none";
      });

      // add div inside the pictureInPictureButton
      const pictureInPictureButtonInner = document.createElement("div");
      pictureInPictureButtonInner.id = "pictureInPictureButtonInner";
      pictureInPictureButtonInner.textContent = translate("pipText");

      pictureInPictureButton.appendChild(pictureInPictureButtonInner);
      largeVideoWrapper.appendChild(pictureInPictureButton);

      checkIfMonitorExtended(pictureInPictureButton);
    }
  }

  function checkIfMonitorExtended(pictureInPictureButton: HTMLElement) {
    let windowScreen = window.screen as any;
    if (!windowScreen) return;

    if (windowScreen.isExtended) {
      pictureInPictureButton.style.display = "none";
    }
  }
}

function createPictureInPicture(moderatorId: any) {
  showPictureInPicture(moderatorId);

  // Add a button to the picture-in-picture mode via MediaSession's setActionHandler() method
  if ("mediaSession" in navigator) {
    // @ts-ignore
    const currentState = APP.conference.isLocalAudioMuted();

    // set the initial state of the microphone
    // has to be opposite due to the isLocalAudioMuted() function
    // @ts-ignore
    navigator.mediaSession.setMicrophoneActive(!currentState);

    // @ts-ignore
    navigator.mediaSession.setActionHandler("togglemicrophone", () => {
      toggleMicrophone();
    });
  }

  createPiPButton(moderatorId);
}

export default createPictureInPicture;
