import * as THREE from "three";

import PubSub from "../utils/PubSub.js";
import Experience from "../Experience.js";
import Resources from "../utils/Resources.js";
import Time from "../utils/Time.js";

export default (() => {
  let model = null;
  let animation = {};
  let animations = {};
  let currentAnimation = null;

  function init() {
    setModel();
    setAnimation("Survey");
    playAnimation("Survey");
    setTimeout(() => {
      playAnimation("Run");
    }, 3000);
    setTimeout(() => {
      playAnimation("Walk");
    }, 6000);
    setTimeout(() => {
      playAnimation("Survey");
    }, 9000);
  }

  function setModel() {
    model = Resources.items.foxModel;
    model.scene.scale.set(0.02, 0.02, 0.02);
    Experience.scene.add(model.scene);

    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  function setAnimation() {
    animation.mixer = new THREE.AnimationMixer(model.scene);
    model.animations.forEach((anim) => {
      animations[anim.name] = anim;
    });
  }

  function playAnimation(animationName) {
    animation.mixer = new THREE.AnimationMixer(model.scene);
    function setClipAction(anim) {
      return animation.mixer.clipAction(anim);
    }
    if (currentAnimation) {
      const newAnimation = setClipAction(animations[animationName]);
      const oldAnimation = setClipAction(currentAnimation);
      oldAnimation.crossFadeTo(newAnimation, 0.3, true);
      newAnimation.play();
    } else {
      animation.action = animation.mixer.clipAction(animations[animationName]);
      animation.action.play();
    }
    currentAnimation = animations[animationName];
  }

  function update() {
    if (model) {
      animation.mixer.update(Time.getDeltaTime() * 0.001);
    }
  }

  return {
    init,
    update,
    setAnimation,
  };
})();
