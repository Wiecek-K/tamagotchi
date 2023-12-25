import Game from "./modules/game.js";
document.addEventListener("DOMContentLoaded", () => {
  const game = new Game({
    healthElement: "#healthPoint",
    energyElement: "#energyPoint",
    funElement: "#funPoint",
    hungerElement: "#hungerPoint",
    stateElement: "#gameDisplay",
    actionsBar: "#actionButtons"
  });
  game.init();
});
