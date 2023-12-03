import Game from "./modules/game";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  const actionButtons = document.querySelector(
    ".actionButtons",
  ) as HTMLDivElement;
  if (!actionButtons) {
    throw new Error("action buttons not found");
  }

  // Start game
  game.start({
    healthElement: "#healthPoint",
    energyElement: "#energyPoint",
    funElement: "#funPoint",
    hungerElement: "#hungerPoint",
    stateElement: "#gameDisplay",
  });

  setInterval(() => {
    game.update({
      healthElement: "#healthPoint",
      energyElement: "#energyPoint",
      funElement: "#funPoint",
      hungerElement: "#hungerPoint",
      stateElement: "#gameDisplay",
    });
    game.counter++;
  }, 200);

  actionButtons.addEventListener("click", (e: MouseEvent) => {
    const clickedElement = e.target as HTMLDivElement;
    const actionButton = clickedElement.closest("button");

    if (
      actionButton?.id === "eating" ||
      actionButton?.id === "playing" ||
      actionButton?.id === "sleeping"
    ) {
      console.log("Clicked button id:", actionButton.id);
      game.setState(actionButton.id);
    }
  });


  //animation= one global interval
  //state put into this interval frames
  //evry action which change tamago state at first clear this interval

  //przenieść update do game
});
