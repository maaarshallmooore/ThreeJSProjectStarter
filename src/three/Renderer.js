import * as THREE from "three";
import Sizes from "./utils/Sizes.js";
import PubSub from "./utils/PubSub.js";
import Experience from "./Experience.js";
import Camera from "./Camera.js";

export default (() => {
  let renderer = null;
  let canvas = null;

  PubSub.subscribe("resize", resize);

  function init(canvasWrap) {
    Sizes.init(canvasWrap);
    canvas = document.createElement("canvas");
    canvasWrap.appendChild(canvas);
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.CineonToneMapping;
    renderer.toneMappingExposure = 1.75;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(Sizes.getWidth(), Sizes.getHeight());
    renderer.setPixelRatio(Math.min(Sizes.pixelRatio, 2));
    canvas.style.transition =
      "width 150ms ease-in-out, height 150ms ease-in-out";
  }

  function get() {
    return renderer;
  }

  function getCanvas() {
    return canvas;
  }

  function resize() {
    renderer.setSize(Sizes.getWidth(), Sizes.getHeight());
    renderer.setPixelRatio(Math.min(Sizes.pixelRatio, 2));
  }

  function update() {
    renderer.render(Experience.scene, Camera.get());
  }

  return {
    get,
    getCanvas,
    init,
    resize,
    update,
  };
})();
