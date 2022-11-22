import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import PubSub from "./PubSub.js";
import sources from "../sources";

export default (() => {
  const items = {};
  const loaders = {};

  let toLoad = 0;
  let loaded = 0;

  function init() {
    toLoad = sources.length;
    loaders.gltfLoader = new GLTFLoader();
    loaders.textureLoader = new THREE.TextureLoader();
    loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
    load();
  }

  function load() {
    for (const source of sources) {
      if (source.type === "gltfModel") {
        loaders.gltfLoader.load(source.path, (file) => {
          // console.log(file);
          sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        loaders.textureLoader.load(source.path, (file) => {
          sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        loaders.cubeTextureLoader.load(source.path, (file) => {
          sourceLoaded(source, file);
        });
      }
    }
  }

  function sourceLoaded(source, file) {
    items[source.name] = file;
    loaded++;

    PubSub.publish("loaded", `${(loaded / toLoad) * 100}%`);

    if (loaded === toLoad) {
      PubSub.publish("ready");
    }
  }

  return {
    init,
    items,
  };
})();
