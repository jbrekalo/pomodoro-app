class Timer {
  constructor() {
    this.pomodoro = 25;
    this.shortBreak = 5;
    this.longBreak = 15;
    this.timerLabel = document.querySelector(".timer");
  }

  counter() {
    let minutes = this.pomodoro;
    let seconds = 0;
    this.timerLabel.textContent = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    const countdown = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
          return;
        }
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }

      this.pomodoro = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
      this.timerLabel.textContent = `${this.pomodoro}`;
    }, 1000);
  }
}

class UIController {
  constructor(timer) {
    this.allTabs = document.querySelectorAll("[aria-selected]");
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
      console.log("Click!");
      this.timer.counter();
    });
  }

  updateScreen() {
    console.log(this.timer.pomodoro);
  }
}

class App {
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
