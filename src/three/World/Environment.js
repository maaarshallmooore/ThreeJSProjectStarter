import * as THREE from "three";

import Experience from "../Experience.js";
import Resources from "../utils/Resources.js";

export default (() => {
  let sunLight = null;
  let environmentMap = null;

  function init() {
    setSunLight();
    setEnvironmentMap();
  }

  function setSunLight() {
    if (sunLight) return sunLight;
    sunLight = new THREE.DirectionalLight("#FFFFFF", 4);
    sunLight.castShadow = true;
    sunLight.shadow.camera.far = 15;
    sunLight.shadow.normalBias = 0.05;
    sunLight.shadow.mapSize.set(1024, 1024);
    sunLight.position.set(3, 3, -2.25);
    Experience.scene.add(sunLight);
  }

  function setEnvironmentMap() {
    if (environmentMap) return environmentMap;
    environmentMap = {};
    environmentMap.intensity = 0.4;
    environmentMap.texture = Resources.items.environmentMapTexture;
    environmentMap.texture.encoding = THREE.sRGBEncoding;

    Experience.scene.environment = environmentMap.texture;

    environmentMap.updateMaterials = () => {
      Experience.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = environmentMap.texture;
          child.material.environmentMap = environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    environmentMap.updateMaterials();
  }

  return {
    init,
  };
})();
