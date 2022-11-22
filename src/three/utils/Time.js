import PubSub from "./PubSub.js";

export default (() => {
  const start = Date.now();
  let current = start;
  let elapsed = 0;
  let delta = 16;

  function init() {
    window.requestAnimationFrame(tick);
  }

  function getDeltaTime() {
    return delta;
  }

  function getElapsedTime() {
    return elapsed;
  }

  function tick() {
    window.requestAnimationFrame(tick);

    const currentTime = Date.now();
    delta = currentTime - current;
    current = currentTime;
    elapsed = current - start;

    PubSub.publish("tick");
  }

  return {
    init,
    getDeltaTime,
    getElapsedTime,
  };
})();
