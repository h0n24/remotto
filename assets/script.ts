// imports
import translate from "./ts/_translate";
import whosTalking from "./ts/findWhosTalking";
import refreshButton from "./ts/addRefreshButton";
import addCustomContextMenu from "./ts/addCustomContextMenu";
import createPictureInPicture from "./ts/showPictureInPicture";
import showInfoIfNotSharingScreen from "./ts/showInfoIfNotSharingScreen";
import onMouseButtonEvent from "./ts/onMouseButtonEvent";

let hasRoomModerator = false;

function whenMemberIsModerator(member: any) {
  if (member._role === "moderator") {
    hasRoomModerator = true;

    const moderatorId = member._id;
    createPictureInPicture(moderatorId);
  }
}

function detectConnectedMembers() {
  try {
    //@ts-ignore it's on the website
    const members = APP.conference.listMembers();

    for (let membersIndex = 0; membersIndex < members.length; membersIndex++) {
      const member = members[membersIndex];

      // find who is talking
      const name = member._displayName;
      const tracks = member._tracks;

      for (let trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
        const track = tracks[trackIndex];
        whosTalking.find(track, name);
      }

      // find if the member is moderator
      whenMemberIsModerator(member);
    }
  } catch (error) {}
}

function createElementsOnStart() {
  refreshButton.create();
}

function createElementsOnStartModerator() {
  whosTalking.create();
}

// start code
createElementsOnStart();

setInterval(function () {
  detectConnectedMembers();

  // sadly remotto has a bug, is not showing the info if the user is not sharing screen
  // showInfoIfNotSharingScreen();
}, 1000);

// set timeout so the moderator can be detected
setTimeout(() => {
  if (!hasRoomModerator) {
    // create elements on start
    createElementsOnStartModerator();

    // right click menu
    addCustomContextMenu();
  }

  // on middle button click, scroll up, scroll down
  onMouseButtonEvent();
}, 1000);
