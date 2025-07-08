var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// games/mars/main.ts
import Phaser2 from "https://esm.sh/phaser@4.0.0-rc.4";

// games/mars/scenes/bootloader.ts
var Bootloader = class extends Phaser.Scene {
  constructor() {
    super({ key: "bootloader" });
    __publicField(this, "progressBar");
    __publicField(this, "loadBar");
  }
  /*
    Once again we load all the assets in the preload method, organizing them in the usual order and starting from the progress bar.
    */
  preload() {
    this.createBars();
    this.setLoadEvents();
    this.loadFonts();
    this.loadImages();
    this.loadMaps();
    this.loadAudios();
    this.loadSpritesheets();
    this.setRegistry();
  }
  /*
    This will be the method that will be in charge of updating the progress bar as the assets are loaded. The colors used in the bar are the same that we use in the game and the splash screen.
    */
  setLoadEvents() {
    this.load.on(
      "progress",
      (value) => {
        this.progressBar.clear();
        this.progressBar.fillStyle(11411474, 1);
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
        this.scene.start("splash");
      },
      this
    );
  }
  /*
    In this game, there's only one minimalistic, computer-like font, so we only need to load one bitmap font.
    */
  loadFonts() {
    this.load.bitmapFont(
      "pico",
      "assets/mars/fonts/pico.png",
      "assets/mars/fonts/pico.xml"
    );
  }
  /*
    These are the fixed images of the game. A couple of them are backgrounds used in the game transitions.
    */
  loadImages() {
    this.load.image("body", "assets/mars/images/body.png");
    this.load.image("landscape", "assets/mars/images/landscape.png");
    this.load.image("record", "assets/mars/images/record.png");
    this.load.image("hole", "assets/mars/images/hole.png");
    this.load.image("pello", "assets/mars/images/pello_ok.png");
    this.load.image("mars", "assets/mars/maps/mars64.png");
    this.load.image("background", "assets/mars/maps/mars.png");
  }
  /*
    This game contains different tiled maps. As the game advances, the style will change slightly, with a more complex and darker style at the end.
    */
  loadMaps() {
    Array(7).fill(0).forEach((_, i) => {
      this.load.tilemapTiledJSON(`scene${i}`, `assets/mars/maps/scene${i}.json`);
    });
  }
  /*
    There are many audios in this game because we need to create a very immersive atmosphere and we require sound recordings for the diaries and the officer's messages.
    */
  loadAudios() {
    this.load.audio("mars_background", "assets/mars/sounds/mars_background.mp3");
    this.load.audio("step", "assets/mars/sounds/step.mp3");
    this.load.audio("creepy", "assets/mars/sounds/creepy.mp3");
    this.load.audio("heartbeat", "assets/mars/sounds/heartbeat.mp3");
    this.load.audio("breath", "assets/mars/sounds/breath.mp3");
    this.load.audio("blip", "assets/mars/sounds/blip.mp3");
    this.load.audio("ohmygod", "assets/mars/sounds/ohmygod.mp3");
    this.load.audio("kill", "assets/mars/sounds/kill.mp3");
    this.load.audio("tracker", "assets/mars/sounds/tracker.mp3");
    this.load.audio("holeshout", "assets/mars/sounds/holeshout.mp3");
    this.load.audio("oxygen", "assets/mars/sounds/oxygen.mp3");
    this.load.audio("monster", "assets/mars/sounds/monster.mp3");
    this.load.audio("killed", "assets/mars/sounds/killed.mp3");
    this.load.audio("creepy_static", "assets/mars/sounds/creepy_static.mp3");
    this.load.audio("shock", "assets/mars/sounds/shock.mp3");
    this.load.audio("cave", "assets/mars/sounds/cave.mp3");
    this.load.audio("type", "assets/mars/sounds/type.mp3");
    Array(4).fill(0).forEach((_, i) => {
      this.load.audio(`static${i}`, `assets/mars/sounds/static${i}.mp3`);
    });
    Array(6).fill(0).forEach((_, i) => {
      this.load.audio(
        `diary${i + 1}`,
        `assets/mars/sounds/diary/diary${i + 1}.mp3`
      );
    });
    Array(6).fill(0).forEach((_, i) => {
      this.load.audio(
        `officer${i + 1}`,
        `assets/mars/sounds/officer/officer${i + 1}.mp3`
      );
    });
  }
  /*
    These are the sprites, not many because of the style of the game. Uh-oh, there's a monster!
    */
  loadSpritesheets() {
    this.load.spritesheet("player", "assets/mars/images/player.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("debris", "assets/mars/images/debris.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("step", "assets/mars/images/step.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("wave", "assets/mars/images/wave.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("drone", "assets/mars/images/drone.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("monster", "assets/mars/images/monster.png", {
      frameWidth: 128,
      frameHeight: 64
    });
  }
  /*
    This method will set the initial value of the game's registry. The score will be set to 0. We could use it to measure completion time or the steps required.
    */
  setRegistry() {
    this.registry.set("score", 0);
  }
  /*
    This is the background of the progress bar. It's a simple rectangle with a border and it also uses one of the game's colors.
    */
  createBars() {
    this.loadBar = this.add.graphics();
    this.loadBar.fillStyle(7017483, 1);
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
};

// games/mars/gameobjects/utils.ts
var Utils = class {
  constructor(scene) {
    __publicField(this, "scene");
    __publicField(this, "typeAudio");
    this.scene = scene;
  }
  /*
  This is the typeText method. It will create a bitmap text for each character in the string, and will animate them in a timeline. The text will be typed in the screen, with a typewriter effect.
    */
  typeText(text, font, x, y = 150, tint = 450954, size = 40) {
    const characters = [];
    let jump = 0;
    let line = 0;
    let last = 0;
    text.split("").forEach((character, i) => {
      if (character === "\n") {
        jump += 2;
        line = 0;
      }
      last = i;
      characters.push(
        this.scene.add.bitmapText(
          x - 350 + line++ * 25,
          y + jump * size,
          font,
          character,
          size
        ).setTint(tint).setAlpha(0)
      );
    });
    const ending = this.scene.add.rectangle(x - 335 + line * 25, y + 25 + jump * size, 25, 5, tint).setOrigin(0.5).setAlpha(0);
    const timeline = this.scene.add.timeline({});
    this.typeAudio = this.scene.sound.add("type");
    characters.forEach((character, i) => {
      timeline.add({
        at: 0,
        tween: {
          targets: character,
          alpha: { from: 0, to: 0.5 },
          duration: 100
        }
      });
    });
    timeline.add({
      at: 100,
      tween: {
        targets: ending,
        alpha: { from: 0, to: 0.8 },
        duration: 100,
        repeat: 5,
        yoyo: true,
        onStart: () => {
          this.typeAudio?.stop();
        }
      }
    });
    this.typeAudio.play({
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    });
    timeline.play();
    characters.push(ending);
    return characters;
  }
  /*
  This removes the typed text from the screen.
    */
  removeTyped(texts) {
    texts.flat().forEach((char) => char.destroy());
  }
};

// games/mars/scenes/outro.ts
var Outro = class extends Phaser.Scene {
  constructor() {
    super({ key: "outro" });
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "introLayer");
    __publicField(this, "splashLayer");
    __publicField(this, "utils");
    __publicField(this, "title");
    __publicField(this, "theme");
  }
  /*
  The outro is similar to the Splash screen, but it has a different background and a different title. It also has a different music theme.
    */
  create() {
    this.width = +this.sys.game.config.width;
    this.height = +this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.introLayer = this.add.layer();
    this.splashLayer = this.add.layer();
    this.add.tileSprite(0, 0, 800, 600, "landscape").setOrigin(0);
    this.utils = new Utils(this);
    this.title = this.add.bitmapText(
      this.center_width,
      this.center_height + 100,
      "pico",
      "MARSTRANDED",
      60
    ).setTint(7017483).setAlpha(0).setDropShadow(0, 4, 7024682, 0.9).setOrigin(0.5);
    this.tweens.add({
      targets: this.title,
      alpha: { from: 0, to: 1 },
      duration: 4e3
    });
    this.input.keyboard?.on("keydown-SPACE", this.startSplash, this);
    this.input.keyboard?.on("keydown-ENTER", this.startSplash, this);
  }
  /*
  We set again the background sound.
    */
  playMusic(theme = "mars_background") {
    this.theme = this.sound.add(theme);
    this.theme.stop();
    this.theme.play({
      mute: false,
      volume: 1.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    });
  }
  /*
  This function will start the Splash screen.
    */
  startSplash() {
    this.sound.stopAll();
    this.scene.start("splash");
  }
};

// games/mars/gameobjects/particle.ts
var ShotSmoke = class extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, directionX, directionY, color = 16771755) {
    x += Phaser.Math.Between(-30, 30);
    y += Phaser.Math.Between(-30, 30);
    const width = Phaser.Math.Between(30, 55);
    const height = Phaser.Math.Between(30, 55);
    super(scene, x, y, width, height, color);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.body.setVelocityX(100 * directionX);
    this.body.setVelocityY(100 * directionY);
    this.init();
  }
  init() {
    this.scene.tweens.add({
      targets: this,
      duration: 800,
      scale: { from: 1, to: 0 },
      onComplete: () => {
        this.destroy();
      }
    });
  }
};

// games/mars/scenes/splash.ts
var Splash = class extends Phaser.Scene {
  constructor() {
    super({ key: "splash" });
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "smokeLayer");
    __publicField(this, "step");
    __publicField(this, "theme");
    __publicField(this, "space");
  }
  /*
     This creates the elements of the Splash screen.
   */
  create() {
    this.width = +this.sys.game.config.width;
    this.height = +this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.cameras.main.setBackgroundColor(0);
    this.smokeLayer = this.add.layer();
    this.showTitle();
    this.time.delayedCall(1e3, () => this.showInstructions(), void 0, this);
    this.input.keyboard?.on("keydown-SPACE", () => this.startGame(), this);
    this.playMusic();
  }
  /*
   The title of the game is created with a delay between each letter, and the smoke effect is created simulating footsteps on the red planet.
   */
  showTitle() {
    this.step = this.sound.add("step");
    "MARSTRANDED".split("").forEach((letter, i) => {
      this.time.delayedCall(
        600 * (i + 1),
        () => {
          let text = this.add.bitmapText(70 * i + 50, 200, "pico", letter, 70).setTint(7017483).setOrigin(0.5).setDropShadow(0, 4, 7024682, 0.9);
          Array(Phaser.Math.Between(2, 4)).fill(0).forEach((j) => {
            this.smokeLayer.add(
              new ShotSmoke(
                this,
                70 * i + 80 + Phaser.Math.Between(-30, 30),
                200 + Phaser.Math.Between(-30, 30),
                0,
                -1,
                7024682
              )
            );
          });
          this.step.play({ rate: 0.8 });
          this.step.resume();
        },
        void 0,
        this
      );
    });
  }
  /*
   This method is called when the player presses the space bar to start the game. It stops the music and starts the transition to the game.
   */
  startGame() {
    if (this.theme) this.theme.stop();
    this.sound.add("blip").play();
    this.scene.start("transition", {
      next: "game",
      name: "STAGE",
      number: 0,
      time: 30
    });
  }
  /*
   We add some background sound instead of music, but it's a sound file looped after all.
   */
  playMusic(theme = "mars_background") {
    this.theme = this.sound.add(theme);
    this.theme.stop();
    this.theme.play({
      mute: false,
      volume: 2,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    });
  }
  /*
   Below the title, we show the instructions to start the game and the author's name.
   */
  showInstructions() {
    this.add.bitmapText(this.center_width, 450, "pico", "WASD/Arrows", 40).setTint(7017483).setOrigin(0.5).setDropShadow(0, 3, 7024682, 0.9);
    this.add.sprite(this.center_width - 140, 355, "pello").setOrigin(0.5).setScale(0.5);
    this.add.bitmapText(this.center_width + 60, 350, "pico", "By PELLO", 35).setTint(7017483).setOrigin(0.5).setDropShadow(0, 3, 7024682, 0.9);
    this.space = this.add.bitmapText(this.center_width, 520, "pico", "SPACE start", 30).setTint(7017483).setOrigin(0.5).setDropShadow(0, 2, 7024682, 0.9);
    this.tweens.add({
      targets: this.space,
      duration: 300,
      alpha: { from: 0, to: 1 },
      repeat: -1,
      yoyo: true
    });
  }
};

// games/mars/scenes/transition.ts
var Transition = class extends Phaser.Scene {
  constructor() {
    super({ key: "transition" });
    __publicField(this, "number");
    __publicField(this, "missions");
    __publicField(this, "utils");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "text1");
    __publicField(this, "text2");
    __publicField(this, "text3");
    __publicField(this, "play");
    __publicField(this, "theme");
    __publicField(this, "recording");
    __publicField(this, "creepy");
    __publicField(this, "wave");
  }
  init(data) {
    this.number = data.number;
  }
  /*
     We create the elements of the transitions. We have to add the sound of the diary, the creepy sound, and the mission objective.
   */
  create() {
    this.missions = [
      "",
      "Go north, locate containers.",
      "Find landing zone. North East.",
      "Locate landing, South East.",
      "Go East, locate containers.",
      "Other landings: North East",
      "Find out ship origin..."
    ];
    this.utils = new Utils(this);
    this.width = +this.sys.game.config.width;
    this.height = +this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.add.tileSprite(0, 0, 800, 600, "landscape").setOrigin(0);
    if (this.number === 7) {
      this.scene.start("outro", { number: this.number });
    } else {
      this.sound.stopAll();
    }
    this.showInstructions();
    this.input.keyboard?.on("keydown-ENTER", () => this.loadNext(), this);
    this.input.keyboard?.on("keydown-SPACE", () => this.loadNext(), this);
  }
  /*
     This is the method that will show the instructions for the next scene. It will show the day, the audio record of the captain, and the mission objective.
   */
  showInstructions() {
    const listOfDays = Array(8).fill(0).map((_, i) => `DAY ${i}`);
    this.text1 = this.add.bitmapText(this.center_width, 20, "pico", listOfDays[this.number], 30).setOrigin(0.5).setAlpha(0);
    this.text2 = this.add.bitmapText(
      this.center_width,
      70,
      "pico",
      "AUDIO RECORD OF CAPTAIN BRAUN",
      20
    ).setOrigin(0.5).setAlpha(0);
    if (this.number > 0) {
      this.showSceneInstructions();
    } else {
      this.showFirstInstructions();
    }
  }
  /*
     The next methods are used to show the instructions for the next scene. In the case of the first screen, it adds some extra effects.
   */
  showSceneInstructions() {
    this.tweens.add({
      targets: [this.text1, this.text2, this.play],
      duration: 1e3,
      alpha: { from: 0, to: 1 },
      onComplete: () => {
        this.playDiary();
      }
    });
  }
  showFirstInstructions() {
    this.playBackground();
    this.text2 = this.add.bitmapText(this.center_width, 70, "pico", "THE CRASH", 20).setOrigin(0.5).setAlpha(0);
    this.playCreepy();
    this.tweens.add({
      targets: [this.text1],
      duration: 2e3,
      alpha: { from: 0, to: 1 },
      onComplete: () => {
        this.playIntro();
      }
    });
  }
  /*
     This is the function that will show the intro of the game. It's a text that will be typed on the screen.
   */
  playIntro() {
    const text = "YOU JUST CRASHED ON MARS\nYOU ARE ALIVE BUT YOUR\nSHIP IS COMPLETELY LOST\nIF YOU WANT TO LIVE YOU\nMUST FIND LANDING REMAINS\nTRY GOING EAST...";
    this.utils.typeText(text, "pico", this.center_width, 150, 16777215, 20);
  }
  /*
     This is the background sound of the transition. It's a looped sound.
   */
  playBackground() {
    const theme = "mars_background";
    this.theme = this.sound.add(theme);
    this.theme.stop();
    this.theme.play({
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    });
  }
  /*
     This is the audio record of the captain. It will be played along with an animation of a sound wave (not tied to the sound itself, but to the time of the animation).
   */
  playDiary() {
    this.wave = this.add.sprite(this.center_width, 200, "wave").setOrigin(0.5);
    this.anims.create({
      key: "wave",
      frames: this.anims.generateFrameNumbers("wave", { start: 0, end: 4 }),
      frameRate: 20,
      repeat: -1
    });
    this.wave.anims.play("wave", true);
    this.recording = this.sound.add(`diary${this.number}`);
    this.recording.on(
      "complete",
      () => {
        this.wave.destroy();
        this.showMission();
        this.playCreepy();
      }
    );
    this.recording.play();
  }
  /*
       This will be used to play a specific creepy sound at the end. Probably we could reuse the `playBackground` method.
   */
  playCreepy() {
    this.creepy = this.sound.add("creepy");
    this.creepy.play({
      mute: false,
      volume: 0.9,
      rate: 0.9,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    });
  }
  /*
     This is the mission objective. It will be shown on the screen.
   */
  showMission() {
    this.text3 = this.add.bitmapText(this.center_width, 300, "pico", "MISSION OBJECTIVE:", 30).setOrigin(0.5);
    this.utils.typeText(
      this.missions[this.number],
      "pico",
      this.center_width,
      400,
      16777215,
      20
    );
  }
  /*
     When the transition information finishes or the user presses the space bar, we will start the next scene.
   */
  loadNext() {
    this.sound.add("blip").play();
    this.sound.stopAll();
    this.scene.start("game", { number: this.number });
  }
};

// games/mars/gameobjects/step.ts
var Step = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "step") {
    super(scene, x, y, "step", Phaser.Math.Between(0, 3));
    scene.add.existing(this);
    this.setOrigin(0);
    scene.tweens.add({
      targets: [this],
      duration: 2e3,
      alpha: { from: 1, to: 0.1 }
    });
  }
};

// games/mars/gameobjects/player.ts
var Player = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, oxygen = 100) {
    super(scene, x, y, "player");
    __publicField(this, "dead");
    __publicField(this, "shells");
    __publicField(this, "lastDirection");
    __publicField(this, "steps");
    __publicField(this, "stepDelta");
    __publicField(this, "moveDelta");
    __publicField(this, "rate");
    __publicField(this, "previousRate");
    __publicField(this, "oxygen");
    __publicField(this, "locked");
    __publicField(this, "cursor");
    __publicField(this, "W");
    __publicField(this, "A");
    __publicField(this, "S");
    __publicField(this, "D");
    this.setOrigin(0);
    this.setScale(1);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.dead = false;
    this.init();
    this.shells = 0;
    this.lastDirection = 0;
    this.steps = 0;
    this.stepDelta = 0;
    this.moveDelta = 0;
    this.rate = 0.2;
    this.previousRate = 0.2;
    this.oxygen = oxygen;
    this.locked = false;
  }
  /*
     Here we add the controls to the player and the events to update the player's position and breath.
   */
  init() {
    this.addControls();
    this.scene.events.on("update", this.update, this);
  }
  addControls() {
    this.cursor = this.scene.input.keyboard?.createCursorKeys() ?? (() => {
      throw "Failed to get keyboard input";
    })();
    this.W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }
  /*
     In the update function, we check the player's input and update the player's position and breath as always. But in this particular game, we move the player with a tween, so we have to check if the player is locked to avoid multiple movements at the same time.
   */
  update(_time, delta) {
    if (this.dead) return;
    if (this.locked) return;
    this.stepDelta += delta;
    this.moveDelta += delta;
    if ((Phaser.Input.Keyboard.JustDown(this.W) || Phaser.Input.Keyboard.JustDown(this.cursor.up)) && this.canMoveUp()) {
      this.moveDelta = 0;
      const { x, y } = this;
      this.locked = true;
      this.scene.tweens.add({
        targets: this,
        y: "-=64",
        duration: 200,
        onComplete: () => {
          this.locked = false;
        }
      });
      this.step(x, y);
    } else if ((Phaser.Input.Keyboard.JustDown(this.D) || Phaser.Input.Keyboard.JustDown(this.cursor.right)) && this.canMoveRight()) {
      this.moveDelta = 0;
      const { x, y } = this;
      this.locked = true;
      this.scene.tweens.add({
        targets: this,
        x: "+=64",
        duration: 200,
        onComplete: () => {
          this.locked = false;
        }
      });
      this.step(x, y);
    } else if ((Phaser.Input.Keyboard.JustDown(this.A) || Phaser.Input.Keyboard.JustDown(this.cursor.left)) && this.canMoveLeft()) {
      this.moveDelta = 0;
      const { x, y } = this;
      this.locked = true;
      this.scene.tweens.add({
        targets: this,
        x: "-=64",
        duration: 200,
        onComplete: () => {
          this.locked = false;
        }
      });
      this.step(x, y);
    } else if ((Phaser.Input.Keyboard.JustDown(this.S) || Phaser.Input.Keyboard.JustDown(this.cursor.down)) && this.canMoveDown()) {
      this.moveDelta = 0;
      const { x, y } = this;
      this.locked = true;
      this.scene.tweens.add({
        targets: this,
        y: "+=64",
        duration: 200,
        onComplete: () => {
          this.locked = false;
        }
      });
      this.step(x, y);
    }
    this.adaptBreath();
  }
  /*
  The next functions, lets us know if the player can move in a certain direction. We check if the tile in front of the player is empty and if the player has waited enough time to move again.
    */
  canMoveUp() {
    return !this.scene.platform.getTileAtWorldXY(this.x, this.y - 1) && this.moveDelta > 200;
  }
  canMoveRight() {
    return !this.scene.platform.getTileAtWorldXY(this.x + 64, this.y) && this.moveDelta > 200;
  }
  canMoveDown() {
    return !this.scene.platform.getTileAtWorldXY(this.x, this.y + 64) && this.moveDelta > 200;
  }
  canMoveLeft() {
    return !this.scene.platform.getTileAtWorldXY(this.x - 1, this.y) && this.moveDelta > 200;
  }
  /*
     This function adds a step to the player and creates a new step sprite in the scene. It also plays a random sound to simulate the player's steps.
   */
  step(x, y) {
    this.steps++;
    this.scene.smokeLayer.add(new Step(this.scene, x, y));
    this.scene.playRandom("step", 1);
  }
  /*
     This is another important function to add some tension. It adapts the breath of the player depending on the steps he has taken. Depending on the step rate, the player will breath faster or slower. If the player has not taken any steps, the player will breath normally. The player will also consume oxygen depending on the steps he has taken.
   */
  adaptBreath() {
    if (this.stepDelta > 2e3) {
      if (this.steps > 2) {
        this.previousRate = this.rate;
        this.rate = this.steps < 11 ? this.steps / 10 : 1;
        this.scene.breath(this.rate);
        this.updateOxygen(this.steps + Math.round(this.steps / 2));
      } else if (this.rate !== this.previousRate) {
        this.previousRate = this.rate;
        this.rate = this.rate > 0.2 ? this.rate - 0.1 : 0.2;
        this.scene.breath(this.rate);
        this.updateOxygen(this.steps);
      } else {
        this.updateOxygen(this.steps);
      }
      this.steps = this.stepDelta = 0;
    }
  }
  /*
     As the player moves, he will consume oxygen. If the player runs out of oxygen, he will die.
   */
  updateOxygen(waste) {
    if (waste >= this.oxygen) {
      this.oxygen = 0;
      this.death();
    } else {
      this.oxygen -= waste;
    }
    this.scene.updateOxygen();
  }
  /*
     This function will be called when the player dies. It will stop the player's body and restart the scene.
   */
  death() {
    this.dead = true;
    this.body.stop();
    this.body.enable = false;
    this.scene.restartScene();
  }
};

// games/mars/gameobjects/hole.ts
var Hole = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "hole");
    this.name = "hole";
    this.setOrigin(0);
    this.setAlpha(0);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
  }
};

// games/mars/gameobjects/braun.ts
var Braun = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "body");
    this.name = "body";
    this.setOrigin(0);
    this.rotation = 1.6;
    scene.add.existing(this);
  }
};

// games/mars/gameobjects/object.ts
var Object2 = class extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, type, description, extra = "") {
    super(scene, x, y, 64 * 3, 64 * 3);
    __publicField(this, "description");
    __publicField(this, "extra");
    __publicField(this, "activated");
    __publicField(this, "officerAudio");
    this.setOrigin(0);
    this.type = type;
    this.description = description;
    this.extra = extra;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.activated = false;
  }
  /*
     This function decides what to do when the player touches the object, depending on its type.
     */
  touch() {
    switch (this.type) {
      case "note":
        this.showNote(this.description);
        break;
      case "radio":
        this.useRadio();
        break;
      case "exit":
        this.exitScene();
        break;
      case "hole":
        this.activateHole();
        break;
      case "oxygen":
        this.useOxygen();
        break;
      case "braun":
        this.activateBraun();
        break;
      case "ending":
        this.revealEnding();
        break;
      default:
        break;
    }
  }
  /*
     This will show a text on the screen.
   */
  showNote(note) {
    const objectText = this.scene.add.bitmapText(
      this.x,
      this.y,
      "pico",
      note,
      15
    );
    this.scene.tweens.add({
      targets: objectText,
      alpha: { from: 1, to: 0 },
      duration: 6e3,
      ease: "Sine",
      onComplete: () => {
        objectText.destroy();
      }
    });
  }
  /*
  This is also a text that is shown when the player reaches the exit.
    */
  showExit(note) {
    const objectText = this.scene.add.bitmapText(
      this.x - 128,
      this.y - 64,
      "pico",
      note,
      25
    );
    this.scene.tweens.add({
      targets: objectText,
      alpha: { from: 0.8, to: 1 },
      duration: 100,
      repeat: 5
    });
  }
  /*
  This function will play a random static sound:
    */
  useRadio() {
    this.officerAudio = this.scene.sound.add(this.description);
    this.officerAudio.play();
    this.officerAudio.on(
      "complete",
      () => {
        this.scene.playRandomStatic();
        if (this.extra) this.scene.sound.add(this.extra).play();
      }
    );
  }
  /*
  When the player reaches the exit, we need to do a few things: show the exit message, play the static sound and finish the scene.
    */
  exitScene() {
    this.showExit(this.description);
    this.showNote(this.extra);
    this.scene.finishScene();
  }
  /*
  Anytime the player touches the oxygen supplies, we need to show a message and refill the oxygen.
    */
  useOxygen() {
    this.showNote("Oxygen supplies!");
    if (this.scene.player) this.scene.player.oxygen = 100;
    this.scene.updateOxygen();
    this.scene.playAudio("oxygen");
  }
  /*
  Well, well... you can guess what happens here, right?
    */
  revealEnding() {
    const ohmy = this.scene.sound.add("ohmygod");
    ohmy.play();
    this.scene.cameras.main.shake(1e4);
    this.showExit(this.description);
    this.scene.sound.add("monster").play({ volume: 1.5, rate: 0.8 });
    const monster = this.scene.add.sprite(this.x + 128, this.y + 128, "monster").setOrigin(0.5);
    this.scene.anims.create({
      key: "monster",
      frames: this.scene.anims.generateFrameNumbers("monster", {
        start: 0,
        end: 5
      }),
      frameRate: 3
    });
    monster.anims.play("monster", true);
    ohmy.on(
      "complete",
      () => {
        this.scene.breathing.pause();
        this.scene.playAudio("holeshout");
        this.scene.finishScene(false);
      }
    );
  }
  /*
  When the player touches the hole, we need to create a new hole in the scene, and the player will die.
    */
  activateHole() {
    this.scene.holes.add(new Hole(this.scene, this.x + 64, this.y + 64));
  }
  /*
  So, when the player reaches a certain point, we need to activate "Braun".
    */
  activateBraun() {
    this.showExit(this.description);
    this.scene.playAudio("shock");
    new Braun(this.scene, this.x + 128, this.y + 64);
  }
};

// games/mars/gameobjects/drone.ts
import EasyStar from "https://esm.sh/easystarjs@0.4.4/es2022/easystarjs.mjs";
var Drone = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, grid) {
    super(scene, x, y, "drone");
    __publicField(this, "easystar");
    __publicField(this, "path");
    __publicField(this, "grid");
    __publicField(this, "direction");
    __publicField(this, "delayedMove");
    __publicField(this, "moveTimeline");
    __publicField(this, "i");
    this.name = "drone";
    this.setScale(1);
    this.grid = grid;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.easystar = new EasyStar.js();
    this.init();
  }
  /*
   Here we have to pay attention to the fact that we are using the EasyStar library to calculate the path of the drone: we have to set the grid and the acceptable tiles for the pathfinding algorithm. We also have to set the animation of the drone and the event that will trigger the movement of the drone. When it starts moving it will also reproduce the sound of the drone.
   */
  init() {
    this.easystar.setGrid(this.grid);
    this.easystar.setAcceptableTiles([0]);
    this.scene.events.on("update", this.update, this);
    this.scene.tweens.add({
      targets: this,
      duration: 500,
      repeat: -1,
      scale: { from: 0.95, to: 1 },
      yoyo: true
    });
    this.scene.anims.create({
      key: this.name,
      frames: this.scene.anims.generateFrameNumbers(this.name, {
        start: 0,
        end: 3
      }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.play(this.name, true);
    this.flipX = this.direction < 0;
    this.scene.time.delayedCall(
      Phaser.Math.Between(3e3, 5e3),
      () => {
        this.scene.playAudio("kill");
        this.launchMove();
      },
      void 0,
      this
    );
  }
  /*
     This starts the movement of the drone:
   */
  launchMove() {
    if (!this.scene) return;
    this.delayedMove = this.scene.time.addEvent({
      delay: 2e3,
      // ms
      callback: this.move.bind(this),
      startAt: 0,
      callbackScope: this,
      loop: true
    });
  }
  /*
     This function uses EasyStar to calculate the path and then we will call a function to move the drone.
   */
  move() {
    try {
      if (!this.scene.player) return;
      if (this.moveTimeline) this.moveTimeline.destroy();
      this.easystar.findPath(
        Math.floor(this.x / 64),
        Math.floor(this.y / 64),
        Math.floor(this.scene.player.x / 64),
        Math.floor(this.scene.player.y / 64),
        this.moveIt.bind(this)
      );
      this.easystar.setIterationsPerCalculation(1e4);
      this.easystar.enableSync();
      this.easystar.calculate();
    } catch (err) {
      console.log("Cant move yet: ", err);
    }
  }
  /*
   And finally, this function will move the drone to the calculated path. At the end of the path, it will call the launchMove function again, so the drone can recalculate the path even if the player changes her position.
   */
  moveIt(path) {
    if (path === null) {
      console.log("hello sneaky pete");
    } else {
      const tweens = [];
      this.i = 0;
      this.path = path;
      for (let i = 0; i < path.length - 1; i++) {
        if (this.scene.player?.dead) return;
        const ex = path[i + 1].x * 64;
        const ey = path[i + 1].y * 64;
        tweens.push({
          tween: {
            targets: this,
            duration: 400,
            x: ex,
            y: ey
          }
        });
      }
      this.moveTimeline = this.scene.add.timeline(tweens).addListener(
        "onComplete",
        () => {
          this.delayedMove?.remove();
          if (this.alpha > 0 && !this.scene.player?.dead) this.launchMove();
        }
      );
    }
  }
};

// games/mars/scenes/game.ts
var Game = class extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    __publicField(this, "player");
    __publicField(this, "score");
    __publicField(this, "scoreText");
    __publicField(this, "name");
    __publicField(this, "number");
    __publicField(this, "backgroundColors");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "smokeLayer");
    __publicField(this, "oxygenBar");
    __publicField(this, "dayText");
    __publicField(this, "playerLight");
    __publicField(this, "tileMap");
    __publicField(this, "tileSetBg");
    __publicField(this, "tileSet");
    __publicField(this, "platform");
    __publicField(this, "border");
    __publicField(this, "objectsLayer");
    __publicField(this, "holes");
    __publicField(this, "foes");
    __publicField(this, "objects");
    __publicField(this, "grid");
    __publicField(this, "trailLayer");
    __publicField(this, "audios");
    __publicField(this, "tracker");
    __publicField(this, "theme");
    __publicField(this, "breathing");
    __publicField(this, "mute");
    __publicField(this, "fadeBlack");
    __publicField(this, "failure");
    this.player = null;
    this.score = 0;
    this.scoreText = null;
  }
  init(data) {
    this.name = data.name;
    this.number = data.number;
  }
  /*
   This creates the elements of the game. The background colors are relevant because they are used to set a darker color as the game progresses.
   */
  create() {
    this.backgroundColors = [
      11411474,
      9837584,
      5247498,
      4198922,
      3150346,
      3084810,
      0
    ];
    this.width = +this.sys.game.config.width;
    this.height = +this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.cameras.main.setBackgroundColor(this.backgroundColors[this.number]);
    this.addLight();
    this.createMap();
    this.smokeLayer = this.add.layer();
    this.addPlayer();
    this.addOxygen();
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05, 0, 0);
    this.loadAudios();
    this.addEffects();
    this.playMusic();
  }
  /*
  The oxygen bar is the only UI element in the game. It's a rectangle that changes its width according to the player's oxygen level.
    */
  addOxygen() {
    this.oxygenBar = this.add.rectangle(this.center_width, 40, this.player.oxygen * 1.8, 20, 7017483).setOrigin(0.5).setScrollFactor(0);
  }
  /*
  This is the method that will add the post-processing effects to the game. The game uses the HorrifiPostFx plugin, which is a custom plugin that adds a horror effect to the game.
    */
  addEffects() {
  }
  /*
  This method will add the day text to the game. It is not used in the final version of the game, but maybe it could be useful for a future version.
    */
  addDay() {
    this.dayText = this.add.bitmapText(20, 10, "pico", "Day " + (this.number + 1), 20).setTint(7017483).setOrigin(0).setScrollFactor(0).setDropShadow(0, 2, 7024682, 0.9);
  }
  /*
  We have this method to add the light system to the game. But it's not used in the final version of the game. It could be useful for the last scene though. You can check the Camp Night game to see how it's used.
    */
  addLight() {
    this.lights.disable();
    this.lights.setAmbientColor(11411474);
    this.playerLight = this.lights.addLight(0, 100, 100).setColor(16777215).setIntensity(3);
  }
  /*
  This game uses also tiled maps: with a main layer, a border layer, and an objects layer. The main layer is the one where the player can walk and it will have some obstacles. The objects layer is used to add the objects to the game, like the oxygen tanks and the holes
    */
  createMap() {
    this.tileMap = this.make.tilemap({
      key: "scene" + this.number,
      tileWidth: 64,
      tileHeight: 64
    });
    this.tileSetBg = this.tileMap.addTilesetImage("mars") ?? (() => {
      throw "Failed to load tileset image";
    })();
    this.tileSet = this.tileMap.addTilesetImage("mars") ?? (() => {
      throw "Failed to load tileset image";
    })();
    this.platform = this.tileMap.createLayer(
      "scene" + this.number,
      this.tileSet
    );
    this.border = this.tileMap.createLayer("border", this.tileSet);
    this.objectsLayer = this.tileMap.getObjectLayer("objects");
    this.border.setCollisionByExclusion([-1]);
    this.platform.setCollisionByExclusion([-1]);
    this.holes = this.add.group();
    this.foes = this.add.group();
    this.objects = this.add.group();
    this.createGrid();
    this.addObjects();
  }
  /*
  This method will add the objects to the game:  we group most of them as "objects" and the drones as "foes". In the `Object` class, we will take care of treating the objects according to their type.
    */
  addObjects() {
    this.objectsLayer.objects.forEach((object) => {
      if (!object.x || !object.y) throw "Object missing required properties, x & y";
      if (object.name.startsWith("object")) {
        const [_name, type, description, extra] = object.name.split(":");
        this.objects.add(
          new Object2(this, object.x, object.y, type, description, extra)
        );
      }
      if (object.name.startsWith("drone")) {
        this.foes.add(new Drone(this, object.x, object.y, this.grid));
      }
    });
  }
  /*
  This method will create a grid of 40x40 cells. It will be used by the drones to move around the map.
    */
  createGrid() {
    this.grid = [];
    Array(40).fill(0).forEach((_, i) => {
      this.grid[i] = [];
      Array(40).fill(0).forEach((_2, j) => {
        const rock = this.platform.getTileAt(Math.floor(j), Math.floor(i));
        const wall = this.border.getTileAt(Math.floor(j), Math.floor(i));
        this.grid[i][j] = rock || wall ? 1 : 0;
      });
    });
  }
  /*
  Here we add the player element to the game. We also add the collisions between the player and the platform, the objects, the foes, and the holes.
    */
  addPlayer() {
    this.trailLayer = this.add.layer();
    const playerPosition = this.objectsLayer.objects.find(
      (object) => object.name === "player"
    );
    if (!playerPosition || !playerPosition.x || !playerPosition.y) throw "Unable to determine playerPosition";
    this.player = new Player(this, playerPosition.x, playerPosition.y);
    this.physics.add.collider(
      this.player,
      this.platform,
      this.hitFloor,
      () => {
        return true;
      },
      this
    );
    this.physics.add.overlap(
      this.player,
      this.objects,
      this.touchObject,
      () => {
        return true;
      },
      this
    );
    this.physics.add.overlap(
      this.player,
      this.foes,
      this.playerHitByFoe,
      () => {
        return true;
      },
      this
    );
    this.physics.add.overlap(
      this.player,
      this.holes,
      this.playerHitHole,
      () => {
        return true;
      },
      this
    );
  }
  hitFloor(player, platform) {
  }
  /*
  This is the method that will be called when the player touches an object. It will call the touch method of the object.
    */
  touchObject(player, object) {
    if (object.type === "hole") this.playTracker();
    if (!object.activated) {
      object.activated = true;
      object.touch();
    }
  }
  /*
  If the player is hit by a foe (drone), it will die and the scene will restart.
    */
  playerHitByFoe(player, foe) {
    this.cameras.main.shake(100);
    this.playAudio("killed");
    player.death();
    this.restartScene();
  }
  /*
  When the player hits the hole, it will die and the scene will restart.
    */
  playerHitHole(player, hole) {
    if (!player.dead) {
      this.playAudio("holeshout");
      hole.setAlpha(1);
      player.setAlpha(0);
      this.cameras.main.shake(50);
      player.death();
      this.restartScene();
    }
  }
  /*
  This is the function that loads the audio files. The tracker has a special treatment because it will be played in a loop when the player is close to a hole.
    */
  loadAudios() {
    this.audios = {
      mars_background: this.sound.add("mars_background"),
      step: this.sound.add("step"),
      kill: this.sound.add("kill"),
      blip: this.sound.add("blip"),
      ohmygod: this.sound.add("ohmygod"),
      holeshout: this.sound.add("holeshout"),
      oxygen: this.sound.add("oxygen"),
      shock: this.sound.add("shock"),
      killed: this.sound.add("killed")
    };
    this.tracker = this.sound.add("tracker");
  }
  playTracker() {
    if (!this.tracker.isPlaying) this.tracker.play();
  }
  /*
  We will use this function to play static sound files (4 different files) adding some variations to the rate, delay, and volume:
    */
  playRandomStatic() {
    const file = this.number < 6 ? "static" + Phaser.Math.Between(0, 3) : "creepy_static";
    this.sound.add(file).play({
      rate: Phaser.Math.Between(9, 11) / 10,
      delay: 0,
      volume: Phaser.Math.Between(5, 10) / 10
    });
  }
  /*
  These are the functions to play the sounds, normally or with some random variations.
    */
  playAudio(key) {
    this.audios[key].play();
  }
  playRandom(key, volume = 1) {
    this.audios[key].play({
      rate: Phaser.Math.Between(0.9, 1),
      detune: Phaser.Math.Between(-500, 500),
      delay: 0,
      volume
    });
  }
  /*
  This function will be used to play the officer's messages. It will play a specific sound file according to the number of the scene.
    */
  playOfficer() {
    this.sound.add(`officer${this.number}`).play();
  }
  /*
  Here we play several sounds at the same time: the background sound, the creepy sound. It also starts the breathing sound.
    */
  playMusic() {
    const theme = this.number < 6 ? "mars_background" : "cave";
    this.theme = this.sound.add(theme);
    this.theme.stop();
    this.theme.play({
      mute: false,
      volume: 1.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    });
    this.sound.add("creepy").play({
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    });
    this.breathing = this.sound.add("breath");
    this.breath(0.2);
  }
  /*
   This function will be used to play the breathing sound. It will be called with a specific rate and volume. In the end, it will be restarted again.
     */
  breath(rate = 0.2, volume = 0.4) {
    const duration = Phaser.Math.Between(500, 1e3);
    this.tweens.add({
      targets: this.breathing,
      volume: 0,
      duration,
      onComplete: () => {
        this.breathing.play({ rate, volume });
      }
    });
  }
  /*
  If the player dies, the scene will restart. We show a failure message and a black rectangle that will fade in.
    */
  restartScene() {
    const x = this.cameras.main.worldView.centerX;
    const y = this.cameras.main.worldView.centerY;
    this.fadeBlack = this.add.rectangle(x - 100, y - 50, 1e4, 11e3, 0).setOrigin(0.5);
    this.failure = this.add.bitmapText(x, y, "pico", "FAILURE", 40).setTint(7017483).setOrigin(0.5).setDropShadow(0, 2, 7024682, 0.9);
    this.tweens.add({
      targets: [this.failure, this.fadeBlack],
      alpha: { from: 0, to: 1 },
      duration: 2e3
    });
    this.time.delayedCall(
      3e3,
      () => {
        this.sound.stopAll();
        this.scene.start("transition", { number: this.number });
      },
      void 0,
      this
    );
  }
  /*
  If the player reaches the exit object, we finish the scene. We disable the player, play a sound, and show a black rectangle that will fade in.
    */
  finishScene(mute = true) {
    const x = this.cameras.main.worldView.centerX;
    const y = this.cameras.main.worldView.centerY;
    this.fadeBlack = this.add.rectangle(x - 100, y - 50, 2e3, 2e3, 0).setOrigin(0.5);
    this.tweens.add({
      targets: [this.fadeBlack],
      alpha: { from: 0, to: 1 },
      duration: 3e3
    });
    if (this.player) this.player.dead = true;
    this.player?.body.stop();
    if (this.mute) this.sound.add("blip").play();
    this.time.delayedCall(
      3e3,
      () => {
        if (this.mute) this.sound.stopAll();
        this.scene.start("transition", {
          next: "underwater",
          name: "STAGE",
          number: this.number + 1
        });
      },
      void 0,
      this
    );
  }
  /*
  This function will update the oxygen bar as the player moves.
    */
  updateOxygen() {
    if (this.player)
      this.oxygenBar.width = this.player.oxygen * 1.8;
  }
  /*
   We have this function to skip the scene. It will be used for testing purposes.
     */
  skipThis() {
    if (this.player) this.player.dead = true;
    this.player?.body.stop();
    this.theme.stop();
    this.scene.start("transition", { number: this.number + 1 });
  }
};

// games/mars/main.ts
var config = {
  width: 800,
  height: 800,
  scale: {
    mode: Phaser2.Scale.FIT,
    autoCenter: Phaser2.Scale.CENTER_BOTH
  },
  autoRound: false,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: false
    }
  },
  plugins: {},
  scene: [Bootloader, Splash, Transition, Game, Outro]
};
var game = new Phaser2.Game(config);
//# sourceMappingURL=main.js.map
