// Letter explosion animation system
class LetterExplosion {
  constructor() {
    this.colorPalettes = [
      ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"],
      ["#ff9ff3", "#54a0ff", "#5f27cd", "#00d2d3", "#ff9f43"],
      ["#ff6348", "#2ed573", "#3742fa", "#f368e0", "#ffa502"],
      ["#ff4757", "#2ed573", "#1e90ff", "#ff6348", "#ffa502"],
      ["#ff3838", "#2ecc71", "#3498db", "#9b59b6", "#f39c12"],
    ];
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setupElements());
    } else {
      this.setupElements();
    }
  }

  setupElements() {
    // Find all heading elements
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

    headings.forEach((heading) => {
      // Split text into individual letter spans
      this.wrapLetters(heading);

      // Add click event listener
      heading.addEventListener("click", (e) => {
        e.preventDefault();
        this.explodeAndReform(heading);
      });
    });
  }

  wrapLetters(element) {
    const text = element.textContent;
    element.innerHTML = "";

    [...text].forEach((char, index) => {
      const span = document.createElement("span");
      span.className = "letter";
      span.textContent = char === " " ? "\u00A0" : char; // Non-breaking space
      span.style.animationDelay = `${index * 0.05}s`;
      element.appendChild(span);
    });
  }

  explodeAndReform(element) {
    const letters = element.querySelectorAll(".letter");
    const randomColors = this.getRandomColorPalette();

    // Add glowing effect to the element
    element.classList.add("glowing");

    // Create sparkles
    this.createSparkles(element);

    letters.forEach((letter, index) => {
      // Set random animation properties
      const randomX = (Math.random() - 0.5) * 400; // -200 to 200px
      const randomY = (Math.random() - 0.5) * 400; // -200 to 200px
      const randomRotation = (Math.random() - 0.5) * 720; // -360 to 360 degrees

      letter.style.setProperty("--random-x", `${randomX}px`);
      letter.style.setProperty("--random-y", `${randomY}px`);
      letter.style.setProperty("--random-rotation", `${randomRotation}deg`);

      // Start explosion
      setTimeout(() => {
        letter.classList.add("exploding");
      }, index * 50);

      // Start reform with new color
      setTimeout(() => {
        letter.classList.remove("exploding");
        letter.classList.add("reforming");
        letter.style.color = randomColors[index % randomColors.length];

        // Remove animation classes after animation completes
        setTimeout(() => {
          letter.classList.remove("reforming");
        }, 800);
      }, 800 + index * 50);
    });

    // Remove glowing effect and reposition element
    setTimeout(() => {
      element.classList.remove("glowing");
      // Reposition the entire element after letter animation completes
      this.repositionElement(element);
    }, 1600);
  }

  repositionElement(element) {
    console.log("Repositioning element:", element.textContent);

    // Add repositioning class for smooth animation
    element.classList.add("repositioning");

    // Calculate random position
    const newPosition = this.calculateRandomPosition(element);

    // Apply new position
    element.style.top = `${newPosition.top}px`;
    element.style.left = `${newPosition.left}px`;

    // Add a slight rotation for extra flair
    const randomRotation = (Math.random() - 0.5) * 10; // -5 to 5 degrees
    element.style.transform = `rotate(${randomRotation}deg)`;

    // Remove repositioning class after animation completes
    setTimeout(() => {
      element.classList.remove("repositioning");
    }, 1500);
  }

  calculateRandomPosition(element) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // Calculate safe bounds (with padding)
    const padding = 20;
    const maxTop = viewportHeight - elementHeight - padding;
    const maxLeft = viewportWidth - elementWidth - padding;

    // Generate random position within safe bounds
    const top = Math.max(padding, Math.random() * maxTop);
    const left = Math.max(padding, Math.random() * maxLeft);

    return { top, left };
  }

  getRandomColorPalette() {
    return this.colorPalettes[
      Math.floor(Math.random() * this.colorPalettes.length)
    ];
  }

  createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 15;

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";

      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;

      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.animationDelay = `${Math.random() * 0.5}s`;

      element.appendChild(sparkle);

      // Remove sparkle after animation
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      }, 1000);
    }
  }
}

// Background effects system
class BackgroundEffects {
  constructor() {
    this.isAnimating = false;
    this.init();
    // Set random background color on page load
    this.setRandomInitialBackground();
  }

  init() {
    console.log("BackgroundEffects initialized!");

    // Add double-click event listener to body with better detection
    document.body.addEventListener("dblclick", (e) => {
      console.log(
        "Double-click detected on:",
        e.target,
        "tagName:",
        e.target.tagName
      );

      // Check if we clicked directly on the body element (empty space)
      const isBody = e.target === document.body;
      const isHeading = e.target.matches("h1, h2, h3, h4, h5, h6");
      const isLetter = e.target.matches(".letter");
      const isButton = e.target.matches("button");

      if (isBody || (!isHeading && !isLetter && !isButton)) {
        console.log("Triggering background effects!");
        this.triggerWildColors(e);
      } else {
        console.log(
          "Skipping background effects - clicked on:",
          e.target.tagName,
          e.target.className
        );
      }
    });

    // Add single click for pulse effect with better detection
    document.body.addEventListener("click", (e) => {
      const isBody = e.target === document.body;
      const isHeading = e.target.matches("h1, h2, h3, h4, h5, h6");
      const isLetter = e.target.matches(".letter");
      const isButton = e.target.matches("button");

      if (isBody || (!isHeading && !isLetter && !isButton)) {
        console.log("Triggering pulse effect!");
        this.triggerPulse();
      }
    });

    // Keep right-click as backup trigger
    document.body.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      console.log("Right-click detected - forcing background animation!");
      this.triggerWildColors(e);
    });
  }

  triggerWildColors(event) {
    if (this.isAnimating) return;

    this.isAnimating = true;

    // Debug log
    console.log("Triggering wild colors animation!");

    // Generate a random end color for this animation
    const randomEndColor = this.generateRandomEndColor();
    console.log("Animation will end with color:", randomEndColor);

    // Set the random end color as a CSS custom property
    document.body.style.setProperty("--random-end-color", randomEndColor);

    // Add wild colors animation
    document.body.classList.add("wild-colors");

    // Create floating particles from click point
    this.createBackgroundParticles(event.clientX, event.clientY);

    // Create screen flash effect
    this.createScreenFlash();

    // Remove animation class after completion and set the new background
    setTimeout(() => {
      document.body.classList.remove("wild-colors");
      document.body.style.backgroundColor = randomEndColor;
      this.isAnimating = false;
      console.log(
        "Wild colors animation completed! New background:",
        randomEndColor
      );
    }, 3000);
  }

  generateRandomEndColor() {
    // Choose random color generation method
    const methods = [
      () => this.generateRandomDarkColor(),
      () => this.generateRandomVibrantColor(),
      () => this.generateRandomPastelColor(),
      () => this.generateRandomNeonColor(),
      () => this.generateRandomEarthTone(),
      () => this.generateRandomJewelTone(),
    ];

    const randomMethod = methods[Math.floor(Math.random() * methods.length)];
    return randomMethod();
  }

  generateRandomDarkColor() {
    // Generate dark colors (RGB values 0-120)
    const r = Math.floor(Math.random() * 121);
    const g = Math.floor(Math.random() * 121);
    const b = Math.floor(Math.random() * 121);
    return `rgb(${r}, ${g}, ${b})`;
  }

  generateRandomVibrantColor() {
    // Generate vibrant colors with at least one high value
    const colors = [];
    for (let i = 0; i < 3; i++) {
      colors.push(Math.floor(Math.random() * 256));
    }
    // Ensure at least one color is vibrant (>150)
    const randomIndex = Math.floor(Math.random() * 3);
    colors[randomIndex] = Math.max(
      colors[randomIndex],
      150 + Math.floor(Math.random() * 106)
    );

    return `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
  }

  generateRandomPastelColor() {
    // Generate soft pastel colors (high values with some variation)
    const r = 150 + Math.floor(Math.random() * 106);
    const g = 150 + Math.floor(Math.random() * 106);
    const b = 150 + Math.floor(Math.random() * 106);
    return `rgb(${r}, ${g}, ${b})`;
  }

  generateRandomNeonColor() {
    // Generate bright neon-like colors
    const neonBase = [
      [255, 0, 255],
      [0, 255, 255],
      [255, 255, 0],
      [255, 0, 128],
      [128, 255, 0],
      [0, 128, 255],
    ];
    const base = neonBase[Math.floor(Math.random() * neonBase.length)];

    // Add some variation to the base neon color
    const r = Math.max(0, Math.min(255, base[0] + (Math.random() - 0.5) * 100));
    const g = Math.max(0, Math.min(255, base[1] + (Math.random() - 0.5) * 100));
    const b = Math.max(0, Math.min(255, base[2] + (Math.random() - 0.5) * 100));

    return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
  }

  generateRandomEarthTone() {
    // Generate earth tones (browns, greens, oranges)
    const earthPalettes = [
      { r: [101, 67, 33], g: [67, 33, 16], b: [33, 16, 8] }, // Browns
      { r: [34, 68, 102], g: [85, 119, 153], b: [34, 51, 68] }, // Forest greens
      { r: [153, 102, 51], g: [102, 68, 34], b: [51, 34, 17] }, // Oranges/rust
      { r: [68, 85, 102], g: [85, 102, 119], b: [102, 119, 136] }, // Blue-grays
    ];

    const palette =
      earthPalettes[Math.floor(Math.random() * earthPalettes.length)];
    const r =
      palette.r[Math.floor(Math.random() * palette.r.length)] +
      Math.floor(Math.random() * 50);
    const g =
      palette.g[Math.floor(Math.random() * palette.g.length)] +
      Math.floor(Math.random() * 50);
    const b =
      palette.b[Math.floor(Math.random() * palette.b.length)] +
      Math.floor(Math.random() * 50);

    return `rgb(${Math.min(255, r)}, ${Math.min(255, g)}, ${Math.min(255, b)})`;
  }

  generateRandomJewelTone() {
    // Generate rich jewel tones
    const jewelBases = [
      [128, 0, 128], // Purple (amethyst)
      [0, 100, 0], // Green (emerald)
      [220, 20, 60], // Red (ruby)
      [0, 0, 139], // Blue (sapphire)
      [255, 140, 0], // Orange (topaz)
      [75, 0, 130], // Indigo
    ];

    const base = jewelBases[Math.floor(Math.random() * jewelBases.length)];
    const r = Math.max(0, Math.min(255, base[0] + (Math.random() - 0.5) * 80));
    const g = Math.max(0, Math.min(255, base[1] + (Math.random() - 0.5) * 80));
    const b = Math.max(0, Math.min(255, base[2] + (Math.random() - 0.5) * 80));

    return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
  }

  setRandomInitialBackground() {
    const randomColor = this.generateRandomEndColor();
    document.body.style.backgroundColor = randomColor;
    console.log("Initial random background set to:", randomColor);
  }

  triggerPulse() {
    if (!this.isAnimating) {
      document.body.classList.add("pulsing");

      setTimeout(() => {
        document.body.classList.remove("pulsing");
      }, 500);
    }
  }

  createBackgroundParticles(centerX, centerY) {
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "bg-particle";

      // Random direction and distance
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
      const distance = 100 + Math.random() * 200;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      // Set initial position at click point
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;

      // Set animation properties
      particle.style.setProperty("--particle-x", `${x}px`);
      particle.style.setProperty("--particle-y", `${y}px`);

      // Random colors for particles
      const colors = [
        "rgba(255, 107, 107, 0.8)",
        "rgba(78, 205, 196, 0.8)",
        "rgba(69, 183, 209, 0.8)",
        "rgba(150, 206, 180, 0.8)",
        "rgba(254, 202, 87, 0.8)",
      ];
      particle.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      document.body.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 4000);
    }
  }

  createScreenFlash() {
    const flash = document.createElement("div");
    flash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9999;
      animation: screenFlash 0.5s ease-out forwards;
    `;

    // Add flash animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes screenFlash {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(flash);

    setTimeout(() => {
      if (flash.parentNode) {
        flash.parentNode.removeChild(flash);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    }, 500);
  }
}

// Initialize both systems
const letterExplosion = new LetterExplosion();
const backgroundEffects = new BackgroundEffects();

// All systems initialized and ready!

// Keep the original movie variables for reference
const movieOne = "The VVitch";
const movieTwo = "Hell Watcher";
const movieThree = "Dog Man";
const movieFour = "Dog Man II";
