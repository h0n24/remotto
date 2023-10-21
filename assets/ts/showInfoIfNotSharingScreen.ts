import translate from "./_translate";

function toggleInfoNotSharingScreen() {
  const sharingInfo = document.querySelector("#sharingInfo") as HTMLElement;

  if (!sharingInfo) return;

  // @ts-ignore
  let isSharingScreen = APP.conference.isSharingScreen;

  if (isSharingScreen) {
    sharingInfo.style.display = "none";
  } else {
    sharingInfo.style.display = "block";
  }
}

function showInfoIfNotSharingScreen() {
  // create element #sharingInfo
  const sharingInfo = document.querySelector("#sharingInfo") as HTMLElement;
  if (!sharingInfo) {
    const sharingInfo = document.createElement("div");
    sharingInfo.id = "sharingInfo";
    sharingInfo.innerHTML = translate("youNotSharing");

    // on click
    sharingInfo.addEventListener("click", () => {
      // @ts-ignore
      APP.conference.toggleScreenSharing();
    });

    const largeVideoWrapper = document.querySelector(
      "#videoconference_page"
    ) as HTMLElement;
    largeVideoWrapper.appendChild(sharingInfo);
  }

  toggleInfoNotSharingScreen();
}

export default showInfoIfNotSharingScreen;
