import Tamagotchi from "./tamagotchi";
import { ITamagotchiStatus } from "src/types/tamagotchi";

export default class Game {
  tamagotchi: Tamagotchi;
  constructor() {
    this.tamagotchi = new Tamagotchi();
  }

  start = ({
    healthElement,
    hungerElement,
    energyElement,
    funElement,
  }: ITamagotchiStatus) => {
    this.tamagotchi.mount({
      healthElement,
      hungerElement,
      energyElement,
      funElement,
    });
    console.log("Game started");
  };
}
