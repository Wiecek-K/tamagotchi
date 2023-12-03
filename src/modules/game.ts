import Tamagotchi from "./tamagotchi";
import { ITamagotchiStatus, TTamagoState } from "./tamagotchi";

export default class Game {
  tamagotchi: Tamagotchi;
  counter = 0;
  gameUpdateInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.tamagotchi = new Tamagotchi();
  }

  init = ({
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
    this.start({
      healthElement,
      hungerElement,
      energyElement,
      funElement,
      stateElement,
    });
  };

  start = ({
    healthElement,
    hungerElement,
    energyElement,
    funElement,
    stateElement,
  }: ITamagotchiStatus) => {
    if (!this.gameUpdateInterval) {
      this.gameUpdateInterval = setInterval(() => {
        if (!(this.counter % 5)) {
          this.tamagotchi.incraseLifeParams();
          this.tamagotchi.decraseLifeParams();
          this.tamagotchi.checkMaxLifeParams();

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

        if (this.tamagotchi.lastState === "dead") {
          this.end();
        }

        this.counter++;
      }, 200);
    }
  };

  end = () => {
    if (this.gameUpdateInterval) {
      clearInterval(this.gameUpdateInterval);
      this.gameUpdateInterval = null;
    }
    console.log("Twój tamago umarł");
    console.log("NA ŚMIERĆ");
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
