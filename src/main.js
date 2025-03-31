class Timer extends EventTarget {
  constructor() {
    super();

    this.state = {
      running: false,
      minutes: 25,
      seconds: 0,
    };
  }

  start() {
    this.state.running = true;

    const countdown = setInterval(() => {
      const formattedMinutes = String(this.state.minutes).padStart(2, "0");
      const formattedSeconds = String(this.state.seconds).padStart(2, "0");

      if (this.state.seconds === 0) {
        if (this.state.minutes === 0) {
          clearInterval(countdown);
          return;
        }
        this.state.minutes--;
        this.state.seconds = 59;
      } else {
        this.state.seconds--;
      }
      this.timeLeft = `${formattedMinutes}:${formattedSeconds}`;
      this.dispatchEvent(new CustomEvent("tick", { detail: this.timeLeft }));
    }, 1000);
  }

  pause() {}

  reset() {}
}

class UIController {
  constructor(timer) {
    this.allTabs = document.querySelectorAll("[aria-selected]");
    this.timerLabel = document.querySelector(".timer");
    this.controlBtn = document.getElementById("control-button");
    this.timer = timer;
  }

  setupEventListners() {
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
      this.timer.addEventListener(
        "tick",
        (e) => (this.timerLabel.textContent = e.detail)
      );
    });
  }

  updateScreen() {}
}

class App {
  constructor() {}
  init() {
    const timer = new Timer();
    const controller = new UIController(timer);
    controller.updateScreen();
    controller.setupEventListners();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
});
