import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import Experience from "./Experience.js";
import Renderer from "./Renderer.js";
import Sizes from "./utils/Sizes.js";
import PubSub from "./utils/PubSub.js";

export default (() => {
  let camera = null;
  let controls = null;

  PubSub.subscribe("resize", resize);

  function init() {
    camera = new THREE.PerspectiveCamera(35, Sizes.getAspectRatio(), 0.1, 100);
    camera.position.set(6, 4, 8);
    Experience.scene.add(camera);
    setControls();
  }

  function get() {
    return camera;
  }

  function setControls() {
    controls = new OrbitControls(camera, Renderer.getCanvas());
    controls.enableDamping = true;
  }

  function resize() {
    camera.aspect = Sizes.getAspectRatio();
    camera.updateProjectionMatrix();
  }

  function update() {
    controls.update();
  }

  return {
    get,
    init,
    resize,
    update,
  };
})();
