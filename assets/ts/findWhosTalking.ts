import translate from "./_translate";

let statsTalking = ["", "", ""];

function findTalking(track, name) {
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
  const lastTalkingOne = document.querySelector("#lastTalkingOne");
  const lastTalkingTwo = document.querySelector("#lastTalkingTwo");
  const lastTalkingThree = document.querySelector("#lastTalkingThree");

  if (lastTalkingOne) {
    lastTalkingOne.innerHTML = statsTalking[0];
  }

  if (lastTalkingTwo) {
    lastTalkingTwo.innerHTML = statsTalking[1];
  }

  if (lastTalkingThree) {
    lastTalkingThree.innerHTML = statsTalking[2];
  }
}

function createLastTalkingElements() {
  const lastTalking = document.createElement("div");
  lastTalking.id = "lastTalking";

  // lastTalking subelements
  const lastTalkingOne = document.createElement("div");
  lastTalkingOne.id = "lastTalkingOne";
  const lastTalkingTwo = document.createElement("div");
  lastTalkingTwo.id = "lastTalkingTwo";
  const lastTalkingThree = document.createElement("div");
  lastTalkingThree.id = "lastTalkingThree";

  lastTalkingOne.title = translate("lastTalker1");
  lastTalkingTwo.title = translate("lastTalker2");
  lastTalkingThree.title = translate("lastTalker3");

  lastTalking.appendChild(lastTalkingOne);
  lastTalking.appendChild(lastTalkingTwo);
  lastTalking.appendChild(lastTalkingThree);

  document.body.appendChild(lastTalking);
}
export default {
  find: findTalking,
  create: createLastTalkingElements,
};
