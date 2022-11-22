import PubSub from "./PubSub.js";

export default (() => {
  let canvasWrap = null;

  function init(el) {
    canvasWrap = el;
  }

  function getHeight() {
    return canvasWrap.offsetHeight;
  }

  function getWidth() {
    return canvasWrap.offsetWidth;
  }

  function getAspectRatio() {
    return getWidth() / getHeight();
  }

  let pixelRatio = Math.min(window.devicePixelRatio, 2);

  window.addEventListener("resize", () => {
    pixelRatio = Math.min(window.devicePixelRatio, 2);
    PubSub.publish("resize");
  });

  return {
    init,
    getHeight,
    getWidth,
    getAspectRatio,
    pixelRatio,
  };
})();
