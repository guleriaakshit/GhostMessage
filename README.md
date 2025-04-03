# GhostMessage - Fake iPhone Chat Generator

GhostMessage is a web-based tool that allows you to create realistic iPhone chat screenshots with full customization options and multiple export formats.

## Features

- 🎨 Realistic iPhone chat UI with iMessage-style bubbles
- 🌓 Dark/Light mode support
- ⚙️ Customizable iOS status bar (time, battery, WiFi, carrier)
- ✏️ Real-time message editing
- 🎯 Drag-and-drop message reordering
- 💾 Auto-save functionality
- 📤 Export options:
  - PNG (high-resolution)
  - PDF (vector-based)
  - SVG (scalable vector graphics)
  - MP4 (animated chat playback)

## Getting Started

1. Clone the repository or download the files
2. Open `index.html` in a modern web browser
3. Start creating your chat screenshots!

## Usage

### Adding Messages

1. Type your message in the text area
2. Select the sender (Me/Them)
3. Click "Add Message" or press Enter
4. Drag messages to reorder them

### Customizing the Status Bar

- Click the time to edit it
- Click the battery icon to cycle through battery levels
- Click the WiFi icon to cycle through signal strengths
- Edit the carrier name in the input field

### Exporting

1. Click one of the export buttons:

   - PNG: High-resolution image export
   - PDF: Vector-based document export
   - SVG: Scalable vector graphics export
   - MP4: Animated chat playback export

2. The file will automatically download

### Dark Mode

Click the "Toggle Dark Mode" button to switch between light and dark themes.

## Technical Details

GhostMessage is built using:

- HTML5
- CSS3 (with Tailwind CSS)
- Vanilla JavaScript
- html2canvas.js for image capture
- jsPDF for PDF generation
- MediaRecorder API for video export

## Browser Support

GhostMessage works best in modern browsers that support:

- ES6+ JavaScript
- CSS Grid and Flexbox
- MediaRecorder API
- LocalStorage

## License

MIT License - feel free to use this project for your own purposes!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
