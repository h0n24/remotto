import translate from "./_translate";

let isMenuShown = false;

function sendPrivateMessage(targetId: string, message: string) {
  try {
    //@ts-ignore it's on the website
    APP.conference._room.sendPrivateTextMessage(targetId, message);
  } catch (error) {
    console.warn("error sending private message", error);
  }
}

function createContextMenu() {
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
    linkItem.title = translate("willSendMsg") + longMessage;
    linkItem.addEventListener("click", function (clickEvent) {
      clickEvent.preventDefault();

      sendPrivateMessage(targetId, longMessage);

      hideContextMenu();
    });

    menuItem.appendChild(linkItem);
    menu.appendChild(menuItem);
  }

  // prevent if clicking on ourselves
  // console.log(videocontainer.id);
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

  createMenuItem(translate("msgNotSharing"), translate("msgNotSharingLong"));
  createMenuItem(translate("msgYouHere"), translate("msgYouHere"));
  createMenuItem(translate("msgYouHear"), translate("msgYouHear"));
  createMenuItem(translate("msgRestart"), translate("msgRestartLong"));

  isMenuShown = true;
}

function addCustomContextMenu() {
  createContextMenu();

  setInterval(function () {
    try {
      document.querySelectorAll(".videocontainer").forEach((videocontainer) => {
        videocontainer.addEventListener("contextmenu", (event) =>
          participantContextMenu(videocontainer, event)
        );
      });
    } catch (error) {
      console.warn("test error", error);
    }
  }, 1000);

  document.addEventListener("click", function (event) {
    if (isMenuShown) hideContextMenu();
  });
}

export default addCustomContextMenu;
