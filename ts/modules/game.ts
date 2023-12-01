import Tamagotchi from "./tamagotchi";

export default class Game {
  constructor() {
    this.tamagotchi = new Tamagotchi();
  }

  start = ({ healthElement, hungerElement, energyElement, funElement }) => {
    this.tamagotchi.mount({ healthElement });
    console.log("Game started");
  };
}
