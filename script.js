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

    // Start subtle background animations
    this.startSubtleAnimations();
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

    // Create enhanced sparkles with more particles
    this.createEnhancedSparkles(element);

    // Add screen shake for letter explosions too
    this.addLetterScreenShake();

    letters.forEach((letter, index) => {
      // Much more dramatic explosion properties
      const randomX = (Math.random() - 0.5) * 800; // Doubled from 400 to 800px
      const randomY = (Math.random() - 0.5) * 800; // Much bigger spread
      const randomRotation = (Math.random() - 0.5) * 1440; // Doubled rotation: -720 to 720 degrees

      // Dynamic font size changes during explosion
      const originalSize = parseFloat(getComputedStyle(letter).fontSize) || 16;
      const explosionSize = originalSize * (1.5 + Math.random() * 2); // 1.5x to 3.5x bigger
      const finalSize = originalSize * (0.8 + Math.random() * 0.6); // 0.8x to 1.4x final size

      letter.style.setProperty("--random-x", `${randomX}px`);
      letter.style.setProperty("--random-y", `${randomY}px`);
      letter.style.setProperty("--random-rotation", `${randomRotation}deg`);
      letter.style.setProperty("--explosion-size", `${explosionSize}px`);
      letter.style.setProperty("--final-size", `${finalSize}px`);

      // Add dramatic glow during explosion
      letter.style.setProperty(
        "--glow-color",
        randomColors[Math.floor(Math.random() * randomColors.length)]
      );

      // Start explosion with staggered timing
      setTimeout(() => {
        letter.classList.add("exploding");
        // Add individual letter shake
        this.addLetterShake(letter);
      }, index * 30); // Faster stagger for more chaos

      // Start reform with new color and enhanced flickering
      setTimeout(() => {
        letter.classList.remove("exploding");
        letter.classList.add("reforming");

        // Generate completely arbitrary reformation start positions
        const reformStartX = (Math.random() - 0.5) * 600; // -300 to 300px from final position
        const reformStartY = (Math.random() - 0.5) * 600; // -300 to 300px from final position
        const reformStartRotation = (Math.random() - 0.5) * 1080; // -540 to 540 degrees
        const reformStartScale = 0.1 + Math.random() * 0.4; // 0.1 to 0.5 scale

        // Set arbitrary reformation start properties
        letter.style.setProperty("--reform-start-x", `${reformStartX}px`);
        letter.style.setProperty("--reform-start-y", `${reformStartY}px`);
        letter.style.setProperty(
          "--reform-start-rotation",
          `${reformStartRotation}deg`
        );
        letter.style.setProperty("--reform-start-scale", reformStartScale);

        // Truly random color assignment
        const randomColorIndex = Math.floor(
          Math.random() * randomColors.length
        );
        letter.style.color = randomColors[randomColorIndex];
        letter.style.fontSize = `${finalSize}px`;

        // Add enhanced flickering effect during reformation
        this.addEnhancedFlickerEffect(letter, randomColors);

        // Remove animation classes after animation completes
        setTimeout(() => {
          letter.classList.remove("reforming");
        }, 1000); // Slightly longer for more dramatic effect
      }, 1000 + index * 40); // Longer explosion time
    });

    // Remove glowing effect and reposition element
    setTimeout(() => {
      element.classList.remove("glowing");
      // Reposition the entire element after letter animation completes
      this.repositionElement(element);
    }, 2200); // Extended timing for longer animations
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

    // Randomly choose layout orientation
    const orientationChoice = Math.random();
    let elementTransform = "";

    if (orientationChoice < 0.3) {
      // 30% chance: Vertical layout (letters stacked)
      this.applyVerticalLayout(element);
      const randomRotation = (Math.random() - 0.5) * 20; // -10 to 10 degrees
      elementTransform = `rotate(${randomRotation}deg)`;
    } else if (orientationChoice < 0.5) {
      // 20% chance: Diagonal layout
      this.applyDiagonalLayout(element);
      const randomRotation = 30 + (Math.random() - 0.5) * 60; // 0 to 60 degrees
      elementTransform = `rotate(${randomRotation}deg)`;
    } else if (orientationChoice < 0.7) {
      // 20% chance: Steep angle
      const steepAngle = 60 + Math.random() * 60; // 60 to 120 degrees
      elementTransform = `rotate(${steepAngle}deg)`;
    } else if (orientationChoice < 0.85) {
      // 15% chance: Upside down
      const upsideAngle = 150 + Math.random() * 60; // 150 to 210 degrees
      elementTransform = `rotate(${upsideAngle}deg)`;
    } else {
      // 15% chance: Slight angle (normal-ish)
      const randomRotation = (Math.random() - 0.5) * 30; // -15 to 15 degrees
      elementTransform = `rotate(${randomRotation}deg)`;
    }

    element.style.transform = elementTransform;

    // Remove repositioning class after animation completes
    setTimeout(() => {
      element.classList.remove("repositioning");
    }, 1500);
  }

  applyVerticalLayout(element) {
    const letters = element.querySelectorAll(".letter");
    letters.forEach((letter, index) => {
      // Stack letters vertically with slight random offset
      const verticalOffset = index * (20 + Math.random() * 10); // 20-30px spacing
      const horizontalJitter = (Math.random() - 0.5) * 10; // -5 to 5px horizontal variation

      letter.style.position = "relative";
      letter.style.display = "block";
      letter.style.top = `${verticalOffset}px`;
      letter.style.left = `${horizontalJitter}px`;
      letter.style.lineHeight = "1";
    });
  }

  applyDiagonalLayout(element) {
    const letters = element.querySelectorAll(".letter");
    letters.forEach((letter, index) => {
      // Arrange letters diagonally
      const diagonalOffset = index * (15 + Math.random() * 8); // 15-23px spacing
      const verticalOffset = index * (12 + Math.random() * 6); // 12-18px vertical
      const jitter = (Math.random() - 0.5) * 8; // Random jitter

      letter.style.position = "relative";
      letter.style.display = "inline-block";
      letter.style.left = `${diagonalOffset + jitter}px`;
      letter.style.top = `${verticalOffset + jitter}px`;
    });
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

  addFlickerEffect(letter, colorPalette) {
    // Create rapid color changes during reformation
    const flickerCount = 3 + Math.floor(Math.random() * 4); // 3-6 flickers
    const flickerInterval = 800 / flickerCount; // Spread over 800ms reformation time

    for (let i = 0; i < flickerCount; i++) {
      setTimeout(() => {
        const randomColor =
          colorPalette[Math.floor(Math.random() * colorPalette.length)];
        letter.style.color = randomColor;

        // Add brief intensity flash
        letter.style.textShadow = `0 0 8px ${randomColor}`;
        setTimeout(() => {
          letter.style.textShadow = "";
        }, flickerInterval / 3);
      }, i * flickerInterval);
    }
  }

  addEnhancedFlickerEffect(letter, colorPalette) {
    // Much more dramatic flickering with size and glow changes
    const flickerCount = 5 + Math.floor(Math.random() * 6); // 5-10 flickers
    const flickerInterval = 1000 / flickerCount; // Spread over 1000ms reformation time

    for (let i = 0; i < flickerCount; i++) {
      setTimeout(() => {
        const randomColor =
          colorPalette[Math.floor(Math.random() * colorPalette.length)];
        letter.style.color = randomColor;

        // Dramatic glow and size effects
        const glowIntensity = 15 + Math.random() * 20; // 15-35px glow
        const sizeMultiplier = 0.8 + Math.random() * 0.6; // 0.8x to 1.4x size variation
        const currentSize = parseFloat(letter.style.fontSize) || 16;

        letter.style.textShadow = `
          0 0 ${glowIntensity}px ${randomColor},
          0 0 ${glowIntensity * 1.5}px ${randomColor},
          0 0 ${glowIntensity * 2}px ${randomColor}
        `;
        letter.style.fontSize = `${currentSize * sizeMultiplier}px`;

        setTimeout(() => {
          letter.style.textShadow = "";
          letter.style.fontSize = `${currentSize}px`;
        }, flickerInterval / 2);
      }, i * flickerInterval);
    }
  }

  createEnhancedSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 30; // Doubled from 15 to 30

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "enhanced-sparkle";

      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const size = 2 + Math.random() * 6; // Variable sizes 2-8px
      const duration = 0.8 + Math.random() * 0.8; // 0.8-1.6s duration

      sparkle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #fff, transparent);
        border-radius: 50%;
        pointer-events: none;
        animation: enhancedSparkle ${duration}s ease-out forwards;
        animation-delay: ${Math.random() * 0.5}s;
        box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.8);
      `;

      element.appendChild(sparkle);

      // Remove sparkle after animation
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      }, (duration + 0.5) * 1000);
    }
  }

  addLetterScreenShake() {
    // Lighter screen shake for letter explosions
    document.body.style.animation = "letterShake 0.4s ease-out";

    setTimeout(() => {
      document.body.style.animation = "";
    }, 400);
  }

  addLetterShake(letter) {
    // Individual letter shake during explosion
    letter.style.animation = "individualLetterShake 0.3s ease-out";

    setTimeout(() => {
      letter.style.animation = "";
    }, 300);
  }

  startSubtleAnimations() {
    // Add subtle default flickering and micro-explosions
    setInterval(() => {
      const allLetters = document.querySelectorAll(".letter");
      if (allLetters.length === 0) return;

      // Random letter gets a subtle effect
      if (Math.random() < 0.05) {
        // 5% chance every interval
        const randomLetter =
          allLetters[Math.floor(Math.random() * allLetters.length)];
        this.addSubtleFlicker(randomLetter);
      }

      // Occasionally trigger a mini-sparkle burst
      if (Math.random() < 0.02) {
        // 2% chance
        const randomElement =
          document.querySelectorAll("h1, h2, h3, h4")[
            Math.floor(Math.random() * 5)
          ];
        if (randomElement) {
          this.addMiniSparkles(randomElement);
        }
      }
    }, 2000); // Check every 2 seconds
  }

  addSubtleFlicker(letter) {
    const originalColor = letter.style.color || getComputedStyle(letter).color;
    const brightColors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#feca57",
    ];
    const flickerColor =
      brightColors[Math.floor(Math.random() * brightColors.length)];

    // Brief color flash
    letter.style.color = flickerColor;
    letter.style.textShadow = `0 0 6px ${flickerColor}`;

    setTimeout(() => {
      letter.style.color = originalColor;
      letter.style.textShadow = "";
    }, 150 + Math.random() * 200); // 150-350ms flicker
  }

  addMiniSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 3 + Math.floor(Math.random() * 4); // 3-6 mini sparkles

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "mini-sparkle";

      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;

      sparkle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 2px;
        height: 2px;
        background: #fff;
        border-radius: 50%;
        pointer-events: none;
        animation: miniSparkle 1s ease-out forwards;
        animation-delay: ${Math.random() * 0.3}s;
      `;

      element.appendChild(sparkle);

      // Remove sparkle after animation
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      }, 1300);
    }
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

    // Use smooth color transition instead of CSS animation for mobile compatibility
    this.animateBackgroundColorSmooth(randomEndColor);

    // Create floating particles from click point
    this.createBackgroundParticles(event.clientX, event.clientY);

    // Create screen flash effect
    this.createScreenFlash();

    // Complete animation
    setTimeout(() => {
      this.isAnimating = false;
      console.log(
        "Wild colors animation completed! New background:",
        randomEndColor
      );
    }, 3000);
  }

  animateBackgroundColorSmooth(finalColor) {
    // Create color sequence for smooth transition
    const colorSequence = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#ff9ff3",
      "#54a0ff",
      "#5f27cd",
      "#ff6348",
      "#2ed573",
      "#3742fa",
      "#f368e0",
      "#ffa502",
      "#ff4757",
      "#2ecc71",
      "#3498db",
      "#9b59b6",
      "#ff3838",
      "#f39c12",
      "#e74c3c",
      "#1abc9c",
      "#3498db",
      "#9b59b6",
      "#e67e22",
      "#e74c3c",
      "#8e44ad",
      finalColor,
    ];

    let currentStep = 0;
    const totalSteps = colorSequence.length;
    const stepDuration = 3000 / totalSteps; // 3 seconds total

    const colorInterval = setInterval(() => {
      if (currentStep >= totalSteps) {
        clearInterval(colorInterval);
        // Ensure final color is set
        document.body.style.backgroundColor = finalColor;
        return;
      }

      // Smooth transition to next color
      document.body.style.transition = `background-color ${stepDuration}ms ease-out`;
      document.body.style.backgroundColor = colorSequence[currentStep];

      currentStep++;
    }, stepDuration);

    // Clean up transition after animation
    setTimeout(() => {
      document.body.style.transition = "all 0.3s ease";
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
    const particleCount = 60; // Doubled from 25 to 60!

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "bg-particle";

      // More dramatic direction and distance
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 1.0;
      const distance = 150 + Math.random() * 400; // Increased from 100-300 to 150-550
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      // Set initial position at click point
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;

      // Set animation properties
      particle.style.setProperty("--particle-x", `${x}px`);
      particle.style.setProperty("--particle-y", `${y}px`);

      // More vibrant colors with higher opacity
      const colors = [
        "rgba(255, 107, 107, 0.95)",
        "rgba(78, 205, 196, 0.95)",
        "rgba(69, 183, 209, 0.95)",
        "rgba(150, 206, 180, 0.95)",
        "rgba(254, 202, 87, 0.95)",
        "rgba(255, 0, 255, 0.9)", // Bright magenta
        "rgba(0, 255, 255, 0.9)", // Bright cyan
        "rgba(255, 255, 0, 0.9)", // Bright yellow
        "rgba(255, 0, 128, 0.9)", // Hot pink
        "rgba(128, 255, 0, 0.9)", // Lime green
      ];
      particle.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      // Random particle sizes for more variety
      const size = 4 + Math.random() * 8; // 4-12px instead of fixed 6px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Add glow effect to particles
      particle.style.boxShadow = `0 0 ${size * 2}px ${
        particle.style.background
      }`;

      document.body.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 5000); // Increased duration from 4s to 5s
    }

    // Add additional explosion rings for more drama
    this.createExplosionRings(centerX, centerY);

    // Add screen shake effect
    this.addScreenShake();
  }

  createExplosionRings(centerX, centerY) {
    // Create 3 expanding rings for dramatic effect
    for (let ring = 0; ring < 3; ring++) {
      const ringElement = document.createElement("div");
      ringElement.className = "explosion-ring";

      ringElement.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 0px;
        height: 0px;
        border: 3px solid rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        animation: explosionRing ${1.5 + ring * 0.3}s ease-out forwards;
        animation-delay: ${ring * 0.2}s;
      `;

      document.body.appendChild(ringElement);

      // Remove ring after animation
      setTimeout(() => {
        if (ringElement.parentNode) {
          ringElement.parentNode.removeChild(ringElement);
        }
      }, 2500 + ring * 300);
    }
  }

  addScreenShake() {
    // Add dramatic screen shake effect
    document.body.style.animation = "screenShake 0.6s ease-out";

    setTimeout(() => {
      document.body.style.animation = "";
    }, 600);
  }

  createScreenFlash() {
    // Create multiple flash layers for more intensity
    for (let i = 0; i < 3; i++) {
      const flash = document.createElement("div");
      const intensity = 0.4 - i * 0.1; // Decreasing intensity for layers
      const delay = i * 100; // Stagger the flashes

      flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle, rgba(255,255,255,${intensity}) 0%, rgba(255,255,255,${
        intensity * 0.3
      }) 30%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        animation: dramaticFlash ${0.8 + i * 0.2}s ease-out forwards;
        animation-delay: ${delay}ms;
      `;

      document.body.appendChild(flash);

      setTimeout(() => {
        if (flash.parentNode) {
          flash.parentNode.removeChild(flash);
        }
      }, 1200 + delay);
    }

    // Add flash animation if not already added
    if (!document.getElementById("dramaticFlashStyle")) {
      const style = document.createElement("style");
      style.id = "dramaticFlashStyle";
      style.textContent = `
        @keyframes dramaticFlash {
          0% { opacity: 0; transform: scale(0.8); }
          20% { opacity: 1; transform: scale(1.1); }
          40% { opacity: 0.8; transform: scale(1.05); }
          60% { opacity: 1; transform: scale(1.02); }
          80% { opacity: 0.6; transform: scale(1.01); }
          100% { opacity: 0; transform: scale(1); }
        }
      `;
      document.head.appendChild(style);
    }
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
