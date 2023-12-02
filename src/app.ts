import Game from "./modules/game";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();

  // Start game
  game.start({
    healthElement: "#healthPoint",
    energyElement: "#energyPoint",
    funElement: "#funPoint",
    hungerElement: "#hungerPoint",
  });

  setInterval(() => {
    game.update({
      healthElement: "#healthPoint",
      energyElement: "#energyPoint",
      funElement: "#funPoint",
      hungerElement: "#hungerPoint",
    });
  }, 1000);

  //add event listener click action btns
  //change state in game
  //game will use abilities
});
