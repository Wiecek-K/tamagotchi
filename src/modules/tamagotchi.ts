export default class Tamagotchi {
  health: { value: number; importance: number };
  hunger: { value: number; importance: number };
  energy: { value: number; importance: number };
  fun: { value: number; importance: number };

  constructor() {
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
    displayElement.innerText = this.energy.value + "";
  };

  mount = ({ healthElement, hungerElement, energyElement, funElement }) => {
    this.displayHealth(healthElement);
  };
}
