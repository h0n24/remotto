var statsTalking=["","",""];function detectConnectedMembers(){try{for(var e=APP.conference.listMembers(),t=0;t<e.length;t++)for(var n=e[t],o=n._displayName,a=n._tracks,i=0;i<a.length;i++){findWhosTalking(a[i],o)}}catch(e){}}function findWhosTalking(e,t){if("audio"==e.type&&!(e.audioLevel<=0)){for(var n=!1,o=!1,a=0;a<statsTalking.length;a++)statsTalking[a]==t&&(n=!0,0==a&&(o=!0));if(n&&!o){var i=statsTalking.indexOf(t);i>-1&&statsTalking.splice(i,1),statsTalking.push(t)}n||(statsTalking.push(t),statsTalking.length>3&&statsTalking.shift(),updateLastTalking())}}function updateLastTalking(){document.querySelector("#lastTalkingOne").innerHTML=statsTalking[0],document.querySelector("#lastTalkingTwo").innerHTML=statsTalking[1],document.querySelector("#lastTalkingThree").innerHTML=statsTalking[2]}function iFrameReady(e,t){var n,o=!1;function a(){o||(o=!0,clearTimeout(n),t.call(this))}function i(){"complete"===this.readyState&&a.call(this)}function r(e,t,n){return e.addEventListener?e.addEventListener(t,n):e.attachEvent("on"+t,(function(){return n.call(e,window.event)}))}r(e,"load",(function(){a.call(e.contentDocument||e.contentWindow.document)})),function t(){var o=e.contentDocument||e.contentWindow.document;0!==o.URL.indexOf("about:")?"complete"===o.readyState?a.call(o):(r(o,"DOMContentLoaded",a),r(o,"readystatechange",i)):n=setTimeout(t,1)}()}function onRefreshButtonClick(){document.getElementById("refreshButton").addEventListener("click",(function(){var e=document.createElement("iframe");e.id="refreshIframe",e.setAttribute("sandbox","allow-same-origin allow-scripts"),e.src=window.location.href,document.body.appendChild(e),iFrameReady(document.getElementById("refreshIframe"),(function(){setTimeout((function(){document.body.removeChild(e)}),6e3)}))}))}function createElementsOnStart(){var e=document.createElement("div");e.id="lastTalking";var t=document.createElement("div");t.id="lastTalkingOne";var n=document.createElement("div");n.id="lastTalkingTwo";var o=document.createElement("div");o.id="lastTalkingThree",e.appendChild(t),e.appendChild(n),e.appendChild(o),document.body.appendChild(e);var a=document.createElement("button");a.id="refreshButton",a.title="Refresh obrazovek všech uživatelů",document.body.appendChild(a),onRefreshButtonClick()}setInterval((function(){detectConnectedMembers()}),1e3),createElementsOnStart();var DEBUG=!0;function disableLogs(){if(!DEBUG){window.console||(window.console={});for(var e=["log","debug","warn","info"],t=0;t<e.length;t++)console[e[t]]=function(){}}}function sendPrivateMessage(e,t){try{APP.conference._room.sendPrivateTextMessage(e,t)}catch(e){console.warn("error sending private message",e)}}function initContextMenu(){var e=document.createElement("ul");e.className="menu",document.body.appendChild(e)}function hideContextMenu(){document.querySelector(".menu").style.display="none",isMenuShown=!1}function participantContextMenu(e,t){function n(e,t){var n=document.createElement("li");n.className="menu-item";var o=document.createElement("a");o.href="#",o.innerHTML=e,o.title="Pošle soukromou zprávu: "+t,o.addEventListener("click",(function(e){e.preventDefault(),sendPrivateMessage(i,t),hideContextMenu()})),n.appendChild(o),a.appendChild(n)}console.log(e.id);var o=e.id;if("localVideoContainer"!==o&&"largeVideoContainer"!==o){t.preventDefault();var a=document.querySelector(".menu");for(a.style.display="block",a.style.left=t.clientX+"px",a.style.top=t.clientY+"px";a.firstChild;)a.removeChild(a.firstChild);var i=o.split("_")[1];n("Nesdílíš obrazovku","Nesdílíš obrazovku. V hodinách je nutné stále sdílet obrazovku."),n("Jsi tady?","Jsi tady?"),n("Slyšíš nás?","Slyšíš nás?"),n("Restartuj Remotto","Restartuj Remotto, snad to vyřeší Tvé trable"),isMenuShown=!0}}disableLogs(),setTimeout((function(){disableLogs()}),1e3),initContextMenu();var isMenuShown=!1;setInterval((function(){try{document.querySelectorAll(".videocontainer").forEach((function(e){e.addEventListener("contextmenu",(function(t){return participantContextMenu(e,t)}),{once:!0})}))}catch(e){console.warn("test error",e)}}),1e3),document.addEventListener("click",(function(e){isMenuShown&&hideContextMenu()}));