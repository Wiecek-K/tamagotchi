import { Abilities } from "./abilities";
export interface ITamagotchiDisplay {
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
  | "dead"
  | "";

export default class Tamagotchi extends Abilities {
  health: { value: number; importance: number };
  hunger: { value: number; importance: number };
  energy: { value: number; importance: number };
  fun: { value: number; importance: number };
  counter = 0;
  isInAction = false;
  lastState: TTamagoState = "";
  nextState: TTamagoState = "happy";

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

    tamago.classList.add("State_Happy");
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

    tamago.classList.add("State_Bored");
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

    tamago.classList.add("State_Hungry");
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

    tamago.classList.add("State_Sleepy");
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

    tamago.classList.add("State_Eating");
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

    tamago.classList.add("State_Sleeping");
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

    tamago.classList.add("State_Playing");
    stateBar.innerText = "PLAYING";
  };

  #displayStateDead = (elementSelector: string) => {
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

    tamago.classList.add("State_Dead");
    stateBar.innerText = "DEAD";
  };

  #removeDisplayingStates = (elementSelector: string) => {
    const displayElement = document.querySelector(
      elementSelector,
    ) as HTMLDivElement;

    const tamago = displayElement.querySelector("#tamago") as HTMLDivElement;
    tamago.classList.forEach((className) => {
      if (className.startsWith("State")) {
        tamago.classList.remove(className);
      }
    });
  };

  displayState = (elementSelector: string) => {
    if (this.nextState != this.lastState) {
      this.#removeDisplayingStates(elementSelector);

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

        case "dead":
          this.#displayStateDead(elementSelector);
          break;

        default:
          break;
      }
    }
  };

  setAction = (nextState: TTamagoState) => {
    if (this.lastState != nextState) {
      this.isInAction = true;
      this.nextState = nextState;
    } else {
      this.isInAction = false;
    }
  };

  checkState = () => {
    if (this.health.value <= 0) {
      this.nextState = "dead";
      this.isInAction = true;
      return;
    }

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
  }: ITamagotchiDisplay) => {
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
