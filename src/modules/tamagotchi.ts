import { Abilities } from "./abilities";
export interface ITamagotchiStatus {
  healthElement: string;
  hungerElement: string;
  energyElement: string;
  funElement: string;
  stateElement: string;
}

type Tstate = "Happy" | "Bored" | "Hungry" | "Sleepy" | "";

export default class Tamagotchi extends Abilities {
  health: { value: number; importance: number };
  hunger: { value: number; importance: number };
  energy: { value: number; importance: number };
  fun: { value: number; importance: number };
  counter = 0;
  isInAction = false;
  lastState: Tstate = "";
  nextState: Tstate = "";

  constructor() {
    super();
    this.health = { value: 10, importance: 1 };
    this.energy = { value: 10, importance: 2 };
    this.hunger = { value: 10, importance: 3 };
    this.fun = { value: 10, importance: 4 };
    console.log("Tamagotchi initialized");
  }

  displayHealth = (elementSelector: string) => {
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

  displayHunger = (elementSelector: string) => {
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

  displayEnergy = (elementSelector: string) => {
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

  displayFun = (elementSelector: string) => {
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

  displayStateHappy = (elementSelector: string) => {
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
    stateBar.innerText = "Happy";
  };

  displayStateBored = (elementSelector: string) => {
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
    stateBar.innerText = "Bored";
  };

  displayStateHungry = (elementSelector: string) => {
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
    stateBar.innerText = "Hungry";
  };

  displayStateSleepy = (elementSelector: string) => {
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
    stateBar.innerText = "Sleepy";
  };

  displayState = (elementSelector: string) => {
    if (this.nextState != this.lastState) {
      switch (this.nextState) {
        case "Bored":
          this.displayStateBored(elementSelector);
          break;

        case "Hungry":
          this.displayStateHungry(elementSelector);
          break;

        case "Happy":
          this.displayStateHappy(elementSelector);
          break;

        case "Sleepy":
          this.displayStateSleepy(elementSelector);
          break;

        default:
          break;
      }
    }
  };

  checkState = () => {
    if (
      this.health.value >= 7 &&
      this.energy.value >= 7 &&
      this.fun.value >= 7 &&
      this.hunger.value >= 7
    ) {
      this.nextState = "Happy";
      return;
    }
    if (this.energy.value <= 6) {
      this.nextState = "Sleepy";
      return;
    }
    if (this.hunger.value <= 6) {
      this.nextState = "Hungry";
      return;
    }
    if (this.fun.value <= 6) {
      this.nextState = "Bored";
      return;
    }
  };

  mount = ({
    healthElement,
    hungerElement,
    energyElement,
    funElement,
    stateElement,
  }: ITamagotchiStatus) => {
    this.displayHealth(healthElement);
    this.displayEnergy(energyElement);
    this.displayHunger(hungerElement);
    this.displayFun(funElement);
    this.displayState(stateElement);
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
    this.displayStateBored(".gameDisplay");
    this.hunger.value--;
    this.fun.value--;
  };

  // incraseLifeParams=()=>{}
}
