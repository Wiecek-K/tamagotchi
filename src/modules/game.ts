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
    stateElement,
  }: ITamagotchiStatus) => {
    this.tamagotchi.mount({
      healthElement,
      hungerElement,
      energyElement,
      funElement,
      stateElement,
    });
    console.log("Game started");
  };

  update = ({
    healthElement,
    hungerElement,
    energyElement,
    funElement,
    stateElement,
  }: ITamagotchiStatus) => {
    this.tamagotchi.decraseLifeParams();
    this.tamagotchi.checkState();

    this.tamagotchi.mount({
      healthElement,
      hungerElement,
      energyElement,
      funElement,
      stateElement,
    });
    console.log("Game updated");
  };

  // setTamagoState=()=>{}
}
