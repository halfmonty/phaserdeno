var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// games/fate/main.ts
import Phaser from "https://esm.sh/phaser@3.52.0";
import { enable3d, Canvas } from "https://esm.sh/@enable3d/phaser-extension@0.25.4";

// games/fate/scenes/bootloader.ts
import { Scene3D } from "https://esm.sh/@enable3d/phaser-extension@0.25.4";
var Bootloader = class extends Scene3D {
  constructor() {
    super({ key: "bootloader" });
    __publicField(this, "progressBar");
    __publicField(this, "loadBar");
  }
  /*
     We use the preload method to call the methods to load all our assets.
     */
  preload() {
    this.createBars();
    this.setLoadEvents();
    this.loadFonts();
    this.loadImages();
    this.loadAudios();
    this.loadVideos();
    this.setRegistry();
  }
  /*
     This is a method to set the events that will be triggered when the loading is progressing and when it is complete.
     */
  setLoadEvents() {
    this.load.on(
      "progress",
      (value) => {
        this.progressBar.clear();
        this.progressBar.fillStyle(237666, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          this.cameras.main.width / 2 * value,
          16
        );
      },
      this
    );
    this.load.on(
      "complete",
      () => {
        this.scene.start("story");
      },
      this
    );
  }
  /*
     This is a method to load the fonts.
     */
  loadFonts() {
    this.load.bitmapFont(
      "pixelFont",
      "assets/fonts/mario.png",
      "assets/fonts/mario.xml"
    );
    this.load.bitmapFont(
      "computer",
      "assets/fonts/computer.png",
      "assets/fonts/computer.xml"
    );
  }
  /*
     We load this logo that looks old to match the style of the splash.
     */
  loadImages() {
    this.load.image("pello_logo_old", "assets/images/pello_logo_old.png");
  }
  /*
     We need to keep track of the deviation -hits- and the number of probes.
     */
  setRegistry() {
    this.registry.set("deviation", "0");
    this.registry.set("probes", "20");
  }
  /*
     We load the sounds and the music.
     */
  loadAudios() {
    Array(4).fill(0).forEach((e, i) => {
      this.load.audio(`thunder${i}`, `./assets/sounds/thunder${i}.mp3`);
    });
    Array(2).fill(0).forEach((e, i) => {
      this.load.audio(`passby${i}`, `./assets/sounds/passby${i}.mp3`);
    });
    Array(4).fill(0).forEach((_, i) => {
      this.load.audio(`hit${i + 1}`, `assets/sounds/hit${i + 1}.mp3`);
    });
    this.load.image("logo", "assets/images/logo.png");
    this.load.audio("hymn", "assets/sounds/hymn.mp3");
    this.load.audio("music", "assets/sounds/music.mp3");
    this.load.audio("type", "assets/sounds/type.mp3");
    this.load.audio("shot", "assets/sounds/shot.mp3");
    this.load.audio("voice_start", "assets/sounds/voice_start.mp3");
    this.load.audio("voice_drop", "assets/sounds/voice_drop.mp3");
    this.load.audio("voice_hit", "assets/sounds/voice_hit.mp3");
  }
  /*
     In this game, we are using videos! They will be player in the presentation scene that comes before the Splash.
     */
  loadVideos() {
  }
  /*
     As you may already now, this is a method to create the loading bars.
     */
  createBars() {
    this.loadBar = this.add.graphics();
    this.loadBar.fillStyle(450954, 1);
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
};

// games/fate/main.ts
var config = {
  type: Phaser.WEBGL,
  transparent: true,
  width: 600,
  height: 300,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  parent: "game-container",
  scene: [Bootloader],
  // scene: [Bootloader, Story, Splash, Game, Outro, GameOver],
  ...Canvas()
};
window.addEventListener("load", () => {
  enable3d(() => new Phaser.Game(config)).withPhysics("./assets/fate/ammo");
});
//# sourceMappingURL=main.js.map
