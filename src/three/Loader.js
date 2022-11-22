import PubSub from "./utils/PubSub.js";

export default (() => {
  function init() {
    PubSub.subscribe("loaded", (_event, data) => {
      const percentageComplete = data;
      console.log(percentageComplete);
    });
  }

  return {
    init,
  };
})();
