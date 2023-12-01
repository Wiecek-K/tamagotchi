import Game from "./modules/game";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();

  // Start game
  game.start({ healthElement: ".health" });
});
