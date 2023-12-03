import Game from "./modules/game";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game({
    healthElement: "#healthPoint",
    energyElement: "#energyPoint",
    funElement: "#funPoint",
    hungerElement: "#hungerPoint",
    stateElement: "#gameDisplay",
    actionsBar: "#actionButtons",
  });

  // Start game
  game.init();
});
