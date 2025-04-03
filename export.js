// Export functionality for GhostMessage

class ExportManager {
  constructor() {
    this.iphoneFrame = document.getElementById("iphoneFrame");
    this.initializeExportButtons();
  }

  initializeExportButtons() {
    document
      .getElementById("exportPNG")
      .addEventListener("click", () => this.exportAsPNG());
  }

  async exportAsPNG() {
    try {
      // Temporarily adjust styles for capture
      const originalStyles = this.iphoneFrame.style.cssText;
      this.iphoneFrame.style.position = "absolute";
      this.iphoneFrame.style.left = "0";
      this.iphoneFrame.style.top = "0";
      this.iphoneFrame.style.transform = "none";
      this.iphoneFrame.style.width = "375px";
      this.iphoneFrame.style.height = "812px";

      const canvas = await html2canvas(this.iphoneFrame, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#000000",
        logging: false,
        foreignObjectRendering: true,
        allowTaint: true,
        onclone: (clonedDoc) => {
          const clonedFrame = clonedDoc.getElementById("iphoneFrame");
          if (clonedFrame) {
            clonedFrame.style.position = "absolute";
            clonedFrame.style.left = "0";
            clonedFrame.style.top = "0";
            clonedFrame.style.transform = "none";
            clonedFrame.style.width = "375px";
            clonedFrame.style.height = "812px";
          }
        },
      });

      // Restore original styles
      this.iphoneFrame.style.cssText = originalStyles;

      const link = document.createElement("a");
      link.download = "ghost-message.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error exporting as PNG:", error);
      alert("Failed to export as PNG. Please try again.");
    }
  }

  async exportAsPDF() {
    try {
      // Temporarily adjust styles for capture
      const originalStyles = this.iphoneFrame.style.cssText;
      this.iphoneFrame.style.position = "absolute";
      this.iphoneFrame.style.left = "0";
      this.iphoneFrame.style.top = "0";
      this.iphoneFrame.style.transform = "none";
      this.iphoneFrame.style.width = "375px";
      this.iphoneFrame.style.height = "812px";

      const canvas = await html2canvas(this.iphoneFrame, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#000000",
        logging: false,
        foreignObjectRendering: true,
        allowTaint: true,
        onclone: (clonedDoc) => {
          const clonedFrame = clonedDoc.getElementById("iphoneFrame");
          if (clonedFrame) {
            clonedFrame.style.position = "absolute";
            clonedFrame.style.left = "0";
            clonedFrame.style.top = "0";
            clonedFrame.style.transform = "none";
            clonedFrame.style.width = "375px";
            clonedFrame.style.height = "812px";
          }
        },
      });

      // Restore original styles
      this.iphoneFrame.style.cssText = originalStyles;

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("ghost-message.pdf");
    } catch (error) {
      console.error("Error exporting as PDF:", error);
      alert("Failed to export as PDF. Please try again.");
    }
  }

  async exportAsSVG() {
    try {
      // Create a new SVG element
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "375");
      svg.setAttribute("height", "812");
      svg.setAttribute("viewBox", "0 0 375 812");

      // Create a foreignObject to embed the iPhone frame
      const foreignObject = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
      );
      foreignObject.setAttribute("width", "100%");
      foreignObject.setAttribute("height", "100%");

      // Clone the iPhone frame
      const content = this.iphoneFrame.cloneNode(true);
      content.style.position = "absolute";
      content.style.left = "0";
      content.style.top = "0";
      content.style.width = "375px";
      content.style.height = "812px";
      content.style.transform = "none";

      // Add the content to the foreignObject
      foreignObject.appendChild(content);
      svg.appendChild(foreignObject);

      // Create a blob and download
      const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ghost-message.svg";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting as SVG:", error);
      alert("Failed to export as SVG. Please try again.");
    }
  }

  async exportAsMP4() {
    try {
      // Create a canvas for animation
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 375;
      canvas.height = 812;

      // Get all messages
      const messages = Array.from(
        this.iphoneFrame.querySelectorAll(".message")
      );

      // Create a MediaRecorder
      const stream = canvas.captureStream(30); // 30 FPS
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9",
      });

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "ghost-message.webm";
        link.click();
        URL.revokeObjectURL(url);
      };

      // Start recording
      mediaRecorder.start();

      // Temporarily adjust styles for capture
      const originalStyles = this.iphoneFrame.style.cssText;
      this.iphoneFrame.style.position = "absolute";
      this.iphoneFrame.style.left = "0";
      this.iphoneFrame.style.top = "0";
      this.iphoneFrame.style.transform = "none";
      this.iphoneFrame.style.width = "375px";
      this.iphoneFrame.style.height = "812px";

      // Animate messages
      for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        message.style.opacity = "0";
        message.style.transform = "translateY(20px)";

        // Draw the current state to canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const tempCanvas = await html2canvas(this.iphoneFrame, {
          scale: 1,
          useCORS: true,
          backgroundColor: "#000000",
          logging: false,
          foreignObjectRendering: true,
          allowTaint: true,
        });

        ctx.drawImage(tempCanvas, 0, 0);

        // Animate the message
        await new Promise((resolve) => {
          message.style.transition = "all 0.3s ease-out";
          setTimeout(() => {
            message.style.opacity = "1";
            message.style.transform = "translateY(0)";
            resolve();
          }, 100);
        });

        // Wait before showing next message
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Restore original styles
      this.iphoneFrame.style.cssText = originalStyles;

      // Stop recording
      mediaRecorder.stop();
    } catch (error) {
      console.error("Error exporting as MP4:", error);
      alert("Failed to export as MP4. Please try again.");
    }
  }
}

// Initialize the export manager when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ExportManager();
});
