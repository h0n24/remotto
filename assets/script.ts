// imports
// import * as incl from "./ts/_includes";

let statsTalking = ["", "", ""];

function detectConnectedMembers() {
  try {
    //@ts-ignore it's on the website
    const members = APP.conference.listMembers();

    for (let membersIndex = 0; membersIndex < members.length; membersIndex++) {
      const member = members[membersIndex];

      const name = member._displayName;
      const tracks = member._tracks;

      for (let trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
        const track = tracks[trackIndex];
        findWhosTalking(track, name);
      }
    }
  } catch (error) {}
}

function findWhosTalking(track, name) {
  // we don't want videos or others
  if (track.type != "audio") return;

  // skip if muted -1 or if not talking 0
  if (track.audioLevel <= 0) return;

  let isInStats = false;
  let isLast = false;
  for (let i = 0; i < statsTalking.length; i++) {
    if (statsTalking[i] == name) {
      isInStats = true;

      if (i == 0) {
        isLast = true;
      }
    }
  }

  if (isInStats && !isLast) {
    const index = statsTalking.indexOf(name);
    if (index > -1) {
      statsTalking.splice(index, 1);
    }
    statsTalking.push(name);
  }

  if (!isInStats) {
    statsTalking.push(name);
    if (statsTalking.length > 3) {
      statsTalking.shift();
    }
    updateLastTalking();
  }
}

function updateLastTalking() {
  document.querySelector("#lastTalkingOne").innerHTML = statsTalking[0];
  document.querySelector("#lastTalkingTwo").innerHTML = statsTalking[1];
  document.querySelector("#lastTalkingThree").innerHTML = statsTalking[2];
}

// This function ONLY works for iFrames of the same origin as their parent
function iFrameReady(iFrame, fn) {
  var timer;
  var fired = false;

  function ready() {
    if (!fired) {
      fired = true;
      clearTimeout(timer);
      fn.call(this);
    }
  }

  function readyState() {
    if (this.readyState === "complete") {
      ready.call(this);
    }
  }

  // cross platform event handler for compatibility with older IE versions
  function addEvent(elem, event, fn) {
    if (elem.addEventListener) {
      return elem.addEventListener(event, fn);
    } else {
      return elem.attachEvent("on" + event, function () {
        return fn.call(elem, window.event);
      });
    }
  }

  // use iFrame load as a backup - though the other events should occur first
  addEvent(iFrame, "load", function () {
    ready.call(iFrame.contentDocument || iFrame.contentWindow.document);
  });

  function checkLoaded() {
    var doc = iFrame.contentDocument || iFrame.contentWindow.document;
    // We can tell if there is a dummy document installed because the dummy document
    // will have an URL that starts with "about:".  The real document will not have that URL
    if (doc.URL.indexOf("about:") !== 0) {
      if (doc.readyState === "complete") {
        ready.call(doc);
      } else {
        // set event listener for DOMContentLoaded on the new document
        addEvent(doc, "DOMContentLoaded", ready);
        addEvent(doc, "readystatechange", readyState);
      }
    } else {
      // still same old original document, so keep looking for content or new document
      timer = setTimeout(checkLoaded, 1);
    }
  }
  checkLoaded();
}

function onRefreshButtonClick() {
  document
    .getElementById("refreshButton")
    .addEventListener("click", function () {
      const refreshIframe = document.createElement(
        "iframe"
      ) as HTMLIFrameElement;
      refreshIframe.id = "refreshIframe";
      refreshIframe.setAttribute("sandbox", "allow-same-origin allow-scripts");
      refreshIframe.src = window.location.href;

      document.body.appendChild(refreshIframe);

      iFrameReady(document.getElementById("refreshIframe"), function () {
        setTimeout(function () {
          document.body.removeChild(refreshIframe);
        }, 6000);
      });
    });
}

function createElementsOnStart() {
  // create lastTalking element
  const lastTalking = document.createElement("div");
  lastTalking.id = "lastTalking";

  // lastTalking subelements
  const lastTalkingOne = document.createElement("div");
  lastTalkingOne.id = "lastTalkingOne";
  const lastTalkingTwo = document.createElement("div");
  lastTalkingTwo.id = "lastTalkingTwo";
  const lastTalkingThree = document.createElement("div");
  lastTalkingThree.id = "lastTalkingThree";

  lastTalking.appendChild(lastTalkingOne);
  lastTalking.appendChild(lastTalkingTwo);
  lastTalking.appendChild(lastTalkingThree);

  document.body.appendChild(lastTalking);

  // button to force refresh
  const refreshButton = document.createElement("button");
  refreshButton.id = "refreshButton";
  refreshButton.title = "Refresh obrazovek všech uživatelů";

  document.body.appendChild(refreshButton);

  onRefreshButtonClick();
}

// start code
setInterval(function () {
  detectConnectedMembers();
}, 1000);

createElementsOnStart();

// zablokovat logger
const DEBUG = true;
function disableLogs() {
  if (!DEBUG) {
    //@ts-ignore it's on the website
    if (!window.console) window.console = {};
    const methods = ["log", "debug", "warn", "info"];
    for (let i = 0; i < methods.length; i++) {
      console[methods[i]] = function () {};
    }
  }
}

disableLogs();

setTimeout(() => {
  disableLogs();
}, 1000);

// right click menu

function sendPrivateMessage(targetId: string, message: string) {
  try {
    //@ts-ignore it's on the website
    APP.conference._room.sendPrivateTextMessage(targetId, message);
  } catch (error) {
    console.warn("error sending private message", error);
  }
}

function initContextMenu() {
  const menu = document.createElement("ul");
  menu.className = "menu";

  document.body.appendChild(menu);
}

function hideContextMenu() {
  const menu = document.querySelector(".menu") as HTMLElement;
  menu.style.display = "none";
  isMenuShown = false;
}

function participantContextMenu(videocontainer: Element, event: any) {
  function createMenuItem(shortMessage, longMessage) {
    const menuItem = document.createElement("li");
    menuItem.className = "menu-item";

    const linkItem = document.createElement("a");
    linkItem.href = "#";
    linkItem.innerHTML = shortMessage;
    linkItem.title = "Pošle soukromou zprávu: " + longMessage;
    linkItem.addEventListener("click", function (clickEvent) {
      clickEvent.preventDefault();

      sendPrivateMessage(targetId, longMessage);

      hideContextMenu();
    });

    menuItem.appendChild(linkItem);
    menu.appendChild(menuItem);
  }

  // prevent if clicking on ourselves
  console.log(videocontainer.id);
  const videoId = videocontainer.id;

  if (videoId === "localVideoContainer") return;
  if (videoId === "largeVideoContainer") return;

  event.preventDefault();

  const menu = document.querySelector(".menu") as HTMLElement;
  menu.style.display = "block";
  menu.style.left = event.clientX + "px";
  menu.style.top = event.clientY + "px";

  // remove all previous menu items
  while (menu.firstChild) {
    menu.removeChild(menu.firstChild);
  }
  // add new menu items
  let targetId: string = videoId.split("_")[1];

  createMenuItem(
    "Nesdílíš obrazovku",
    "Nesdílíš obrazovku. V hodinách je nutné stále sdílet obrazovku."
  );
  createMenuItem("Jsi tady?", "Jsi tady?");
  createMenuItem("Slyšíš nás?", "Slyšíš nás?");
  createMenuItem(
    "Restartuj Remotto",
    "Restartuj Remotto, snad to vyřeší Tvé trable"
  );

  isMenuShown = true;
}

initContextMenu();

let isMenuShown = false;
// TODO: rework with observers so it's not added multiple times (could lead to js heap overflow)
setInterval(function () {
  try {
    document.querySelectorAll(".videocontainer").forEach((videocontainer) => {
      videocontainer.addEventListener(
        "contextmenu",
        (event) => participantContextMenu(videocontainer, event),
        { once: true }
      );
    });
  } catch (error) {
    console.warn("test error", error);
  }
}, 1000);

document.addEventListener("click", function (event) {
  if (isMenuShown) hideContextMenu();
});
