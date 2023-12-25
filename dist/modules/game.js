import Tamagotchi from "./tamagotchi.js";
export default class Game {
  constructor({
    healthElement,
    hungerElement,
    energyElement,
    funElement,
    stateElement,
    actionsBar
  }) {
    this.counter = 0;
    this.#gameUpdateInterval = null;
    this.#actionsHandler = (e) => {
      const clickedElement = e.target;
      const actionButton = clickedElement.closest("button");
      if (actionButton?.id === "eating" || actionButton?.id === "playing" || actionButton?.id === "sleeping") {
        this.tamagotchi.setAction(actionButton.id);
      }
    };
    this.#startHandler = () => {
      this.start();
      document.removeEventListener("click", this.#startHandler);
    };
    this.#restartHandler = () => {
      const actionsBar = document.querySelector(this.#actionsBar);
      this.tamagotchi = new Tamagotchi();
      actionsBar?.removeEventListener("click", this.#restartHandler);
      this.init();
    };
    this.init = () => {
      this.#displayActionsBar();
      this.tamagotchi.mount({
        healthElement: this.#healthElement,
        hungerElement: this.#hungerElement,
        energyElement: this.#energyElement,
        funElement: this.#funElement,
        stateElement: this.#stateElement
      });
      setTimeout(() => {
        document.addEventListener("click", this.#startHandler);
        null;
      }, 10);
    };
    this.start = () => {
      if (!this.#gameUpdateInterval) {
        this.#gameUpdateInterval = setInterval(() => {
          if (!(this.counter % 5)) {
            this.tamagotchi.incraseLifeParams();
            this.tamagotchi.decraseLifeParams();
            this.tamagotchi.checkMaxLifeParams();
            if (this.counter >= 1e4) {
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
            stateElement: this.#stateElement
          });
          if (this.tamagotchi.lastState === "dead") {
            this.end();
          }
          this.counter++;
        }, 200);
      }
    };
    this.end = () => {
      if (this.#gameUpdateInterval) {
        clearInterval(this.#gameUpdateInterval);
        this.#gameUpdateInterval = null;
      }
      this.#displayRestart();
      console.log("Twój tamago umarł");
      console.log("NA ŚMIERĆ");
      console.log(`Twój wynik to ${this.tamagotchi.counter}`);
    };
    this.#displayActionsBar = () => {
      const actionsBar = document.querySelector(this.#actionsBar);
      if (!actionsBar) {
        throw new Error("element not found");
      }
      actionsBar.addEventListener("click", this.#actionsHandler);
      actionsBar.innerHTML = `<button id="eating" class="actionButton"><img src="./assets/icons/Icon=Hunger.svg" alt="let's eat" width="45" height="45"/></button><button id="sleeping" class="actionButton"><img src="./assets/icons/Icon=Sleep.svg" alt="go sleep" width="45" height="45"/></button><button id="playing" class="actionButton"><img src="./assets/icons/Icon=Fun.svg" alt="funBtn" width="45" height="45"/></button> `;
    };
    this.#displayRestart = () => {
      const actionsBar = document.querySelector(this.#actionsBar);
      if (!actionsBar) {
        throw new Error("element not found");
      }
      actionsBar.innerHTML = `<button class="restartButton" id="restart">RESTART</button>`;
      actionsBar.removeEventListener("click", this.#actionsHandler);
      actionsBar.addEventListener("click", this.#restartHandler);
    };
    this.tamagotchi = new Tamagotchi();
    this.#healthElement = healthElement;
    this.#hungerElement = hungerElement;
    this.#energyElement = energyElement;
    this.#funElement = funElement;
    this.#stateElement = stateElement;
    this.#actionsBar = actionsBar;
  }
  #gameUpdateInterval;
  #healthElement;
  #hungerElement;
  #energyElement;
  #funElement;
  #stateElement;
  #actionsBar;
  #actionsHandler;
  #startHandler;
  #restartHandler;
  #displayActionsBar;
  #displayRestart;
}
