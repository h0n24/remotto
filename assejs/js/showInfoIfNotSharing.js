"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function toggleInfoNotSharingScreen() {
  var sharingInfo = document.querySelector("#sharingInfo");
  if (!sharingInfo) return;

  // @ts-ignore
  var isSharingScreen = APP.conference.isSharingScreen;
  if (isSharingScreen) {
    sharingInfo.style.display = "none";
  } else {
    sharingInfo.style.display = "block";
  }
}
function showInfoIfNotSharingScreen() {
  // create element #sharingInfo
  var sharingInfo = document.querySelector("#sharingInfo");
  if (!sharingInfo) {
    var _sharingInfo = document.createElement("div");
    _sharingInfo.id = "sharingInfo";
    _sharingInfo.innerHTML = "Nesdílíš obrazovku, v našich hodinách je třeba neustále sdílet celou obrazovku.";

    // on click
    _sharingInfo.addEventListener("click", function () {
      // @ts-ignore
      APP.conference.toggleScreenSharing();
    });
    var largeVideoWrapper = document.querySelector("#videoconference_page");
    largeVideoWrapper.appendChild(_sharingInfo);
  }
  toggleInfoNotSharingScreen();
}
var _default = showInfoIfNotSharingScreen;
exports.default = _default;