import Tamagotchi from "./tamagotchi";
import { ITamagotchiStatus } from "./tamagotchi";

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

  update = ({
    healthElement,
    hungerElement,
    energyElement,
    funElement,
  }: ITamagotchiStatus) => {
    this.tamagotchi.decraseLifeParams();

    this.tamagotchi.mount({
      healthElement,
      hungerElement,
      energyElement,
      funElement,
    });
    console.log("Game updated");
  };
}
