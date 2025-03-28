class Timer {}

class UIController {
  constructor() {
    this.allTabs = document.querySelectorAll("[aria-selected]");
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
  }

  updateScreen() {}
}

class App {}

document.addEventListener("DOMContentLoaded", () => {
  const app = new UIController();
  app.setupEventListners();
  console.log(app);
});
