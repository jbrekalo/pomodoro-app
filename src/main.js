class Timer {
  constructor(onTick) {
    this.state = {
      running: false,
      elapsed: null,
      remainingTime: null,
    };
    this.initialTime = { minutes: 25, seconds: 0 };
    this.duration = this.calculateDuration(this.initialTime);
    this.startTime = null;
    this.timeout = null;
    this.onTick = onTick;
  }

  calculateDuration({ minutes, seconds }) {
    return (Number(minutes) * 60 + Number(seconds)) * 1000;
  }

  formatTime() {
    let totalSeconds = Math.floor(this.state.remainingTime / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }

  tick() {
    const elapsed = Date.now() - this.startTime;
    this.state.remainingTime = this.duration - elapsed;

    if (this.state.remainingTime <= 0) {
      this.state.running = false;
    }
    this.onTick(this.formatTime(), this.state.remainingTime, this.duration);

    const delay = 1000 - (elapsed % 1000);
    this.timeout = setTimeout(() => {
      this.tick();
    }, delay);
  }

  start() {
    if (this.state.running) return;

    this.startTime = Date.now();

    this.state.running = true;
    this.tick();
  }

  pause() {
    clearTimeout(this.timeout);
    this.state.running = false;
  }

  reset() {
    clearTimeout(this.timeout);
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
    this.timerCircle = document.getElementById("timer-circle");
    this.controlBtn = document.getElementById("control-button");

    this.timer = new Timer((timerStr, remainingTime, initialDuration) => {
      this.timerLabel.textContent = timerStr;
      this.updateCircle(remainingTime, initialDuration);
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
      if (this.timer.state.running) {
        this.timer.pause();
        this.controlBtn.textContent = "START";
      } else {
        this.timer.start();
        this.controlBtn.textContent = "PAUSE";
      }
    });
  }

  initTime() {
    this.timerLabel.textContent = "25:00";
  }

  updateCircle(remainingTime, initialDuration) {
    this.timerCircle.setAttribute(
      "stroke-dasharray",
      `${(767 / initialDuration) * remainingTime} 1000`
    );
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
