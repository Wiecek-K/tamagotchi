import { Abilities } from "./abilities";
export interface ITamagotchiStatus {
  healthElement: string;
  hungerElement: string;
  energyElement: string;
  funElement: string;
  stateElement: string;
}

export type TTamagoState =
  | "happy"
  | "bored"
  | "hungry"
  | "sleepy"
  | "eating"
  | "playing"
  | "sleeping"
  | "";

export default class Tamagotchi extends Abilities {
  health: { value: number; importance: number };
  hunger: { value: number; importance: number };
  energy: { value: number; importance: number };
  fun: { value: number; importance: number };
  counter = 0;
  isInAction = false;
  lastState: TTamagoState = "";
  nextState: TTamagoState = "";

  constructor() {
    super();
    this.health = { value: 10, importance: 1 };
    this.energy = { value: 10, importance: 2 };
    this.hunger = { value: 10, importance: 3 };
    this.fun = { value: 10, importance: 4 };
    console.log("Tamagotchi initialized");
  }

  #displayHealth = (elementSelector: string) => {
    const displayElement = document.querySelector(
      elementSelector,
    ) as HTMLParagraphElement;

    if (!displayElement) {
      throw new Error("element not found");
    }
    displayElement.innerText = this.health.value + "";

    this.health.value === 10
      ? displayElement.classList.remove("notMax")
      : displayElement.classList.add("notMax");
  };

  #displayHunger = (elementSelector: string) => {
    const displayElement = document.querySelector(
      elementSelector,
    ) as HTMLParagraphElement;

    if (!displayElement) {
      throw new Error("element not found");
    }
    displayElement.innerText = this.hunger.value + "";

    this.hunger.value === 10
      ? displayElement.classList.remove("notMax")
      : displayElement.classList.add("notMax");
  };

  #displayEnergy = (elementSelector: string) => {
    const displayElement = document.querySelector(
      elementSelector,
    ) as HTMLParagraphElement;

    if (!displayElement) {
      throw new Error("element not found");
    }
    displayElement.innerText = this.energy.value + "";

    this.energy.value === 10
      ? displayElement.classList.remove("notMax")
      : displayElement.classList.add("notMax");
  };

  #displayFun = (elementSelector: string) => {
    const displayElement = document.querySelector(
      elementSelector,
    ) as HTMLParagraphElement;

    if (!displayElement) {
      throw new Error("element not found");
    }
    displayElement.innerText = this.fun.value + "";

    this.fun.value === 10
      ? displayElement.classList.remove("notMax")
      : displayElement.classList.add("notMax");
  };

  #displayStateHappy = (elementSelector: string) => {
    const displayElement = document.querySelector(
      elementSelector,
    ) as HTMLDivElement;

    const tamago = displayElement.querySelector("#tamago") as HTMLDivElement;
    const stateBar = displayElement.querySelector(
      "#stateBar",
    ) as HTMLDivElement;
    if (!tamago || !stateBar) {
      throw new Error("element not found");
    }

    tamago.innerHTML = ` <img src="assets/tamago/State=Standing.svg" alt="your tamago is Happy" width="152" height="130" />`;
    stateBar.innerText = "HAPPY";
  };

  #displayStateBored = (elementSelector: string) => {
    const displayElement = document.querySelector(
      elementSelector,
    ) as HTMLDivElement;

    const tamago = displayElement.querySelector("#tamago") as HTMLDivElement;
    const stateBar = displayElement.querySelector(
      "#stateBar",
    ) as HTMLDivElement;
    if (!tamago || !stateBar) {
      throw new Error("element not found");
    }

    tamago.innerHTML = ` <img src="assets/tamago/State=Bored.svg" alt="your tamago is Bored" width="152" height="130" />`;
    stateBar.innerText = "BORED";
  };

  #displayStateHungry = (elementSelector: string) => {
    const displayElement = document.querySelector(
      elementSelector,
    ) as HTMLDivElement;

    const tamago = displayElement.querySelector("#tamago") as HTMLDivElement;
    const stateBar = displayElement.querySelector(
      "#stateBar",
    ) as HTMLDivElement;
    if (!tamago || !stateBar) {
      throw new Error("element not found");
    }

    tamago.innerHTML = ` <img src="assets/tamago/State=Hungry.svg" alt="your tamago is Hungry" width="152" height="130" />`;
    stateBar.innerText = "HUNGRY";
  };

  #displayStateSleepy = (elementSelector: string) => {
    const displayElement = document.querySelector(
      elementSelector,
    ) as HTMLDivElement;

    const tamago = displayElement.querySelector("#tamago") as HTMLDivElement;
    const stateBar = displayElement.querySelector(
      "#stateBar",
    ) as HTMLDivElement;
    if (!tamago || !stateBar) {
      throw new Error("element not found");
    }

    tamago.innerHTML = ` <img src="assets/tamago/State=Sleepy.svg" alt="your tamago is Sleepy" width="152" height="130" />`;
    stateBar.innerText = "SLEPPY";
  };

  #displayStateEating = (elementSelector: string) => {
    const displayElement = document.querySelector(
      elementSelector,
    ) as HTMLDivElement;

    const tamago = displayElement.querySelector("#tamago") as HTMLDivElement;
    const stateBar = displayElement.querySelector(
      "#stateBar",
    ) as HTMLDivElement;
    if (!tamago || !stateBar) {
      throw new Error("element not found");
    }

    tamago.innerHTML = `<img src="assets/tamago/State=Eating 1.svg" alt="your tamago eating" width="152" height="130" />`;
    stateBar.innerText = "EATING";
  };

  #displayStateSleeping = (elementSelector: string) => {
    const displayElement = document.querySelector(
      elementSelector,
    ) as HTMLDivElement;

    const tamago = displayElement.querySelector("#tamago") as HTMLDivElement;
    const stateBar = displayElement.querySelector(
      "#stateBar",
    ) as HTMLDivElement;
    if (!tamago || !stateBar) {
      throw new Error("element not found");
    }

    tamago.innerHTML = `<img src="assets/tamago/State=Sleeping 1.svg" alt="your tamago sleeping" width="152" height="130" />`;
    stateBar.innerText = "SLEEPING";
  };

  #displayStatePlaying = (elementSelector: string) => {
    const displayElement = document.querySelector(
      elementSelector,
    ) as HTMLDivElement;

    const tamago = displayElement.querySelector("#tamago") as HTMLDivElement;
    const stateBar = displayElement.querySelector(
      "#stateBar",
    ) as HTMLDivElement;
    if (!tamago || !stateBar) {
      throw new Error("element not found");
    }

    tamago.innerHTML = `<img src="assets/tamago/State=Playing 1.svg" alt="your tamago playing" width="152" height="130" />`;
    stateBar.innerText = "PLAYING";
  };

  displayState = (elementSelector: string) => {
    if (this.nextState != this.lastState) {
      //clear animation interval
      switch (this.nextState) {
        case "bored":
          this.#displayStateBored(elementSelector);
          break;

        case "hungry":
          this.#displayStateHungry(elementSelector);
          break;

        case "happy":
          this.#displayStateHappy(elementSelector);
          break;

        case "sleepy":
          this.#displayStateSleepy(elementSelector);
          break;

        case "eating":
          this.#displayStateEating(elementSelector);
          break;

        case "playing":
          this.#displayStatePlaying(elementSelector);
          break;

        case "sleeping":
          this.#displayStateSleeping(elementSelector);
          break;

        default:
          break;
      }
    }
  };

  checkState = () => {
    if (!this.isInAction) {
      if (
        this.health.value >= 7 &&
        this.energy.value >= 7 &&
        this.fun.value >= 7 &&
        this.hunger.value >= 7
      ) {
        this.nextState = "happy";
        return;
      }
      if (this.energy.value <= 6) {
        this.nextState = "sleepy";
        return;
      }
      if (this.hunger.value <= 6) {
        this.nextState = "hungry";
        return;
      }
      if (this.fun.value <= 6) {
        this.nextState = "bored";
        return;
      }
    }
  };

  mount = ({
    healthElement,
    hungerElement,
    energyElement,
    funElement,
    stateElement,
  }: ITamagotchiStatus) => {
    this.#displayHealth(healthElement);
    this.#displayEnergy(energyElement);
    this.#displayHunger(hungerElement);
    this.#displayFun(funElement);
    this.displayState(stateElement);
    this.lastState = this.nextState;
  };

  decraseLifeParams = () => {
    if (this.hunger.value <= 0 || this.energy.value <= 0) {
      this.health.value--;
    }

    if (this.counter % 2) {
      this.energy.value--;
      if (this.fun.value <= 0) {
        this.energy.value--;
      }
    }

    this.hunger.value--;
    this.fun.value--;

    if (this.energy.value > 10) {
      this.energy.value = 10;
    }
    if (this.hunger.value > 10) {
      this.hunger.value = 10;
    }
    if (this.fun.value > 10) {
      this.fun.value = 10;
    }
  };

  incraseLifeParams = () => {
    if (this.lastState === "eating") {
      this.hunger.value += 2;
    }

    if (this.lastState === "sleeping") {
      this.energy.value += 2;
    }

    if (this.lastState === "playing") {
      this.fun.value += 2;
      this.energy.value--;
    }
  };

  checkMaxLifeParams = () => {
    if (this.energy.value > 10) {
      this.energy.value = 10;
    }
    if (this.hunger.value > 10) {
      this.hunger.value = 10;
    }
    if (this.fun.value > 10) {
      this.fun.value = 10;
    }
  };
}
