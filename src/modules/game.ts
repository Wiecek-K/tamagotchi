import Tamagotchi from "./tamagotchi";
import { ITamagotchiDisplay, TTamagoState } from "./tamagotchi";
interface ITamagotchiGameDisplay extends ITamagotchiDisplay {
  actionsBar: string;
}
export default class Game {
  tamagotchi: Tamagotchi;

  counter = 0;
  #gameUpdateInterval: NodeJS.Timeout | null = null;
  #healthElement: string;
  #hungerElement: string;
  #energyElement: string;
  #funElement: string;
  #stateElement: string;
  #actionsBar: string;

  constructor({
    healthElement,
    hungerElement,
    energyElement,
    funElement,
    stateElement,
    actionsBar,
  }: ITamagotchiGameDisplay) {
    this.tamagotchi = new Tamagotchi();
    this.#healthElement = healthElement;
    this.#hungerElement = hungerElement;
    this.#energyElement = energyElement;
    this.#funElement = funElement;
    this.#stateElement = stateElement;
    this.#actionsBar = actionsBar;
  }

  #actionsHandler = (e: MouseEvent) => {
    const clickedElement = e.target as HTMLElement;
    const actionButton = clickedElement.closest("button");

    if (
      actionButton?.id === "eating" ||
      actionButton?.id === "playing" ||
      actionButton?.id === "sleeping"
    ) {
      this.setState(actionButton.id);
    }
  };

  #startHandler = () => {
    this.start();
    console.log("peirwotny");
    document.removeEventListener("click", this.#startHandler);
  };

  init = () => {
    this.#displayActionsBar();

    this.tamagotchi.mount({
      healthElement: this.#healthElement,
      hungerElement: this.#hungerElement,
      energyElement: this.#energyElement,
      funElement: this.#funElement,
      stateElement: this.#stateElement,
    });
    setTimeout(() => {
      document.addEventListener("click", this.#startHandler);
      null;
    }, 10);
  };

  start = () => {
    if (!this.#gameUpdateInterval) {
      this.#gameUpdateInterval = setInterval(() => {
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
          healthElement: this.#healthElement,
          hungerElement: this.#hungerElement,
          energyElement: this.#energyElement,
          funElement: this.#funElement,
          stateElement: this.#stateElement,
        });

        if (this.tamagotchi.lastState === "dead") {
          this.end();
        }
        this.counter++;
      }, 10);
    }
  };

  end = () => {
    if (this.#gameUpdateInterval) {
      clearInterval(this.#gameUpdateInterval);
      this.#gameUpdateInterval = null;
    }

    this.#displayRestart();

    console.log("Twój tamago umarł");
    console.log("NA ŚMIERĆ");
    console.log(`Twój wynik to ${this.tamagotchi.counter}`);
  };

  setState = (nextState: TTamagoState) => {
    if (this.tamagotchi.lastState != nextState) {
      this.tamagotchi.isInAction = true;
      this.tamagotchi.nextState = nextState;
    } else {
      this.tamagotchi.isInAction = false;
    }
  };

  #displayActionsBar = () => {
    const actionsBar = document.querySelector(this.#actionsBar) as HTMLElement;
    if (!actionsBar) {
      throw new Error("element not found");
    }
    actionsBar.addEventListener("click", this.#actionsHandler);

    actionsBar.innerHTML = `<button id="eating" class="actionButton"><img src="./assets/icons/Icon=Hunger.svg" alt="let's eat" width="45" height="45"/></button><button id="sleeping" class="actionButton"><img src="./assets/icons/Icon=Sleep.svg" alt="go sleep" width="45" height="45"/></button><button id="playing" class="actionButton"><img src="./assets/icons/Icon=Fun.svg" alt="funBtn" width="45" height="45"/></button> `;
  };

  #displayRestart = () => {
    const actionsBar = document.querySelector(this.#actionsBar) as HTMLElement;
    if (!actionsBar) {
      throw new Error("element not found");
    }
    actionsBar.innerHTML = `<button class="restartButton" id="restart">RESTART</button>`;
  };
}
