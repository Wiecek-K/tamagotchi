import Tamagotchi from "./tamagotchi";
import { ITamagotchiStatus, TTamagoState } from "./tamagotchi";

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
    console.log(this.tamagotchi.isInAction);

    this.tamagotchi.mount({
      healthElement,
      hungerElement,
      energyElement,
      funElement,
      stateElement,
    });
    console.log("Game updated");
  };

  setState = (nextState: TTamagoState) => {
    console.log("lastState", this.tamagotchi.lastState);
    console.log("next State", this.tamagotchi.nextState);

    if (this.tamagotchi.lastState != nextState) {
      this.tamagotchi.isInAction = true;
      this.tamagotchi.nextState = nextState;
    } else {
      this.tamagotchi.isInAction = false;
    }
  };
  // setTamagoState=()=>{}
}
