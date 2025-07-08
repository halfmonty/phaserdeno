var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// games/starshake/main.ts
import Phaser2 from "https://esm.sh/phaser@4.0.0-rc.4";

// games/starshake/scenes/boodloader.ts
var Bootloader = class extends Phaser.Scene {
  constructor() {
    super({ key: "bootloader" });
    __publicField(this, "progressBar");
    __publicField(this, "loadBar");
  }
  /*
    Here we split the loading of the assets into different functions.
    */
  preload() {
    this.createBars();
    this.setLoadEvents();
    this.loadFonts();
    this.loadImages();
    this.loadAudios();
    this.loadSpritesheets();
    this.setRegistry();
  }
  /*
    These are the events we need to control the loading bar and change to splash scene when complete.
    */
  setLoadEvents() {
    this.load.on(
      "progress",
      function(value) {
        this.progressBar.clear();
        this.progressBar.fillStyle(34986, 1);
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
    Load the fonts we use in the game.
    */
  loadFonts() {
    this.load.bitmapFont(
      "wendy",
      "assets/starshake/fonts/wendy.png",
      "assets/starshake/fonts/wendy.xml"
    );
  }
  /*
    Load the images we use in the game.
    */
  loadImages() {
    this.load.image("logo", "assets/starshake/images/logo.png");
    this.load.image("pello_logo", "assets/starshake/images/pello_logo.png");
    this.load.image("background", "assets/starshake/images/background.png");
    Array(4).fill(0).forEach((_, i) => {
      this.load.image(`stage${i + 1}`, `assets/starshake/images/stage${i + 1}.png`);
    });
  }
  /*
    Load the audio (sound effects and music) we use in the game.
    */
  loadAudios() {
    this.load.audio("shot", "assets/starshake/sounds/shot.mp3");
    this.load.audio("foeshot", "assets/starshake/sounds/foeshot.mp3");
    this.load.audio("foedestroy", "assets/starshake/sounds/foedestroy.mp3");
    this.load.audio("foexplosion", "assets/starshake/sounds/foexplosion.mp3");
    this.load.audio("explosion", "assets/starshake/sounds/explosion.mp3");
    this.load.audio("stageclear1", "assets/starshake/sounds/stageclear1.mp3");
    this.load.audio("stageclear2", "assets/starshake/sounds/stageclear2.mp3");
    this.load.audio("boss", "assets/starshake/sounds/boss.mp3");
    this.load.audio("splash", "assets/starshake/sounds/splash.mp3");
    Array(3).fill(0).forEach((_, i) => {
      this.load.audio(`music${i + 1}`, `assets/starshake/sounds/music${i + 1}.mp3`);
    });
  }
  /*
    Load the sprite sheets (animated images) we use in the game.
    */
  loadSpritesheets() {
    this.load.spritesheet("player1", "assets/starshake/images/player1.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("foe0", "assets/starshake/images/foe0.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("foe1", "assets/starshake/images/foe1.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("foe2", "assets/starshake/images/foe2.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("guinxu", "assets/starshake/images/guinxu.png", {
      frameWidth: 128,
      frameHeight: 144
    });
    this.load.spritesheet("plenny0", "assets/starshake/images/plenny0.png", {
      frameWidth: 64,
      frameHeight: 64
    });
  }
  /*
    Set the initial values of the registry. The game was designed to be played by two players, but it can be played by one.
    */
  setRegistry() {
    this.registry.set("score_player1", 0);
    this.registry.set("power_player1", "water");
    this.registry.set("lives_player1", 0);
    this.registry.set("score_player2", 0);
    this.registry.set("power_player2", "water");
    this.registry.set("lives_player2", 0);
  }
  /*
    Create the bars we use to show the loading progress.
    */
  createBars() {
    this.loadBar = this.add.graphics();
    this.loadBar.fillStyle(13893632, 1);
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
};

// games/starshake/gameobjects/foe_shot.ts
var TYPES = {
  chocolate: { color: 11501655, radius: 16, intensity: 0.4 },
  vanila: { color: 16774869, radius: 16, intensity: 0.4 },
  fruit: { color: 65280, radius: 16, intensity: 0.4 },
  water: { color: 204, radius: 16, intensity: 0.4 },
  foe: { color: 16773151, radius: 16, intensity: 0.4 }
};
var FoeShot = class extends Phaser.GameObjects.PointLight {
  constructor(scene, x, y, type = "water", playerName, velocityX = 0, velocityY = -300) {
    const { color, radius, intensity } = TYPES[type];
    super(scene, x, y, color, radius, intensity);
    __publicField(this, "playerName");
    __publicField(this, "shadow");
    this.name = "foeshot";
    this.scene = scene;
    this.playerName = playerName;
    this.spawnShadow(x, y, velocityX, velocityY);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    if (playerName === "guinxu") this.body.setVelocity(velocityX, velocityY);
    this.body.setAllowGravity(false);
    this.body.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.body.setCircle(10);
    this.body.setOffset(6, 9);
    this.init();
  }
  /*
    This function spawns a shadow for each shot. We'll have to update it with the shot itself.
    */
  spawnShadow(x, y, velocityX, velocityY) {
    this.shadow = this.scene.add.circle(x + 20, y + 20, 10, 0).setAlpha(0.4);
    this.scene.add.existing(this.shadow);
    this.scene.physics.add.existing(this.shadow);
    if (this.playerName === "guinxu")
      this.shadow.body?.setVelocity(velocityX, velocityY);
  }
  /*
    This function adds a simple effect to the shot to make it flicker.
    */
  init() {
    this.scene.tweens.add({
      targets: this,
      duration: 200,
      intensity: { from: 0.3, to: 0.7 },
      repeat: -1
    });
  }
  /*
    This function is called when the shot is destroyed, adding an explosion effect along with a tween and showing the points.
    */
  shot() {
    const explosion = this.scene.add.circle(this.x, this.y, 5).setStrokeStyle(10, 16777215);
    this.showPoints(50);
    this.scene.tweens.add({
      targets: explosion,
      radius: { from: 5, to: 20 },
      alpha: { from: 1, to: 0 },
      duration: 250,
      onComplete: () => {
        explosion.destroy();
      }
    });
    this.destroy();
  }
  /*
    This function shows the points when the shot is destroyed. The points are shown in a bitmap text and they are tweened to make them move up and fade out.
    */
  showPoints(score, color = 16711680) {
    let text = this.scene.add.bitmapText(this.x + 20, this.y - 30, "wendy", "+" + score, 40, color).setOrigin(0.5);
    this.scene.tweens.add({
      targets: text,
      duration: 800,
      alpha: { from: 1, to: 0 },
      y: { from: this.y - 20, to: this.y - 80 },
      onComplete: () => {
        text.destroy();
      }
    });
  }
};
var foe_shot_default = FoeShot;

// games/starshake/gameobjects/explosion.ts
var Explosion = class {
  constructor(scene, x, y, radius = 5, min = 5, max = 7) {
    __publicField(this, "scene");
    __publicField(this, "radius");
    __publicField(this, "x");
    __publicField(this, "y");
    __publicField(this, "lights");
    this.scene = scene;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.lights = Array(Phaser.Math.Between(min, max)).fill(0).map((_, _i) => {
      const offsetX = this.x + Phaser.Math.Between(-this.radius / 2, this.radius / 2);
      const offsetY = this.y + Phaser.Math.Between(-this.radius / 2, -this.radius / 2);
      const color = Phaser.Math.Between(16711680, 16777164);
      const radius2 = Phaser.Math.Between(this.radius / 2, this.radius);
      const intensity = Phaser.Math.Between(0.3, 0.8);
      return scene.lights.addPointLight(
        offsetX,
        offsetY,
        color,
        radius2,
        intensity
      );
    });
    this.init();
  }
  /*
    This adds a simple effect to the explosion to shrink the lights.
    */
  init() {
    this.scene.tweens.add({
      targets: this.lights,
      duration: Phaser.Math.Between(600, 1e3),
      scale: { from: 1, to: 0 }
    });
  }
};
var explosion_default = Explosion;

// games/starshake/gameobjects/foe.ts
var TYPES2 = {
  foe0: { points: 400, lives: 1 },
  foe1: { points: 500, lives: 3 },
  foe2: { points: 800, lives: 2 },
  guinxu: { points: 1e4, lives: 20 }
};
var Foe = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "foe0", velocityX = 0, velocityY = 0) {
    super(scene, x, y, name);
    __publicField(this, "shadow");
    __publicField(this, "points");
    __publicField(this, "lives");
    __publicField(this, "id");
    __publicField(this, "patternIndex");
    __publicField(this, "pattern");
    __publicField(this, "direction");
    this.name = name;
    this.points = TYPES2[name].points;
    this.lives = TYPES2[name].lives;
    this.id = Math.random();
    if (this.name !== "foe2") {
      this.spawnShadow(x, y);
    }
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.body.setCircle(19);
    this.body.setOffset(12, 12);
    this.body.setVelocityX(velocityX);
    this.body.setVelocityY(velocityY);
    this.setData("vector", new Phaser.Math.Vector2());
    if (this.name === "guinxu") {
      this.setGuinxuShot();
    }
    this.init();
  }
  /*
    This function sets a tween to the Guinxu foe, so it moves in a zig-zag pattern.
    */
  setGuinxuShot() {
    this.patternIndex = 0;
    this.pattern = Phaser.Utils.Array.NumberArrayStep(-300, 300, 50);
    this.pattern = this.pattern.concat(
      Phaser.Utils.Array.NumberArrayStep(300, -300, -50)
    );
    this.scene.tweens.add({
      targets: this,
      duration: 2e3,
      y: { from: this.y, to: this.y + Phaser.Math.Between(100, -100) },
      x: { from: this.x, to: this.x + Phaser.Math.Between(100, -100) },
      yoyo: true,
      repeat: -1
    });
  }
  /*
    This function spawns a shadow for each foe. We'll have to update it with the foe itself.
    */
  spawnShadow(x, y) {
    this.shadow = this.scene.add.image(x + 20, y + 20, this.name).setScale(0.7).setTint(0).setAlpha(0.4);
  }
  updateShadow() {
    if (!this.shadow) return;
    this.shadow.x = this.x + 20;
    this.shadow.y = this.y + 20;
  }
  /*
    This function adds an animation to the foe.
    */
  init() {
    this.scene.anims.create({
      key: this.name,
      frames: this.scene.anims.generateFrameNumbers(this.name),
      frameRate: 10,
      repeat: -1
    });
    this.anims.play(this.name, true);
    this.direction = -1;
  }
  /*
    This function is called from the foe generation. It updates the foe position, checks if it's out of bounds and also updates its shadow.
    */
  update() {
    if (this.y > this.scene.height + 64) {
      if (this.name !== "foe2") this.shadow?.destroy();
      this.destroy();
    }
    if (this.name === "guinxu" && Phaser.Math.Between(1, 6) > 5) {
      this.guinxuShot();
    } else if (Phaser.Math.Between(1, 101) > 100) {
      if (!this.scene || !this.scene.player) return;
      this.scene.playAudio("foeshot");
      let shot = new foe_shot_default(this.scene, this.x, this.y, "foe", this.name);
      this.scene.foeShots.add(shot);
      this.scene.physics.moveTo(
        shot,
        this.scene.player.x,
        this.scene.player.y,
        300
      );
      this.scene.physics.moveTo(
        shot.shadow,
        this.scene.player.x,
        this.scene.player.y,
        300
      );
    }
    if (this.name !== "foe2") {
      this.updateShadow();
    }
  }
  /*
    This takes care of the shots generated by the final boss.
    */
  guinxuShot() {
    if (!this.scene || !this.scene.player) return;
    this.scene.playAudio("foeshot");
    const shot = new foe_shot_default(
      this.scene,
      this.x,
      this.y,
      "foe",
      this.name,
      this.pattern[this.patternIndex],
      300
    );
    this.scene.foeShots.add(shot);
    this.patternIndex = this.patternIndex + 1 === this.pattern.length ? 0 : ++this.patternIndex;
  }
  /*
    This function is called when the foe is destroyed, adding an explosion effect along with a tween and showing the points.
    */
  dead() {
    let radius = 60;
    let explosionRad = 20;
    if (this.name === "guinxu") {
      radius = 220;
      explosionRad = 220;
      this.scene.cameras.main.shake(500);
    }
    const explosion = this.scene.add.circle(this.x, this.y, 5).setStrokeStyle(20, 16777215);
    this.showPoints(this.points);
    this.scene.tweens.add({
      targets: explosion,
      radius: { from: 10, to: radius },
      alpha: { from: 1, to: 0.3 },
      duration: 250,
      onComplete: () => {
        explosion.destroy();
      }
    });
    new explosion_default(this.scene, this.x, this.y, explosionRad);
    if (this.name !== "foe2" && this.scene && this.scene.scene.isActive() && this.shadow && this.shadow.active)
      this.shadow.destroy();
    if (this.name === "guinxu") {
      this.scene.number = 5;
      this.scene.playAudio("explosion");
      this.scene.endScene();
    }
    this.destroy();
  }
  /*
    As we do when destroying shots, this function shows the points when a foe is destroyed with a simple tween effect.
    */
  showPoints(score, color = 16711680) {
    let text = this.scene.add.bitmapText(this.x + 20, this.y - 30, "wendy", "+" + score, 40, color).setOrigin(0.5);
    this.scene.tweens.add({
      targets: text,
      duration: 800,
      alpha: { from: 1, to: 0 },
      y: { from: this.y - 20, to: this.y - 80 },
      onComplete: () => {
        text.destroy();
      }
    });
  }
};
var foe_default = Foe;

// games/starshake/gameobjects/foe_generator.ts
var FoeGenerator = class {
  constructor(scene) {
    __publicField(this, "scene");
    __publicField(this, "waveFoes");
    __publicField(this, "activeWave");
    __publicField(this, "waves");
    __publicField(this, "generateEvent1");
    __publicField(this, "generateEvent2");
    __publicField(this, "generateEvent3");
    __publicField(this, "generateEvent4");
    __publicField(this, "laughterEvent");
    __publicField(this, "path");
    __publicField(this, "graphics");
    this.scene = scene;
    this.waveFoes = [];
    this.generate();
    this.activeWave = false;
    this.waves = 0;
  }
  /*
    This is the main function to generate foes. Depending on the scene number, it will generate different foes.
    */
  generate() {
    if (this.scene.number === 4) {
      this.scene.time.delayedCall(
        2e3,
        () => this.releaseGuinxu(),
        void 0,
        this
      );
    } else {
      this.generateEvent1 = this.scene.time.addEvent({
        delay: 7e3,
        callback: () => this.orderedWave(),
        callbackScope: this,
        loop: true
      });
      this.generateEvent2 = this.scene.time.addEvent({
        delay: 15e3,
        callback: () => this.wave(),
        callbackScope: this,
        loop: true
      });
      if (this.scene.number > 1)
        this.generateEvent3 = this.scene.time.addEvent({
          delay: 3e3,
          callback: () => this.tank(),
          callbackScope: this,
          loop: true
        });
      if (this.scene.number > 2)
        this.generateEvent4 = this.scene.time.addEvent({
          delay: 5e3,
          callback: () => this.slider(),
          callbackScope: this,
          loop: true
        });
    }
  }
  /*
  This is the function that generates the boss.
  */
  releaseGuinxu() {
    const guinxu = new foe_default(
      this.scene,
      Phaser.Math.Between(200, 600),
      200,
      "guinxu",
      0,
      20
    );
    this.scene.playAudio("boss");
    this.laughterEvent = this.scene.time.addEvent({
      delay: 1e4,
      callback: () => {
        this.scene.playAudio("boss");
      },
      callbackScope: this,
      loop: true
    });
    this.scene.tweens.add({
      targets: guinxu,
      alpha: { from: 0.3, to: 1 },
      duration: 200,
      repeat: 10
    });
    this.scene.foeGroup.add(guinxu);
  }
  /*
  This is the function that stops the generation of foes.
  */
  stop() {
    this.scene.foeGroup.children.forEach((foe) => {
      if (foe === null || !foe.active) return;
      foe.destroy();
    });
  }
  /*
  This is called when the scene is finished and it takes care of destroying the generation events.
  */
  finishScene() {
    this.generateEvent1.destroy();
    this.generateEvent2.destroy();
    if (this.scene.number > 1) this.generateEvent3.destroy();
    if (this.scene.number > 2) this.generateEvent4.destroy();
    this.scene.endScene();
  }
  /*
  This is the function that creates the path for the foes to follow in formation.
  */
  createPath() {
    this.waves++;
    if (this.waves === 3) this.finishScene();
    const start = Phaser.Math.Between(100, 600);
    this.path = new Phaser.Curves.Path(start, 0);
    this.path.lineTo(start, Phaser.Math.Between(20, 50));
    const max = 8;
    const h = 500 / max;
    for (let i = 0; i < max; i++) {
      if (i % 2 === 0) {
        this.path.lineTo(start, 50 + h * (i + 1));
      } else {
        this.path.lineTo(start + 300, 50 + h * (i + 1));
      }
    }
    this.path.lineTo(start, this.scene.height + 50);
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(0, 16777215, 0);
  }
  /*
  This is the function that generates a wave of foes in an ordered formation.
  */
  orderedWave(difficulty = 5) {
    const x = Phaser.Math.Between(64, this.scene.width - 200);
    const y = Phaser.Math.Between(-100, 0);
    const minus = Phaser.Math.Between(-1, 1) > 0 ? 1 : -1;
    Array(difficulty).fill(null).forEach((_, i) => this.addOrder(i, x, y, minus));
  }
  /*
  This function just creates a simple wave of foes.
  */
  wave(difficulty = 5) {
    this.createPath();
    Array(difficulty).fill(null).forEach((_, i) => this.addToWave(i));
    this.activeWave = true;
  }
  /*
  This function generates a single tank foe.
  */
  tank() {
    this.scene.foeGroup.add(
      new foe_default(this.scene, Phaser.Math.Between(100, 600), -100, "foe2", 0, 620)
    );
  }
  /*
  This generates a slider foe and adds a rotation tween to it.
  */
  slider() {
    let velocity = -200;
    let x = 0;
    if (Phaser.Math.Between(-1, 1) > 0) {
      velocity = 200;
      x = -100;
    } else {
      x = this.scene.width + 100;
    }
    const foe = new foe_default(
      this.scene,
      x,
      Phaser.Math.Between(100, 600),
      "foe1",
      velocity,
      0
    );
    this.scene.tweens.add({
      targets: [foe, foe.shadow],
      duration: 500,
      rotation: "+=5",
      repeat: -1
    });
    this.scene.foeGroup.add(foe);
  }
  /*
  This function adds a foe to the scene, in a random position.
  */
  add() {
    const foe = new foe_default(
      this.scene,
      Phaser.Math.Between(32, this.scene.width - 32),
      0
    );
    this.scene.foeGroup.add(foe);
  }
  /*
  This function generates and ordered group of foes.
  */
  addOrder(i, x, y, minus) {
    const offset = minus * 70;
    this.scene.foeGroup.add(
      new foe_default(this.scene, x + i * 70, i * y + offset, "foe0", 0, 300)
    );
  }
  /*
  This function adds a foe to the wave.
  */
  addToWave(i) {
    const foe = new foe_default(
      this.scene,
      Phaser.Math.Between(32, this.scene.width - 32),
      0,
      "foe0"
    );
    this.scene.tweens.add({
      targets: foe,
      z: 1,
      ease: "Linear",
      duration: 12e3,
      repeat: -1,
      delay: i * 100
    });
    this;
    this.scene.foeWaveGroup.add(foe);
  }
  /*
  This function updates all foes in the scene. This could be done independently in each foe as we will see in other projects.
  */
  update() {
    if (this.path) {
      this.path.draw(this.graphics);
      this.scene.foeWaveGroup.children.forEach((foe) => {
        if (foe === null || !foe.active || !(foe instanceof foe_default)) return;
        let t = foe.z;
        let vec = foe.getData("vector");
        this.path.getPoint(t, vec);
        foe.setPosition(vec.x, vec.y);
        foe.shadow?.setPosition(vec.x + 20, vec.y + 20);
        foe.setDepth(foe.y);
      });
      if (this.activeWave && this.checkIfWaveDestroyed()) {
        this.activeWave = false;
        this.scene.spawnShake();
        this.path.destroy();
      }
    }
    this.scene.foeGroup.children.entries().forEach((foe) => {
      if (!(foe instanceof foe_default)) return;
      if (foe === null || !foe.active || foe.y > this.scene.height + 100)
        foe.destroy();
      foe.update();
    });
  }
  /*
  This function checks if the wave of foes has been destroyed so we can generate a power-up.
  */
  checkIfWaveDestroyed() {
    const foes = [...this.scene.foeWaveGroup.children];
    return foes.length === foes.filter((foe) => !foe.active).length;
  }
};

// games/starshake/gameobjects/particle.ts
var LightParticle = class extends Phaser.GameObjects.PointLight {
  constructor(scene, x, y, color = 16777215, radius = 5, intensity = 0.5) {
    super(scene, x, y, color, radius, intensity);
    this.name = "celtic";
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.body.setVelocityY(300);
    this.init();
  }
  /*
    We add a tween to the particle to make it grow and fade out.
    */
  init() {
    this.scene.tweens.add({
      targets: this,
      duration: Phaser.Math.Between(600, 1e3),
      scale: { from: 1, to: 3 },
      alpha: { from: this.alpha, to: 0 },
      onComplete: () => {
        this.destroy();
      }
    });
  }
};

// games/starshake/gameobjects/shot.ts
var TYPES3 = {
  chocolate: { color: 11501655, radius: 16, intensity: 0.4 },
  vanila: { color: 16774869, radius: 16, intensity: 0.4 },
  fruit: { color: 16777215, radius: 16, intensity: 0.4 },
  water: { color: 16777215, radius: 16, intensity: 0.4 },
  foe: { color: 65280, radius: 16, intensity: 0.4 }
};
var Shot = class extends Phaser.GameObjects.PointLight {
  constructor(scene, x, y, type = "water", playerName, velocityX = 0, velocityY = -500) {
    const { color, radius, intensity } = TYPES3[type];
    super(scene, x, y, color, radius, intensity);
    __publicField(this, "playerName");
    __publicField(this, "shadow");
    this.name = "shot";
    this.playerName = playerName;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.body.setVelocityX(velocityX);
    this.body.setVelocityY(velocityY);
    this.body.setCircle(10);
    this.body.setOffset(6, 9);
    this.body.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.spawnShadow(x, y, velocityX, velocityY);
    this.init();
  }
  /*
   Each shot will have a shadow, which will be a circle with a lower alpha value.
    */
  spawnShadow(x, y, velocityX, velocityY) {
    this.shadow = this.scene.add.circle(x + 20, y + 20, 10, 0).setAlpha(0.4);
    this.scene.add.existing(this.shadow);
    this.scene.physics.add.existing(this.shadow);
    this.shadow.body.setVelocityX(velocityX);
    this.shadow.body.setVelocityY(velocityY);
  }
  /*
    We add a tween to the shot to make it grow and fade out, repeatedly.
    */
  init() {
    this.scene.tweens.add({
      targets: this,
      duration: 200,
      intensity: { from: 0.3, to: 0.7 },
      repeat: -1
    });
  }
};
var shot_default = Shot;

// games/starshake/gameobjects/shooting_patterns.ts
var ShootingPatterns = class {
  constructor(scene, name) {
    __publicField(this, "scene");
    __publicField(this, "name");
    __publicField(this, "shootingMethods");
    this.scene = scene;
    this.name = name;
    this.shootingMethods = {
      water: this.single.bind(this),
      fruit: this.tri.bind(this),
      vanila: this.quintus.bind(this),
      chocolate: this.massacre.bind(this)
    };
  }
  /*
    These are the different functions we will use to shoot. Each one will shoot a different number of shots, with different angles and speeds.
    The patterns are applied depending on the current power-up.
    */
  shoot(x, y, powerUp) {
    this.shootingMethods[powerUp](x, y, powerUp);
  }
  single(x, y, powerUp) {
    this.scene.shots.add(new shot_default(this.scene, x, y, powerUp, this.name));
  }
  tri(x, y, powerUp) {
    this.scene.shots.add(new shot_default(this.scene, x, y, powerUp, this.name, -60));
    this.scene.shots.add(new shot_default(this.scene, x, y, powerUp, this.name));
    this.scene.shots.add(new shot_default(this.scene, x, y, powerUp, this.name, 60));
  }
  quintus(x, y, powerUp) {
    this.scene.shots.add(new shot_default(this.scene, x, y, powerUp, this.name, -300));
    this.scene.shots.add(new shot_default(this.scene, x, y, powerUp, this.name, 300));
    this.scene.shots.add(
      new shot_default(this.scene, x, y, powerUp, this.name, -300, 500)
    );
    this.scene.shots.add(
      new shot_default(this.scene, x, y, powerUp, this.name, 300, 500)
    );
  }
  massacre(x, y, powerUp) {
    this.scene.shots.add(
      new shot_default(this.scene, x, y, powerUp, this.name, 300, 0)
    );
    this.scene.shots.add(
      new shot_default(this.scene, x, y, powerUp, this.name, -300, 0)
    );
    this.scene.shots.add(
      new shot_default(this.scene, x, y, powerUp, this.name, 0, 500)
    );
    this.scene.shots.add(new shot_default(this.scene, x, y, powerUp, this.name, 30));
    this.scene.shots.add(new shot_default(this.scene, x, y, powerUp, this.name, 60));
  }
};

// games/starshake/gameobjects/player.ts
var Player = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "player1", powerUp = "water") {
    super(scene, x, y, name);
    __publicField(this, "powerUp");
    __publicField(this, "id");
    __publicField(this, "power");
    __publicField(this, "blinking");
    __publicField(this, "shootingPatterns");
    __publicField(this, "shadow");
    __publicField(this, "upDelta");
    __publicField(this, "SPACE");
    __publicField(this, "cursor");
    __publicField(this, "W");
    __publicField(this, "A");
    __publicField(this, "S");
    __publicField(this, "D");
    __publicField(this, "death");
    this.name = name;
    this.spawnShadow(x, y);
    this.powerUp = powerUp;
    this.id = Math.random();
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.body.setAllowGravity(false);
    this.body.setCircle(26);
    this.body.setOffset(6, 9);
    this.power = 0;
    this.blinking = false;
    this.shootingPatterns = new ShootingPatterns(this.scene, this.name);
    this.init();
    this.setControls();
  }
  /*
    We add a shadow to the player, and we'll have to update its position with the player. Alternatively, we could have defined a Container with the player and the shadow.
    */
  spawnShadow(x, y) {
    this.shadow = this.scene.add.image(x + 20, y + 20, "player1").setTint(0).setAlpha(0.4);
  }
  /*
    We set the animations for the player. We'll have 3 animations: one for the idle state, one for moving right, and one for moving left.
    */
  init() {
    this.scene.anims.create({
      key: this.name,
      frames: this.scene.anims.generateFrameNumbers(this.name, {
        start: 0,
        end: 0
      }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: this.name + "right",
      frames: this.scene.anims.generateFrameNumbers(this.name, {
        start: 1,
        end: 1
      }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: this.name + "left",
      frames: this.scene.anims.generateFrameNumbers(this.name, {
        start: 2,
        end: 2
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.play(this.name, true);
    this.upDelta = 0;
  }
  /*
    We set the controls for the player. We'll use the cursor keys and WASD keys to move the player, and the space bar to shoot.
    */
  setControls() {
    if (!this.scene.input.keyboard) throw Error("Must have a keyboard to play");
    this.SPACE = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.cursor = this.scene.input.keyboard.createCursorKeys();
    this.W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }
  /*
    This will be called when the player shoots. We'll play a sound, and then call the shoot method of the current shooting pattern.
    */
  shoot() {
    this.scene.playAudio("shot");
    this.shootingPatterns.shoot(this.x, this.y, this.powerUp);
  }
  /*
    This is the game loop for the player. We'll check if the player is moving, and if so, we'll play the corresponding animation. We'll also check if the player is shooting, and if so, we'll call the shoot method.
    */
  update() {
    if (this.death) return;
    if (this.cursor.left.isDown) {
      this.x -= 5;
      this.anims.play(this.name + "left", true);
      this.shadow.setScale(0.5, 1);
    } else if (this.cursor.right.isDown) {
      this.x += 5;
      this.anims.play(this.name + "right", true);
      this.shadow.setScale(0.5, 1);
    } else {
      this.anims.play(this.name, true);
      this.shadow.setScale(1, 1);
    }
    if (this.cursor.up.isDown) {
      this.y -= 5;
    } else if (this.cursor.down.isDown) {
      this.y += 5;
    }
    if (Phaser.Input.Keyboard.JustDown(this.SPACE)) {
      this.shoot();
    }
    this.scene.trailLayer.add(
      new LightParticle(this.scene, this.x, this.y, 16777215, 10)
    );
    this.updateShadow();
  }
  /*
    We update the shadow position to follow the player.
    */
  updateShadow() {
    this.shadow.x = this.x + 20;
    this.shadow.y = this.y + 20;
  }
  /*
    Every time the player destroys a foe or a shot we show the points. We'll use a bitmap text for that.
    */
  showPoints(score, color = 16711680) {
    let text = this.scene.add.bitmapText(
      this.x + 20,
      this.y - 30,
      "starshipped",
      score.toString(),
      20,
      16776503
    ).setOrigin(0.5);
    this.scene.tweens.add({
      targets: text,
      duration: 2e3,
      alpha: { from: 1, to: 0 },
      y: { from: text.y - 10, to: text.y - 100 }
    });
  }
  /*
    This will be called when the player dies: we'll show an explosion, shake the camera, and destroy the player.
    */
  dead() {
    const explosion = this.scene.add.circle(this.x, this.y, 10).setStrokeStyle(40, 16777215);
    this.scene.tweens.add({
      targets: explosion,
      radius: { from: 10, to: 512 },
      alpha: { from: 1, to: 0.3 },
      duration: 300,
      onComplete: () => {
        explosion.destroy();
      }
    });
    this.scene.cameras.main.shake(500);
    this.death = true;
    this.shadow.destroy();
    new explosion_default(this.scene, this.x, this.y, 40);
    super.destroy();
  }
};
var player_default = Player;

// games/starshake/gameobjects/powerup.ts
var PowerUp = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "plenny0", power = "fruit") {
    super(scene, x, y, name);
    __publicField(this, "power");
    __publicField(this, "id");
    __publicField(this, "shadow");
    __publicField(this, "direction");
    this.name = name;
    this.power = power;
    this.scene = scene;
    this.id = Math.random();
    this.spawnShadow(x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.body.setCircle(19);
    this.body.setOffset(12, 12);
    this.body.setVelocityX(-100);
    this.init();
  }
  /*
   The power-up also spawns a shadow.
    */
  spawnShadow(x, y) {
    this.shadow = this.scene.add.image(x + 20, y + 20, "plenny0").setTint(0).setAlpha(0.4);
    this.scene.physics.add.existing(this.shadow);
    this.shadow.body.setVelocityX(-100);
  }
  /*
    This sets the animation and movement of the power-up.
    */
  init() {
    this.scene.anims.create({
      key: this.name,
      frames: this.scene.anims.generateFrameNumbers(this.name),
      frameRate: 10,
      repeat: -1
    });
    this.scene.tweens.add({
      targets: [this],
      duration: 5e3,
      x: { from: this.x, to: 0 },
      y: { from: this.y - 10, to: this.y + 10 },
      scale: { from: 0.8, to: 1 },
      repeat: -1,
      yoyo: true
    });
    this.scene.tweens.add({
      targets: this.shadow,
      duration: 5e3,
      x: { from: this.shadow.x, to: 0 },
      y: { from: this.shadow.y - 10, to: this.y + 10 },
      scale: { from: 0.8, to: 1 },
      repeat: -1,
      yoyo: true
    });
    this.anims.play(this.name, true);
    this.body.setVelocityX(-100);
    this.shadow.body.setVelocityX(-100);
    this.direction = -1;
  }
  /*
    When this element is destroyed, it will also destroy the shadow.
    */
  destroy() {
    this.shadow.destroy();
    super.destroy();
  }
};
var powerup_default = PowerUp;

// games/starshake/gameobjects/scene_effect.ts
var SceneEffect = class {
  constructor(scene) {
    __publicField(this, "scene");
    this.scene = scene;
  }
  /*
   This adds a rectangle to the scene, and then we tween it to make it move from the left to the right.
    */
  simpleClose(callback) {
    const rectangleWidth = this.scene.width / 2;
    const rectangle1 = this.scene.add.rectangle(
      0 - rectangleWidth,
      0,
      this.scene.width,
      this.scene.height,
      0
    ).setOrigin(0.5, 0);
    this.scene.tweens.add({
      targets: rectangle1,
      duration: 500,
      x: { from: -rectangleWidth / 2, to: rectangleWidth },
      onComplete: () => {
        callback();
      }
    });
  }
  /*
    This adds a rectangle to the scene, and then we tween it to make it move from the right to the left.
    */
  simpleOpen(callback) {
    const rectangleWidth = this.scene.width / 2;
    const rectangle1 = this.scene.add.rectangle(
      rectangleWidth,
      0,
      this.scene.width,
      this.scene.height,
      0
    ).setOrigin(0.5, 0);
    this.scene.tweens.add({
      targets: rectangle1,
      duration: 500,
      x: { from: rectangleWidth, to: -rectangleWidth },
      onComplete: () => {
        callback();
      }
    });
  }
  /*
    This adds two rectangles to the scene, and then we tween them to make them move from the center to the left and right.
    */
  close(callback) {
    const rectangleWidth = this.scene.width / 2;
    const rectangle1 = this.scene.add.rectangle(
      0 - rectangleWidth,
      0,
      this.scene.width / 2,
      this.scene.height,
      0
    ).setOrigin(0.5, 0);
    const rectangle2 = this.scene.add.rectangle(
      this.scene.width,
      0,
      this.scene.width / 2,
      this.scene.height,
      0
    ).setOrigin(0, 0);
    this.scene.tweens.add(
      {
        targets: rectangle1,
        duration: 1e3,
        x: { from: -rectangleWidth / 2, to: rectangleWidth / 2 }
      }
      /**
       * Typescript Additions: You cannot provide more than one tween to the scene.tweens.add method.
       */
      // {
      //   targets: rectangle2,
      //   duration: 1000,
      //   x: { from: this.scene.width, to: rectangleWidth },
      //   onComplete: () => {
      //     callback();
      //   },
      // }
    );
  }
};

// games/starshake/scenes/game.ts
var isShot = (gameObject) => ["shot", "foeShot"].includes(gameObject.name);
var Game = class extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    __publicField(this, "player");
    __publicField(this, "score");
    __publicField(this, "scoreText");
    __publicField(this, "name");
    __publicField(this, "number");
    __publicField(this, "next");
    __publicField(this, "currentPowerUp");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "background");
    __publicField(this, "lastDestroyedWaveFoe");
    __publicField(this, "shake");
    __publicField(this, "powerUps");
    __publicField(this, "scores");
    __publicField(this, "trailLayer");
    __publicField(this, "players");
    __publicField(this, "shotsLayer");
    __publicField(this, "shots");
    __publicField(this, "foeGroup");
    __publicField(this, "foeWaveGroup");
    __publicField(this, "foeShots");
    __publicField(this, "foes");
    __publicField(this, "available");
    __publicField(this, "audios");
    this.player = null;
    this.score = 0;
    this.scoreText = null;
  }
  /*
    We need to initialize the scene with the data we passed from the previous scene, especially the number of the stage to load the correct background. Also, we need to get the current power-up from the registry, although we are not applying it yet.
    */
  init(data) {
    this.name = data.name;
    this.number = data.number;
    this.next = data.next;
    this.currentPowerUp = +this.registry.get("currentPowerUp");
  }
  /*
    Here we create and start all the elements of the game. We create the background, the players, the foes, the shots, the power-ups, the scores, the audios and the colliders.
    */
  create() {
    this.width = Number(this.sys.game.config.width);
    this.height = Number(this.sys.game.config.height);
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    new SceneEffect(this).simpleOpen(() => 0);
    this.addBackground();
    this.cameras.main.setBackgroundColor(3355443);
    this.lights.enable();
    this.lights.setAmbientColor(6710886);
    this.addScores();
    this.addFoes();
    this.addPlayers();
    this.addPowerUps();
    this.addShots();
    this.loadAudios();
    this.addColliders();
  }
  /*
    This is how we create an infinite background. We create a tileSprite with the size of the screen and we set the origin to 0,0. Then we set the scroll factor to 0,1 so it will scroll only in the Y axis.
    */
  addBackground() {
    this.background = this.add.tileSprite(0, 0, this.width, this.height, "stage" + this.number).setOrigin(0).setScrollFactor(0, 1);
  }
  /*
    This is the method that will be called from the foe generator when a wave is destroyed. We create a new power up and we add it to the power-up group.
    */
  spawnShake() {
    const { x, y } = this.lastDestroyedWaveFoe;
    this.shake = new powerup_default(this, x, y);
    this.powerUps.add(this.shake);
  }
  /*
    This adds the score text to the scene. We create a group of scores, one for each player. We add the score text to the group and we set the scroll factor to 0 so it will not scroll with the camera.
    */
  addScores() {
    this.scores = {
      player1: {
        scoreText: this.add.bitmapText(
          150,
          16,
          "wendy",
          String(this.registry.get("score_player1")).padStart(6, "0"),
          50
        ).setOrigin(0.5).setScrollFactor(0)
      },
      player2: {
        scoreText: this.add.bitmapText(this.width - 150, 16, "wendy", "0".padStart(6, "0"), 50).setOrigin(0.5).setScrollFactor(0)
      }
    };
  }
  /*
    This adds the players to the scene. We create a group of players but in this particular implementation, we just add one player.
    */
  addPlayers() {
    this.trailLayer = this.add.layer();
    this.players = this.add.group();
    this.player = new player_default(this, this.center_width, this.center_height);
    this.players.add(this.player);
  }
  /*
    Next, we have some functions to add other groups for the game elements.
    */
  addShots() {
    this.shotsLayer = this.add.layer();
    this.shots = this.add.group();
  }
  addFoes() {
    this.foeGroup = this.add.group();
    this.foeWaveGroup = this.add.group();
    this.foeShots = this.add.group();
    this.foes = new FoeGenerator(this);
  }
  addPowerUps() {
    this.available = ["fruit", "vanila", "chocolate"];
    this.powerUps = this.add.group();
  }
  /*
    Once we have created all groups of elements, we add the colliders between them.
    */
  addColliders() {
    this.physics.add.collider(
      this.players,
      this.foeGroup,
      this.crashFoe,
      () => {
        return true;
      },
      this
    );
    this.physics.add.collider(
      this.players,
      this.foeWaveGroup,
      this.crashFoe,
      () => {
        return true;
      },
      this
    );
    this.physics.add.overlap(
      this.shots,
      this.foeGroup,
      this.destroyFoe,
      () => {
        return true;
      },
      this
    );
    this.physics.add.overlap(
      this.shots,
      this.foeWaveGroup,
      this.destroyWaveFoe,
      () => {
        return true;
      },
      this
    );
    this.physics.add.collider(
      this.players,
      this.powerUps,
      this.pickPowerUp,
      () => {
        return true;
      },
      this
    );
    this.physics.add.overlap(
      this.players,
      this.foeShots,
      this.hitPlayer,
      () => {
        return true;
      },
      this
    );
    this.physics.add.collider(
      this.shots,
      this.foeShots,
      this.destroyShot,
      () => {
        return true;
      },
      this
    );
    this.physics.world.on("worldbounds", this.onWorldBounds);
  }
  /*
    This is the callback for the world bounds and we will use it to destroy elements that the game does not need anymore. We check if the element is a shot and if it is, we destroy it. We also destroy the shadow of the shot. We do this because the shadow is not a child of the shot, so it will not be destroyed automatically.
    */
  onWorldBounds(body) {
    if (isShot(body.gameObject)) {
      body.gameObject.shadow.destroy();
      body.gameObject.destroy();
    }
  }
  /*
    This is the callback for the collision between two shots. We destroy both shots and we create an explosion where they meet.
    */
  destroyShot(shot, foeShot) {
    const point = this.lights.addPointLight(shot.x, shot.y, 16777215, 10, 0.7);
    this.tweens.add({
      targets: point,
      duration: 400,
      scale: { from: 1, to: 0 }
    });
    this.playAudio("foexplosion");
    shot.shadow.destroy();
    shot.destroy();
    foeShot.shadow.destroy();
    foeShot.shot();
    this.updateScore(shot.playerName, 50);
  }
  /*
    This is called when we destroy a foe that is part of a wave.
    */
  destroyWaveFoe(shot, foe) {
    this.lastDestroyedWaveFoe = { x: foe.x, y: foe.y };
    this.destroyFoe(shot, foe);
  }
  /*
  This is the callback we call when a shot hits a foe. We destroy the shot and we decrease the lives of the foe. If the foe has no more lives, we destroy it and we create an explosion. We also add the points to the score of the player who shoots the foe.
    */
  destroyFoe(shot, foe) {
    foe.lives--;
    this.playAudio("foexplosion");
    const point = this.lights.addPointLight(shot.x, shot.y, 16777215, 10, 0.7);
    this.tweens.add({
      targets: point,
      duration: 400,
      scale: { from: 1, to: 0 }
    });
    this.tweens.add({
      targets: foe,
      duration: 400,
      tint: { from: 16777215, to: 16711680 }
    });
    this.updateScore(shot.playerName, 50);
    this.tweens.add({ targets: foe, y: "-=10", yoyo: true, duration: 100 });
    shot.destroy();
    if (foe.lives === 0) {
      this.playAudio("foedestroy");
      const point2 = this.lights.addPointLight(
        shot.x,
        shot.y,
        16777215,
        10,
        0.7
      );
      this.tweens.add({
        targets: point2,
        duration: 400,
        scale: { from: 1, to: 0 }
      });
      this.updateScore(shot.playerName, foe.points);
      foe.dead();
    }
  }
  /*
  This one is called when a foe shot hits the player. Unless the player is blinking (because it just started), we destroy the player and we create an explosion. We also destroy the shadow of the shot. Then we respawn the player
    */
  hitPlayer(player, shot) {
    if (player.blinking) return;
    if (this.player) this.players.remove(this.player);
    player.dead();
    this.playAudio("explosion");
    shot.shadow.destroy();
    shot.destroy();
    this.time.delayedCall(1e3, () => this.respawnPlayer(), void 0, this);
  }
  /*
    This one is called when a player crashes with a foe. Unless the player is blinking (because it just started), we destroy the player, and the foe and also at the end we respawn the player.
    */
  crashFoe(player, foe) {
    if (player.blinking) return;
    player.dead();
    this.playAudio("explosion");
    foe.dead();
    this.time.delayedCall(1e3, () => this.respawnPlayer(), void 0, this);
  }
  /*
    This is the callback when the player picks a powerup. We update the power-up of the player and we destroy the power-up. We also create a tween to make the player blink.
    */
  pickPowerUp(player, powerUp) {
    this.playAudio("stageclear1");
    this.updatePowerUp(player, powerUp);
    this.tweens.add({
      targets: player,
      duration: 200,
      alpha: { from: 0.5, to: 1 },
      scale: { from: 1.4, to: 1 },
      repeat: 3
    });
    powerUp.destroy();
  }
  /*
    This adds a player to the game. We create a tween to make the player blink and then we create a new player.
    */
  respawnPlayer() {
    this.player = new player_default(this, this.center_width, this.center_height);
    this.player.blinking = true;
    this.players.add(this.player);
    this.tweens.add({
      targets: this.player,
      duration: 100,
      alpha: { from: 0, to: 1 },
      repeat: 10,
      onComplete: () => {
        if (this.player) this.player.blinking = false;
      }
    });
  }
  /*
    Here we load all the audio, and we add them to the `this.audios` object. Later we can play them with the `playAudio` method.
    */
  loadAudios() {
    this.audios = {
      shot: this.sound.add("shot"),
      foeshot: this.sound.add("foeshot"),
      explosion: this.sound.add("explosion"),
      foexplosion: this.sound.add("foexplosion"),
      foedestroy: this.sound.add("foedestroy"),
      stageclear1: this.sound.add("stageclear1"),
      stageclear2: this.sound.add("stageclear2"),
      boss: this.sound.add("boss")
    };
  }
  playAudio(key) {
    this.audios[key].play();
  }
  /*
    The game loop is as simple as this. We update the player and the foes. We also update the background to make it scroll.
    */
  update() {
    if (this.player) this.player?.update();
    this.foes.update();
    this.background.tilePositionY -= 10;
  }
  /*
    When the player finishes the stage, we destroy all the elements and we start the transition to the next scene.
    */
  endScene() {
    this.foeWaveGroup.children.entries().forEach(
      (foe) => foe instanceof foe_default && foe.shadow?.destroy()
    );
    this.foeGroup.children.entries().forEach(
      (foe) => foe instanceof foe_default && foe.shadow?.destroy()
    );
    this.shots.children.entries().forEach(
      (shot) => shot instanceof shot_default && shot.shadow.destroy()
    );
    this.foeShots.children.entries().forEach(
      (shot) => shot instanceof foe_shot_default && shot.shadow.destroy()
    );
    this.time.delayedCall(
      2e3,
      () => {
        this.finishScene();
      },
      void 0,
      this
    );
  }
  /*
    This is the callback for the end of the scene. We stop all the audio, we stop the scene and we start the transition to the next scene.
    */
  finishScene() {
    this.game.sound.stopAll();
    this.scene.stop("game");
    const scene = this.number < 5 ? "transition" : "outro";
    this.scene.start(scene, {
      next: "game",
      name: "STAGE",
      number: this.number + 1
    });
  }
  /*
    The power-up looks the same but the effect is different. We keep increasing its value so we can apply the effect to the player. In this game, the power-up applies another shooting pattern.
    */
  updatePowerUp(player, powerUp) {
    player.powerUp = this.available[this.currentPowerUp];
    this.currentPowerUp = this.currentPowerUp + 1 === this.available.length ? this.currentPowerUp : this.currentPowerUp + 1;
    this.registry.set("currentPowerUp", this.currentPowerUp);
  }
  /*
    This is the method we use to update the score of the player. We get the score from the registry and we update it. We also create a tween to make the score text blink.
    */
  updateScore(playerName, points = 0) {
    const score = +this.registry.get("score_" + playerName) + points;
    this.registry.set("score_" + playerName, score);
    this.scores[playerName]["scoreText"].setText(
      String(score).padStart(6, "0")
    );
    this.tweens.add({
      targets: this.scores[playerName]["scoreText"],
      duration: 200,
      tint: { from: 255, to: 16777215 },
      scale: { from: 1.2, to: 1 },
      repeat: 2
    });
  }
};

// games/starshake/scenes/splash.ts
var Splash = class extends Phaser.Scene {
  constructor() {
    super({ key: "splash" });
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "background");
    __publicField(this, "theme");
    __publicField(this, "gameLogoShadow");
    __publicField(this, "gameLogo");
    __publicField(this, "space");
  }
  create() {
    this.width = Number(this.sys.game.config.width);
    this.height = Number(this.sys.game.config.height);
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.addBackground();
    this.showLogo();
    this.registry.set("currentPowerUp", 0);
    this.time.delayedCall(1e3, () => this.showInstructions(), void 0, this);
    this.input.keyboard?.on(
      "keydown-SPACE",
      () => this.transitionToChange(),
      this
    );
    this.playMusic();
  }
  /*
    The background, as the game, is a `tileSprite`, so we can scroll it to make it look like it's moving.
    */
  addBackground() {
    this.background = this.add.tileSprite(0, 0, this.width, this.height, "background").setOrigin(0).setScrollFactor(0, 1);
  }
  update() {
    this.background.tilePositionY -= 2;
    this.background.tilePositionX += 2;
  }
  /*
    We add this effect to change to another screen:
    */
  transitionToChange() {
    new SceneEffect(this).simpleClose(this.startGame.bind(this));
  }
  startGame() {
    if (this.theme) this.theme.stop();
    this.scene.start("transition", {
      next: "game",
      name: "STAGE",
      number: 1,
      time: 30
    });
  }
  /*
    We add the logo, and then we tween it to make it move up and down.
    */
  showLogo() {
    this.gameLogoShadow = this.add.image(this.center_width, 250, "logo").setScale(0.7).setOrigin(0.5);
    this.gameLogoShadow.setOrigin(0.48);
    this.gameLogoShadow.tint = 4083267;
    this.gameLogoShadow.alpha = 0.6;
    this.gameLogo = this.add.image(this.center_width, 250, "logo").setScale(0.7).setOrigin(0.5);
    this.tweens.add({
      targets: [this.gameLogo, this.gameLogoShadow],
      duration: 500,
      y: {
        from: -200,
        to: 250
      }
    });
    this.tweens.add({
      targets: [this.gameLogo, this.gameLogoShadow],
      duration: 1500,
      y: {
        from: 250,
        to: 200
      },
      repeat: -1,
      yoyo: true
    });
  }
  /*
    This is the music for the splash scene. We'll play it in a loop.
    */
  playMusic(theme = "splash") {
    this.theme = this.sound.add(theme);
    this.theme.stop();
    this.theme.play({
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    });
  }
  /*
    Here we add the instructions to the scene.
    */
  showInstructions() {
    this.add.bitmapText(this.center_width, 450, "wendy", "Arrows to move", 60).setOrigin(0.5).setDropShadow(3, 4, 2236962, 0.7);
    this.add.bitmapText(this.center_width, 500, "wendy", "SPACE to shoot", 60).setOrigin(0.5).setDropShadow(3, 4, 2236962, 0.7);
    this.add.sprite(this.center_width - 95, 598, "pello_logo").setOrigin(0.5).setScale(0.3).setTint(0).setAlpha(0.7);
    this.add.sprite(this.center_width - 100, 590, "pello_logo").setOrigin(0.5).setScale(0.3);
    this.add.bitmapText(this.center_width + 30, 590, "wendy", "PELLO", 50).setOrigin(0.5).setDropShadow(3, 4, 2236962, 0.7);
    this.space = this.add.bitmapText(this.center_width, 680, "wendy", "Press SPACE to start", 60).setOrigin(0.5).setDropShadow(3, 4, 2236962, 0.7);
    this.tweens.add({
      targets: this.space,
      duration: 300,
      alpha: { from: 0, to: 1 },
      repeat: -1,
      yoyo: true
    });
  }
};

// games/starshake/scenes/transition.ts
var Transition = class extends Phaser.Scene {
  constructor() {
    super({ key: "transition" });
    __publicField(this, "name");
    __publicField(this, "number");
    __publicField(this, "next");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "theme");
  }
  init(data) {
    this.name = data.name;
    this.number = data.number;
    this.next = data.next;
  }
  /*
    In the transition, we show a message with the current stage and some advice, and then we load the next scene.
    */
  create() {
    const messages = [
      "Fire at will",
      "Beware the tanks",
      "Shoot down the UFOs",
      "FINAL BOSS"
    ];
    this.width = Number(this.sys.game.config.width);
    this.height = Number(this.sys.game.config.height);
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.sound.add("stageclear2").play();
    this.add.bitmapText(
      this.center_width,
      this.center_height - 50,
      "wendy",
      messages[this.number - 1],
      100
    ).setOrigin(0.5);
    this.add.bitmapText(
      this.center_width,
      this.center_height + 50,
      "wendy",
      "Ready player 1",
      80
    ).setOrigin(0.5);
    this.playMusic("music" + (this.number !== 4 ? this.number : 1));
    this.time.delayedCall(2e3, () => this.loadNext(), void 0, this);
  }
  loadNext() {
    this.scene.start(this.next, {
      name: this.name,
      number: this.number,
      time: this.time
    });
  }
  /*
    The music of the stage is loaded and played in this transition.
    */
  playMusic(theme = "music1") {
    this.theme = this.sound.add(theme);
    this.theme.play({
      mute: false,
      volume: 0.4,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    });
  }
};

// games/starshake/scenes/outro.ts
var Outro = class extends Phaser.Scene {
  constructor() {
    super({ key: "outro" });
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "introLayer");
    __publicField(this, "splashLayer");
    __publicField(this, "text");
    __publicField(this, "player1");
  }
  create() {
    this.width = Number(this.sys.game.config.width);
    this.height = Number(this.sys.game.config.height);
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.introLayer = this.add.layer();
    this.splashLayer = this.add.layer();
    this.text = [
      "Score: " + this.registry.get("score_player1"),
      "The evil forces among with",
      "their tyrannical leader GUINXU",
      "were finally wiped out.",
      "Thanks to commander Alva",
      "And the powah of the Plenny Shakes",
      " - press enter - "
    ];
    this.showHistory();
    this.showPlayer();
    this.input.keyboard?.on("keydown-ENTER", this.startSplash, this);
  }
  /*
    These are the functions to show the dramatic story of the game, line by line.
    */
  showHistory() {
    this.text.forEach((line, i) => {
      this.time.delayedCall(
        (i + 1) * 2e3,
        () => this.showLine(line, (i + 1) * 60),
        void 0,
        this
      );
    });
    this.time.delayedCall(4e3, () => this.showPlayer(), void 0, this);
  }
  showLine(text, y) {
    const line = this.introLayer.add(
      this.add.bitmapText(this.center_width, y, "wendy", text, 50).setOrigin(0.5).setAlpha(0)
    );
    this.tweens.add({
      targets: line,
      duration: 2e3,
      alpha: 1
    });
  }
  /*
    This will just show the "player1" sprite.
    */
  showPlayer() {
    this.player1 = this.add.sprite(this.center_width, this.height - 200, "player1").setOrigin(0.5);
  }
  /*
    This will start the splash screen.
    */
  startSplash() {
    this.scene.start("splash");
  }
};

// games/starshake/main.ts
var config = {
  width: 1e3,
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
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scene: [Bootloader, Game, Splash, Transition, Outro]
};
var game = new Phaser2.Game(config);
export {
  game
};
//# sourceMappingURL=main.js.map
