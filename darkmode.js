// Dark mode functionality for GhostMessage

class DarkModeManager {
  constructor() {
    this.toggleButton = document.getElementById("toggleDarkMode");
    this.isDarkMode = localStorage.getItem("darkMode") === "true";

    this.initializeDarkMode();
    this.initializeEventListeners();
  }

  initializeDarkMode() {
    if (this.isDarkMode) {
      document.documentElement.classList.add("dark");
      this.updateButtonText();
    }
  }

  initializeEventListeners() {
    this.toggleButton.addEventListener("click", () => this.toggleDarkMode());
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", this.isDarkMode);
    this.updateButtonText();
  }

  updateButtonText() {
    this.toggleButton.textContent = this.isDarkMode
      ? "Light Mode"
      : "Dark Mode";
  }
}

// Initialize the dark mode manager when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new DarkModeManager();
});
