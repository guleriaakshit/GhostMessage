// Settings functionality for GhostMessage

class SettingsManager {
  constructor() {
    this.timeElement = document.getElementById("time");
    this.wifiElement = document.getElementById("wifi");
    this.batteryElement = document.getElementById("battery");
    this.carrierElement = document.getElementById("carrier");

    this.statusTime = document.getElementById("statusTime");
    this.carrierName = document.getElementById("carrierName");

    this.initializeSettings();
    this.initializeEventListeners();
  }

  initializeSettings() {
    // Load saved settings from localStorage
    const settings = JSON.parse(
      localStorage.getItem("ghostMessageSettings") || "{}"
    );

    // Apply saved settings
    if (settings.time) {
      this.timeElement.textContent = settings.time;
      this.statusTime.value = settings.time;
    }

    if (settings.carrier) {
      this.carrierElement.textContent = settings.carrier;
      this.carrierName.value = settings.carrier;
    }

    if (settings.battery) {
      this.updateBattery(settings.battery);
    }

    if (settings.wifi) {
      this.updateWifi(settings.wifi);
    }
  }

  initializeEventListeners() {
    // Time input handler
    this.statusTime.addEventListener("input", (e) => {
      const time = e.target.value;
      this.timeElement.textContent = time;
      this.saveSettings();
    });

    // Carrier name input handler
    this.carrierName.addEventListener("input", (e) => {
      const carrier = e.target.value;
      this.carrierElement.textContent = carrier;
      this.saveSettings();
    });

    // Battery level handler
    this.batteryElement.addEventListener("click", () => {
      const currentLevel = parseInt(this.batteryElement.textContent) || 100;
      const newLevel = (currentLevel - 25 + 100) % 100;
      this.updateBattery(newLevel);
      this.saveSettings();
    });

    // WiFi signal handler
    this.wifiElement.addEventListener("click", () => {
      const currentSignal = this.wifiElement.textContent;
      const signals = ["📶", "📶📶", "📶📶📶", "📶📶📶📶"];
      const currentIndex = signals.indexOf(currentSignal);
      const newIndex = (currentIndex + 1) % signals.length;
      this.updateWifi(signals[newIndex]);
      this.saveSettings();
    });
  }

  updateBattery(level) {
    this.batteryElement.textContent = level;
  }

  updateWifi(signal) {
    this.wifiElement.textContent = signal;
  }

  saveSettings() {
    const settings = {
      time: this.timeElement.textContent,
      carrier: this.carrierElement.textContent,
      battery: parseInt(this.batteryElement.textContent),
      wifi: this.wifiElement.textContent,
    };
    localStorage.setItem("ghostMessageSettings", JSON.stringify(settings));
  }
}

// Initialize the settings manager when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new SettingsManager();
});
