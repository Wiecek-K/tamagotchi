export default class Tamagotchi {
  constructor() {
    this.counter = 0;
    this.isInAction = false;
    this.lastState = "";
    this.nextState = "happy";
    this.#displayHealth = (elementSelector) => {
      const displayElement = document.querySelector(elementSelector);
      if (!displayElement) {
        throw new Error("element not found");
      }
      displayElement.innerText = this.health.value + "";
      this.health.value === 10 ? displayElement.classList.remove("notMax") : displayElement.classList.add("notMax");
    };
    this.#displayHunger = (elementSelector) => {
      const displayElement = document.querySelector(elementSelector);
      if (!displayElement) {
        throw new Error("element not found");
      }
      displayElement.innerText = this.hunger.value + "";
      this.hunger.value === 10 ? displayElement.classList.remove("notMax") : displayElement.classList.add("notMax");
    };
    this.#displayEnergy = (elementSelector) => {
      const displayElement = document.querySelector(elementSelector);
      if (!displayElement) {
        throw new Error("element not found");
      }
      displayElement.innerText = this.energy.value + "";
      this.energy.value === 10 ? displayElement.classList.remove("notMax") : displayElement.classList.add("notMax");
    };
    this.#displayFun = (elementSelector) => {
      const displayElement = document.querySelector(elementSelector);
      if (!displayElement) {
        throw new Error("element not found");
      }
      displayElement.innerText = this.fun.value + "";
      this.fun.value === 10 ? displayElement.classList.remove("notMax") : displayElement.classList.add("notMax");
    };
    this.#displayStateHappy = (elementSelector) => {
      const displayElement = document.querySelector(elementSelector);
      const tamago = displayElement.querySelector("#tamago");
      const stateBar = displayElement.querySelector("#stateBar");
      if (!tamago || !stateBar) {
        throw new Error("element not found");
      }
      tamago.classList.add("State_Happy");
      stateBar.innerText = "HAPPY";
    };
    this.#displayStateBored = (elementSelector) => {
      const displayElement = document.querySelector(elementSelector);
      const tamago = displayElement.querySelector("#tamago");
      const stateBar = displayElement.querySelector("#stateBar");
      if (!tamago || !stateBar) {
        throw new Error("element not found");
      }
      tamago.classList.add("State_Bored");
      stateBar.innerText = "BORED";
    };
    this.#displayStateHungry = (elementSelector) => {
      const displayElement = document.querySelector(elementSelector);
      const tamago = displayElement.querySelector("#tamago");
      const stateBar = displayElement.querySelector("#stateBar");
      if (!tamago || !stateBar) {
        throw new Error("element not found");
      }
      tamago.classList.add("State_Hungry");
      stateBar.innerText = "HUNGRY";
    };
    this.#displayStateSleepy = (elementSelector) => {
      const displayElement = document.querySelector(elementSelector);
      const tamago = displayElement.querySelector("#tamago");
      const stateBar = displayElement.querySelector("#stateBar");
      if (!tamago || !stateBar) {
        throw new Error("element not found");
      }
      tamago.classList.add("State_Sleepy");
      stateBar.innerText = "SLEPPY";
    };
    this.#displayStateEating = (elementSelector) => {
      const displayElement = document.querySelector(elementSelector);
      const tamago = displayElement.querySelector("#tamago");
      const stateBar = displayElement.querySelector("#stateBar");
      if (!tamago || !stateBar) {
        throw new Error("element not found");
      }
      tamago.classList.add("State_Eating");
      stateBar.innerText = "EATING";
    };
    this.#displayStateSleeping = (elementSelector) => {
      const displayElement = document.querySelector(elementSelector);
      const tamago = displayElement.querySelector("#tamago");
      const stateBar = displayElement.querySelector("#stateBar");
      if (!tamago || !stateBar) {
        throw new Error("element not found");
      }
      tamago.classList.add("State_Sleeping");
      stateBar.innerText = "SLEEPING";
    };
    this.#displayStatePlaying = (elementSelector) => {
      const displayElement = document.querySelector(elementSelector);
      const tamago = displayElement.querySelector("#tamago");
      const stateBar = displayElement.querySelector("#stateBar");
      if (!tamago || !stateBar) {
        throw new Error("element not found");
      }
      tamago.classList.add("State_Playing");
      stateBar.innerText = "PLAYING";
    };
    this.#displayStateDead = (elementSelector) => {
      const displayElement = document.querySelector(elementSelector);
      const tamago = displayElement.querySelector("#tamago");
      const stateBar = displayElement.querySelector("#stateBar");
      if (!tamago || !stateBar) {
        throw new Error("element not found");
      }
      tamago.classList.add("State_Dead");
      stateBar.innerText = "DEAD";
    };
    this.#removeDisplayingStates = (elementSelector) => {
      const displayElement = document.querySelector(elementSelector);
      const tamago = displayElement.querySelector("#tamago");
      tamago.classList.forEach((className) => {
        if (className.startsWith("State")) {
          tamago.classList.remove(className);
        }
      });
    };
    this.displayState = (elementSelector) => {
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
    this.setAction = (nextState) => {
      if (this.lastState != nextState) {
        this.isInAction = true;
        this.nextState = nextState;
      } else {
        this.isInAction = false;
      }
    };
    this.checkState = () => {
      if (this.health.value <= 0) {
        this.nextState = "dead";
        this.isInAction = true;
        return;
      }
      if (!this.isInAction) {
        if (this.health.value >= 7 && this.energy.value >= 7 && this.fun.value >= 7 && this.hunger.value >= 7) {
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
    this.mount = ({
      healthElement,
      hungerElement,
      energyElement,
      funElement,
      stateElement
    }) => {
      this.#displayHealth(healthElement);
      this.#displayEnergy(energyElement);
      this.#displayHunger(hungerElement);
      this.#displayFun(funElement);
      this.displayState(stateElement);
      this.lastState = this.nextState;
    };
    this.decraseLifeParams = () => {
      if (this.hunger.value <= 0 || this.energy.value <= 0) {
        this.health.value > 0 ? this.health.value-- : this.health.value = 0;
      }
      if (this.counter % 2) {
        this.fun.value <= 0 ? this.energy.value-- : null;
        this.energy.value--;
      }
      this.hunger.value--;
      this.fun.value--;
    };
    this.incraseLifeParams = () => {
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
    this.checkMaxLifeParams = () => {
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
    this.checkMinLifeParams = () => {
      if (this.energy.value < 0) {
        this.energy.value = 0;
      }
      if (this.hunger.value < 0) {
        this.hunger.value = 0;
      }
      if (this.fun.value < 0) {
        this.fun.value = 0;
      }
    };
    this.health = {value: 10, importance: 1};
    this.energy = {value: 10, importance: 2};
    this.hunger = {value: 10, importance: 3};
    this.fun = {value: 10, importance: 4};
    console.log("Tamagotchi initialized");
  }
  #displayHealth;
  #displayHunger;
  #displayEnergy;
  #displayFun;
  #displayStateHappy;
  #displayStateBored;
  #displayStateHungry;
  #displayStateSleepy;
  #displayStateEating;
  #displayStateSleeping;
  #displayStatePlaying;
  #displayStateDead;
  #removeDisplayingStates;
}
