import * as THREE from "three";
import Time from "./utils/Time.js";
import PubSub from "./utils/PubSub.js";
import Renderer from "./Renderer.js";
import Camera from "./Camera.js";
import Resources from "./utils/Resources.js";
import World from "./World/World.js";
import Loader from "./Loader.js";

export default (() => {
  const scene = new THREE.Scene();

  PubSub.subscribe("tick", update);

  function init(canvas) {
    Loader.init();
    Time.init();
    Renderer.init(canvas);
    Camera.init();
    Resources.init();
    World.init();
  }

  function update() {
    Camera.update();
    World.update();
    Renderer.update();
  }

  return {
    init,
    scene,
  };
})();
