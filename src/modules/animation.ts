export class Animation {
  frames: string[];
  intervalTime: number;
  displayFunction: null | NodeJS.Timeout = null;
  #counter = 0;

  constructor(
    frames: string[],
    intervalTime: number,
    elementSelector: string,
    frameParameters: string,
  ) {
    this.frames = [...frames];
    this.intervalTime = intervalTime;
    if (!this.displayFunction) {
      const displayer = document.querySelector("#tamago") as HTMLDivElement;

      if (!displayer) {
        throw new Error("element not found");
      }

      this.displayFunction = setInterval(() => {
        console.log("Interwał działa!");
        displayer.innerHTML = `<img ${
          frames[this.#counter % 2]
        } ${frameParameters} />`;

        this.#counter < 10000 ? this.#counter++ : (this.#counter = 0);

    
      }, intervalTime);
    }
  }
  end(): void {

    if (this.displayFunction) {
      clearInterval(this.displayFunction);
      this.displayFunction = null;
      console.log("Interwał zatrzymany.");
    }
  }
}
