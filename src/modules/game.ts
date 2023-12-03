import Tamagotchi from "./tamagotchi";
import { ITamagotchiStatus, TTamagoState } from "./tamagotchi";

export default class Game {
  tamagotchi: Tamagotchi;
  counter = 0;

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
    if (!(this.counter % 5)) {
      this.tamagotchi.incraseLifeParams();
      this.tamagotchi.decraseLifeParams();

      if (this.counter >= 10000) {
        this.counter = 0;
      }
      this.tamagotchi.counter++;
    }
    this.tamagotchi.checkState();

    this.tamagotchi.mount({
      healthElement,
      hungerElement,
      energyElement,
      funElement,
      stateElement,
    });
  };

   setState = (nextState: TTamagoState) => {
     if (this.tamagotchi.lastState != nextState) {
       this.tamagotchi.isInAction = true;
       this.tamagotchi.nextState = nextState;
    } else {
       this.tamagotchi.isInAction = false;
     }
   };
}
