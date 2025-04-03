// Main JavaScript file for GhostMessage

class GhostMessage {
  constructor() {
    this.initializeElements();
    this.initializeEventListeners();
    this.updateTime();
  }

  initializeElements() {
    // Chat elements
    this.chatArea = document.getElementById("chatArea");
    this.messageInput = document.querySelector(".message-input");
    this.inputPlaceholder = document.querySelector(".input-placeholder");
    this.sendButton = document.querySelector(".send-button");
    this.iphoneFrame = document.querySelector(".iphone-frame");

    // Parts settings
    this.hideHeaderToggle = document.getElementById("hideHeader");
    this.hideFooterToggle = document.getElementById("hideFooter");

    // Network settings
    this.networkTypeSelect = document.getElementById("networkType");
    this.dualSimToggle = document.getElementById("dualSim");
    this.carrierText = document.querySelector(".carrier-text");
    this.secondarySignal = document.querySelector(".secondary-signal");

    // Message settings
    this.senderInput = document.getElementById("senderInput");
    this.messageTextarea = document.getElementById("messageInput");

    // Status bar settings
    this.carrierInput = document.getElementById("carrierInput");

    // Export buttons
    this.exportPNGButton = document.querySelector(".export-button.png");

    // Other buttons
    this.clearChatButton = document.getElementById("clearChat");
    this.saveChatButton = document.getElementById("saveChat");

    // Camera and message elements
    this.cameraButton = document.querySelector(".input-button");
    this.imageInput = document.createElement("input");
    this.imageInput.type = "file";
    this.imageInput.accept = "image/*";
    this.imageInput.style.display = "none";
    document.body.appendChild(this.imageInput);

    // Add this to initializeElements()
    this.sendAsReceiverToggle = document.getElementById("sendAsReceiver");
    this.sendMessageButton = document.querySelector(".send-message-button");

    // Add these lines
    this.profilePicInput = document.getElementById("profilePicInput");
    this.profilePreview = document.getElementById("profilePreview");
    this.profileUploadButton = document.querySelector(".profile-upload-button");
    this.contactPhoto = document.querySelector(".contact-photo");
  }

  initializeEventListeners() {
    // Message input handling
    this.messageInput.addEventListener("click", () =>
      this.activateMessageInput()
    );
    this.sendButton.addEventListener("click", () => this.handleSendMessage());

    // Parts settings
    this.hideHeaderToggle.addEventListener("change", () => this.toggleHeader());
    this.hideFooterToggle.addEventListener("change", () => this.toggleFooter());

    // Network settings
    this.networkTypeSelect.addEventListener("change", () => {
      this.updateCarrier();
    });

    // Dual SIM toggle
    this.dualSimToggle.addEventListener("change", () => {
      this.updateDualSim();
    });

    // Message settings
    this.senderInput.addEventListener("input", () => this.updateSender());
    this.messageTextarea.addEventListener("input", () =>
      this.updateMessagePreview()
    );
    this.carrierInput.addEventListener("input", () => this.updateCarrier());

    // Export buttons
    this.exportPNGButton.addEventListener("click", () => this.exportAs("png"));

    // Other buttons
    this.clearChatButton.addEventListener("click", () => this.clearChat());
    this.saveChatButton.addEventListener("click", () => this.saveChat());

    // Handle Enter key
    document.addEventListener("keypress", (e) => {
      if (
        e.key === "Enter" &&
        !e.shiftKey &&
        document.activeElement === this.activeInput
      ) {
        e.preventDefault();
        this.handleSendMessage();
      }
    });

    // Camera button click
    this.cameraButton.addEventListener("click", () => {
      this.imageInput.click();
    });

    // Image selection
    this.imageInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        this.handleImageUpload(e.target.files[0]);
      }
    });

    // Add this new event listener
    this.sendMessageButton.addEventListener("click", () => {
      const text = this.messageTextarea.value.trim();
      if (text) {
        this.sendMessage(text);
        this.messageTextarea.value = ""; // Clear the input after sending
      }
    });

    // Also add keyboard shortcut for the textarea
    this.messageTextarea.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessageButton.click();
      }
    });

    // Add these lines
    this.profileUploadButton.addEventListener("click", () => {
      this.profilePicInput.click();
    });

    this.profilePicInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          // Update contact photo in chat
          const contactImg = document.createElement("img");
          contactImg.src = e.target.result;
          contactImg.style.width = "32px";
          contactImg.style.height = "32px";
          contactImg.style.borderRadius = "50%";
          contactImg.style.objectFit = "cover";
          this.contactPhoto.innerHTML = "";
          this.contactPhoto.appendChild(contactImg);
        };

        reader.readAsDataURL(file);
      }
    });
  }

  toggleHeader() {
    const statusBar = document.querySelector(".status-bar");
    const navBar = document.querySelector(".nav-bar");
    statusBar.style.display = this.hideHeaderToggle.checked ? "none" : "flex";
    navBar.style.display = this.hideHeaderToggle.checked ? "none" : "flex";
  }

  toggleFooter() {
    const homeIndicator = document.querySelector(".home-indicator");
    const messageInputArea = document.querySelector(".message-input-area");

    if (this.hideFooterToggle.checked) {
      homeIndicator.style.display = "none";
      messageInputArea.style.display = "none";
    } else {
      homeIndicator.style.display = "block";
      messageInputArea.style.display = "flex";
    }
  }

  updateCarrier() {
    const networkType = this.networkTypeSelect.value;
    this.carrierText.textContent = networkType;
  }

  updateDualSim() {
    if (this.dualSimToggle.checked) {
      this.secondarySignal.style.display = "inline-block";
    } else {
      this.secondarySignal.style.display = "none";
    }
  }

  updateTime() {
    // Use the manually entered time
    const timeValue = this.timeInput.value;
    this.updateTimeDisplay(timeValue);
  }

  updateTimeDisplay(time) {
    if (this.statusBarTime) {
      this.statusBarTime.value = time;
    }
  }

  updateBattery() {
    const level = this.batteryLevelInput.value;
    const showPercentage = this.showBatteryPercentToggle.checked;
    const batteryIcon = document.querySelector(".fa-battery-full");

    batteryIcon.className = "fas";
    if (level > 90) batteryIcon.classList.add("fa-battery-full");
    else if (level > 60) batteryIcon.classList.add("fa-battery-three-quarters");
    else if (level > 40) batteryIcon.classList.add("fa-battery-half");
    else if (level > 10) batteryIcon.classList.add("fa-battery-quarter");
    else batteryIcon.classList.add("fa-battery-empty");

    if (showPercentage) {
      batteryIcon.dataset.percentage = `${level}%`;
    } else {
      delete batteryIcon.dataset.percentage;
    }
  }

  updateSender() {
    document.querySelector(".contact-name").textContent =
      this.senderInput.value;
  }

  activateMessageInput() {
    this.inputPlaceholder.style.display = "none";
    if (!this.activeInput) {
      const input = document.createElement("textarea");
      input.className = "message-text-input";
      input.placeholder = "iMessage";
      this.messageInput.appendChild(input);
      this.activeInput = input;
      input.focus();

      input.addEventListener("input", () => {
        this.sendButton.classList.toggle(
          "active",
          input.value.trim().length > 0
        );
        this.adjustInputHeight(input);
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          this.deactivateMessageInput();
        }
      });
    }
  }

  adjustInputHeight(input) {
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
  }

  deactivateMessageInput() {
    if (this.activeInput) {
      this.activeInput.remove();
      this.activeInput = null;
      this.inputPlaceholder.style.display = "block";
      this.sendButton.classList.remove("active");
    }
  }

  handleSendMessage() {
    const text = this.activeInput ? this.activeInput.value.trim() : "";
    if (text) {
      this.sendMessage(text);
      this.deactivateMessageInput();
      this.activateMessageInput();
    }
  }

  sendMessage(text) {
    const container = document.createElement("div");
    // Use the toggle state to determine the message type
    container.className = `message-container ${
      this.sendAsReceiverToggle.checked ? "received" : "sent"
    }`;

    const message = document.createElement("div");
    message.className = "message";
    message.textContent = text;

    const time = document.createElement("span");
    time.className = "message-time";
    time.textContent = this.timeInput.value; // Use manual time instead of current time

    container.appendChild(message);
    container.appendChild(time);
    this.chatArea.appendChild(container);
    this.scrollToBottom();

    message.addEventListener("dblclick", () => this.editMessage(message));
  }

  editMessage(messageElement) {
    const originalText = messageElement.textContent;
    const input = document.createElement("textarea");
    input.value = originalText;
    input.className = "message-edit-input";
    messageElement.textContent = "";
    messageElement.appendChild(input);
    input.focus();

    const saveEdit = () => {
      messageElement.textContent = input.value || originalText;
    };

    input.addEventListener("blur", saveEdit);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        saveEdit();
      }
    });
  }

  scrollToBottom() {
    this.chatArea.scrollTop = this.chatArea.scrollHeight;
  }

  clearChat() {
    if (confirm("Are you sure you want to clear the chat?")) {
      while (this.chatArea.firstChild) {
        this.chatArea.removeChild(this.chatArea.firstChild);
      }
    }
  }

  saveChat() {
    const chatData = {
      messages: Array.from(
        this.chatArea.querySelectorAll(".message-container")
      ).map((container) => ({
        text: container.querySelector(".message").textContent,
        time: container.querySelector(".message-time").textContent,
        type: container.classList.contains("sent") ? "sent" : "received",
      })),
      settings: {
        sender: this.senderInput.value,
        time: this.timeInput.value,
        carrier: this.carrierInput.value,
        network: this.networkTypeSelect.value,
        batteryLevel: this.batteryLevelInput.value,
      },
    };

    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: "application/json",
    });
    this.downloadFile(blob, "ghost-message-chat.json");
  }

  async exportAs(format) {
    try {
      const frame = this.iphoneFrame;
      const canvas = await html2canvas(frame, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        useCORS: true,
      });

      const dataUrl = canvas.toDataURL("image/png");
      this.downloadFile(dataUrl, "ghost-message.png");
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    }
  }

  downloadFile(data, filename) {
    const link = document.createElement("a");
    if (typeof data === "string") {
      link.href = data;
    } else {
      link.href = URL.createObjectURL(data);
    }
    link.download = filename;
    link.click();
    if (typeof data !== "string") {
      URL.revokeObjectURL(link.href);
    }
  }

  handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const messageContainer = document.createElement("div");
      // Use the toggle state for images too
      messageContainer.className = `message-container ${
        this.sendAsReceiverToggle.checked ? "received" : "sent"
      }`;

      const message = document.createElement("div");
      message.className = "message";

      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.maxWidth = "200px";
      img.style.borderRadius = "12px";

      const time = document.createElement("span");
      time.className = "message-time";
      time.textContent = this.timeInput.value;

      message.appendChild(img);
      messageContainer.appendChild(message);
      messageContainer.appendChild(time);

      this.chatArea.appendChild(messageContainer);
      this.chatArea.scrollTop = this.chatArea.scrollHeight;
    };
    reader.readAsDataURL(file);
  }
}

// Initialize when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new GhostMessage();
});
