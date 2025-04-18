class Timer {
  constructor(onTick) {
    this.initialTime = {
      minutes: 25,
      seconds: 0,
    };
    this.state = {
      running: false,
      minutes: this.initialTime.minutes,
      seconds: this.initialTime.seconds,
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

      this.onTick(
        this.initialTime.minutes,
        this.initialTime.seconds,
        this.state.minutes,
        this.state.seconds
      );
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
    this.timerCircle = document.getElementById("timer-circle");
    this.controlBtn = document.getElementById("control-button");

    this.timer = new Timer(
      (initialMinutes, initialSeconds, minutes, seconds) => {
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(seconds).padStart(2, "0");
        this.timerLabel.textContent = `${formattedMinutes}:${formattedSeconds}`;
        this.updateCircle(initialMinutes, initialSeconds, minutes, seconds);
      }
    );
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

  updateCircle(initialMinutes, initialSeconds, minutes, seconds) {
    const initialTime = initialMinutes * 60 + initialSeconds;
    let secondsLeft = minutes * 60 + seconds;
    this.timerCircle.setAttribute(
      "stroke-dasharray",
      `${(767 / initialTime) * secondsLeft} 1000`
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
