class Timer {
  constructor(onTick) {
    this.state = {
      running: false,
      minutes: 25,
      seconds: 0,
    };
    this.onTick = onTick;
    this.interval = null;
  }

  start() {
    if (this.state.running) return;

    this.state.running = true;

    this.interval = setInterval(() => {
      if (this.state.seconds === 0) {
        if (this.state.minutes === 0) {
          clearInterval(this.interval);
          this.state.running = false;
          return;
        }
        this.state.minutes--;
        this.state.seconds = 59;
      } else {
        this.state.seconds--;
      }

      const formattedMinutes = String(this.state.minutes).padStart(2, "0");
      const formattedSeconds = String(this.state.seconds).padStart(2, "0");

      this.onTick(`${formattedMinutes}:${formattedSeconds}`);
    }, 1000);
  }

  pause() {
    clearInterval(this.interval);
    this.state.running = false;
  }

  reset() {
    clearInterval(this.interval);
    this.state = {
      running: false,
      minutes: 25,
      seconds: 0,
    };
    this.onTick("25:00");
  }
}

class UIController {
  constructor() {
    this.allTabs = document.querySelectorAll("[aria-selected]");
    this.timerLabel = document.querySelector(".timer");
    this.controlBtn = document.getElementById("control-button");

    this.timer = new Timer((timeStr) => {
      this.timerLabel.textContent = timeStr;
    });
  }

  setupEventListeners() {
    this.allTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        this.allTabs.forEach((tab) =>
          tab.setAttribute("aria-selected", "false")
        );
        tab.setAttribute("aria-selected", "true");
      });
    });

    this.controlBtn.addEventListener("click", () => {
      this.timer.start();
    });
  }

  initTime() {
    this.timerLabel.textContent = "25:00";
  }
}

class App {
  init() {
    const controller = new UIController();
    controller.initTime();
    controller.setupEventListeners();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
});
