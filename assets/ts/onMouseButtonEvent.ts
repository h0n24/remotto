function triggerMouseClick(element: Element | null) {
  // Check if the element exists
  if (element) {
    // Create a new MouseEvent of type 'click'
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    // Dispatch the click event on the element
    element.dispatchEvent(clickEvent);
  } else {
    console.error("Element not found");
  }
}

// on middle button click
function onMouseButtonEvent() {
  // when user clicks anywhere with the middle button
  document.addEventListener("mousedown", function (event) {
    // Check if the middle button (button code 1) is clicked
    if (event.button === 1) {
      const element = document.querySelector(
        ".reactions-menu-popup-container + .toolbar-button-with-badge div"
      );

      triggerMouseClick(element);
    }
  });

  document.addEventListener("wheel", function (event) {
    // Scroll up detection
    if (event.deltaY < 0) {
      const element = document.querySelector(
        ".reactions-menu-popup-container + div + div div"
      );

      triggerMouseClick(element);
    }

    // Scroll down detection
    if (event.deltaY > 0) {
      const element = document.querySelector(".toolbar-button-with-badge div");

      triggerMouseClick(element);
    }
  });
}

export default onMouseButtonEvent;
