export var attachEvent = function (element, eventName, callback) {
    if (element && eventName && element.getAttribute("listener") !== "true") {
        element.setAttribute("listener", "true");
        element.addEventListener(eventName, function () {
            callback();
        });
    }
};
export var detachEvent = function (element, eventName, callback) {
    if (eventName && element) {
        element.removeEventListener(eventName, callback);
    }
};
