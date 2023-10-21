import translate from "./_translate";

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
  // button to force refresh
  const refreshButton = document.createElement("button");
  refreshButton.id = "refreshButton";
  refreshButton.title = translate("refreshRemotto");

  document.body.appendChild(refreshButton);

  //@ts-ignore it's not null, it was created before calling this function
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

export default {
  create: onRefreshButtonClick,
};
