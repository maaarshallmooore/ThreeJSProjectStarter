import * as THREE from "three";

import Experience from "../Experience.js";
import Resources from "../utils/Resources.js";

export default (() => {
  let geometry = null;
  let textures = null;
  let material = null;
  let mesh = null;

  function init() {
    setGeometry();
    setTextures();
    setMaterial();
    setMesh();
  }

  function setGeometry() {
    geometry = new THREE.CircleGeometry(5, 64);
  }

  function setTextures() {
    textures = {};

    textures.color = Resources.items.grassColorTexture;
    textures.color.encoding = THREE.sRGBEncoding;
    textures.color.repeat.set(1.5, 1.5);
    textures.color.wrapS = THREE.RepeatWrapping;
    textures.color.wrapT = THREE.RepeatWrapping;

    textures.normal = Resources.items.grassNormalTexture;
    textures.color.repeat.set(1.5, 1.5);
    textures.normal.wrapS = THREE.RepeatWrapping;
    textures.normal.wrapT = THREE.RepeatWrapping;
  }

  function setMaterial() {
    material = new THREE.MeshStandardMaterial({
      map: textures.color,
      normalMap: textures.normal,
    });
  }

  function setMesh() {
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI * 0.5;
    mesh.receiveShadow = true;
    Experience.scene.add(mesh);
  }

  return {
    init,
  };
})();
