import { Abilities } from "./abilities";
export interface ITamagotchiStatus {
  healthElement: string;
  hungerElement: string;
  energyElement: string;
  funElement: string;
}
export default class Tamagotchi extends Abilities {
  health: { value: number; importance: number };
  hunger: { value: number; importance: number };
  energy: { value: number; importance: number };
  fun: { value: number; importance: number };
  flag = false;

  constructor() {
    super();
    this.health = { value: 10, importance: 1 };
    this.hunger = { value: 10, importance: 3 };
    this.energy = { value: 10, importance: 2 };
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

  mount = ({
    healthElement,
    hungerElement,
    energyElement,
    funElement,
  }: ITamagotchiStatus) => {
    this.displayHealth(healthElement);
    this.displayEnergy(energyElement);
    this.displayHunger(hungerElement);
    this.displayFun(funElement);
  };

  decraseLifeParams = () => {
    if (this.hunger.value <= 0 || this.energy.value <= 0) {
      this.health.value--;
    }

    if (this.flag) {
      this.energy.value--;
      if (this.fun.value <= 0) {
        this.energy.value--;
      }
    }
    this.flag = !this.flag;

    this.hunger.value--;
    this.fun.value--;
  };
}
