import PubSub from "../utils/PubSub.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Fox from "./Fox.js";

export default (() => {
  function init() {
    PubSub.subscribe("ready", () => {
      Environment.init();
      Floor.init();
      Fox.init();
    });
  }

  function update() {
    Fox.update();
  }

  return {
    init,
    update,
  };
})();
