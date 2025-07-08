var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __publicField = (obj, key2, value) => __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);

// games/dungeon/main.ts
import Phaser2 from "https://esm.sh/phaser@4.0.0-rc.4";

// games/dungeon/scenes/bootloader.ts
var Bootloader = class extends Phaser.Scene {
  constructor() {
    super({ key: "bootloader" });
    __publicField(this, "progressBar");
    __publicField(this, "loadBar");
  }
  preload() {
    this.createBars();
    this.setLoadEvents();
    this.loadFonts();
    this.loadImages();
    this.loadMaps();
    this.loadAudios();
    this.loadSpritesheets();
  }
  /*
    As we showed before, this method takes care of the loading bar and the progress bar using load events.
    */
  setLoadEvents() {
    this.load.on(
      "progress",
      (value) => {
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
    The fonts are loaded in this method. We'll call them default. Later we could add other fonts but with the same "default" name in case we want to try different fonts.
    */
  loadFonts() {
    this.load.bitmapFont(
      "default",
      "assets/dungeon/fonts/pico.png",
      "assets/dungeon/fonts/pico.xml"
    );
  }
  /*
    This one loads the static images.
    */
  loadImages() {
    this.load.image("pello", "assets/dungeon/images/pello_ok.png");
    this.load.image("fireball", "assets/dungeon/images/fireball.png");
    this.load.image("tiles", "assets/dungeon/maps/pixel-poem-tiles.png");
    this.load.image("block", "assets/dungeon/images/block.png");
    this.load.image("seesaw", "assets/dungeon/images/seesaw.png");
    this.load.image("bubble", "assets/dungeon/images/bubble.png");
    this.load.image("platform", "assets/dungeon/images/platform.png");
  }
  /*
    This loads the level map. In this game, we just use one empty map that we'll fill with the different elements of the game using a dungeon generator class.
    */
  loadMaps() {
    this.load.tilemapTiledJSON("scene0", "assets/dungeon/maps/level.json");
  }
  /*
    This loads the audio files: music and sound effects.
    */
  loadAudios() {
    Array(5).fill(0).forEach((_, i) => {
      this.load.audio(`climb${i}`, `assets/dungeon/sounds/climb${i}.mp3`);
    });
    this.load.audio("splash", "assets/dungeon/sounds/splash.mp3");
    this.load.audio("music", "assets/dungeon/sounds/music.mp3");
    this.load.audio("jump", "assets/dungeon/sounds/jump.mp3");
    this.load.audio("bubble", "assets/dungeon/sounds/bubble.mp3");
    this.load.audio("trap", "assets/dungeon/sounds/trap.mp3");
    this.load.audio("crash", "assets/dungeon/sounds/crash.mp3");
    this.load.audio("fireball", "assets/dungeon/sounds/fireball.mp3");
    this.load.audio("win", "assets/dungeon/sounds/win.mp3");
    this.load.audio("start", "assets/dungeon/sounds/start.mp3");
    this.load.audio("death", "assets/dungeon/sounds/death.mp3");
  }
  /*
    This part loads sprite sheets for game objects that need animations or variations.
    */
  loadSpritesheets() {
    this.load.spritesheet("player", "assets/dungeon/images/player.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("dust", "assets/dungeon/images/dust.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("coin", "assets/dungeon/images/coin.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("keys", "assets/dungeon/images/keys.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("bat", "assets/dungeon/images/bat.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("wizard", "assets/dungeon/images/wizard.png", {
      frameWidth: 48,
      frameHeight: 48
    });
  }
  /*
    This one adds the load bar to the scene.
    */
  createBars() {
    this.loadBar = this.add.graphics();
    this.loadBar.fillStyle(43771, 1);
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
};

// games/dungeon/scenes/outro.ts
var Outro = class extends Phaser.Scene {
  constructor() {
    super({ key: "outro" });
    __publicField(this, "name");
    __publicField(this, "number");
    __publicField(this, "next");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "scoreCoins");
    __publicField(this, "scoreSeconds");
    __publicField(this, "player");
  }
  init(data) {
    this.name = data.name;
    this.number = data.number;
    this.next = data.next;
  }
  /*
  First, we add all elements to the scene: player image, score, text, and the input to restart the game.
    */
  create() {
    this.width = +this.sys.game.config.width;
    this.height = +this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.showPlayer();
    this.sound.add("win").play();
    this.scoreCoins = this.add.bitmapText(
      this.center_width,
      50,
      "default",
      "Coins: " + this.registry.get("coins"),
      25
    ).setOrigin(0.5).setScrollFactor(0);
    this.scoreSeconds = this.add.bitmapText(
      this.center_width,
      100,
      "default",
      "Time: " + this.registry.get("seconds"),
      25
    ).setOrigin(0.5).setScrollFactor(0);
    this.add.bitmapText(
      this.center_width,
      this.center_height - 20,
      "default",
      "YOU DID IT!!",
      40
    ).setOrigin(0.5);
    this.add.bitmapText(
      this.center_width,
      this.center_height + 40,
      "default",
      "Press space to restart",
      25
    ).setOrigin(0.5);
    this.input.keyboard?.on("keydown-ENTER", () => this.loadNext(), this);
    this.input.keyboard?.on("keydown-SPACE", () => this.loadNext(), this);
  }
  loadNext() {
    this.scene.start("splash");
  }
  /*
     We show the player image and play the idle animation.
   */
  showPlayer() {
    this.player = this.add.sprite(this.center_width, this.center_height - 120, "player").setOrigin(0.5).setScale(3);
    this.anims.create({
      key: "playeridle",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1
    });
    this.player.anims.play("playeridle");
  }
};

// games/dungeon/scenes/splash.ts
var Splash = class extends Phaser.Scene {
  constructor() {
    super({ key: "splash" });
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "backLayer");
    __publicField(this, "theme");
    __publicField(this, "textShadow1");
    __publicField(this, "textShadow2");
    __publicField(this, "text1");
    __publicField(this, "text2");
    __publicField(this, "text11");
    __publicField(this, "text22");
    __publicField(this, "space");
    __publicField(this, "player");
    __publicField(this, "foe");
  }
  /*
   As always, we create everything we need on the scene from the create method.
   */
  create() {
    this.width = +this.sys.game.config.width;
    this.height = +this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.backLayer = this.add.layer();
    this.cameras.main.setBackgroundColor(0);
    this.showTitle();
    this.addPlayerAndFoe();
    this.addAnimationTweens();
    this.time.delayedCall(1e3, () => this.showInstructions(), void 0, this);
    this.input.keyboard?.on("keydown-SPACE", () => this.startGame(), this);
    this.input.keyboard?.on("keydown-ENTER", () => this.startGame(), this);
    this.playMusic();
  }
  startGame() {
    if (this.theme) this.theme.stop();
    this.scene.start("transition");
  }
  /*
     This shows the title of the game. It's a bitmap text with a shadow and a tween to make it move.
   */
  showTitle() {
    this.textShadow1 = this.add.bitmapText(this.center_width, 100, "default", "DUNGEON", 85).setTint(16742522).setOrigin(0.5);
    this.textShadow2 = this.add.bitmapText(this.center_width, 250, "default", "BOBBLE", 85).setTint(16742522).setOrigin(0.5);
    this.text1 = this.add.bitmapText(this.center_width, 100, "default", "DUNGEON", 85).setTint(3153968).setOrigin(0.5);
    this.text2 = this.add.bitmapText(this.center_width, 250, "default", "BOBBLE", 85).setTint(3153968).setOrigin(0.5);
    this.text11 = this.add.bitmapText(this.center_width, 100, "default", "DUNGEON", 88).setTint(43771).setOrigin(0.5);
    this.text22 = this.add.bitmapText(this.center_width, 250, "default", "BOBBLE", 88).setTint(43771).setOrigin(0.5);
    this.tweens.add({
      targets: [this.textShadow1, this.textShadow2],
      duration: 1e3,
      x: "+=10",
      y: "+=10",
      yoyo: true,
      repeat: -1
    });
  }
  /*
     This method plays the music of the game. It's a looped music with a volume of 0.3.
   */
  playMusic(theme = "splash") {
    this.theme = this.sound.add(theme);
    this.theme.stop();
    this.theme.play({
      mute: false,
      volume: 0.3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    });
  }
  /*
     This method shows the instructions of the game, the classic controls, the author, and a blinking text to start the game.
   */
  showInstructions() {
    this.add.bitmapText(this.center_width, 430, "default", "WASD/Arrows: move", 30).setDropShadow(1, 1, 16742522, 0.7).setOrigin(0.5);
    this.add.sprite(this.center_width - 60, 490, "pello").setOrigin(0.5).setScale(0.3);
    this.add.bitmapText(this.center_width + 40, 490, "default", "By PELLO", 15).setDropShadow(1, 1, 16742522, 0.7).setOrigin(0.5);
    this.space = this.add.bitmapText(this.center_width, 550, "default", "Press SPACE to start", 25).setDropShadow(1, 1, 4007227, 0.7).setOrigin(0.5);
    this.tweens.add({
      targets: this.space,
      duration: 300,
      alpha: { from: 0, to: 1 },
      repeat: -1,
      yoyo: true
    });
  }
  /*
     This method adds the player and the foe to the scene and creates the animations for both.
   */
  addPlayerAndFoe() {
    this.player = this.add.sprite(this.width - 100, 350, "player").setScale(2);
    this.anims.create({
      key: "playeridle",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });
    this.player.anims.play("playeridle");
    this.foe = this.add.sprite(this.width, 350, "wizard").setScale(2);
    this.anims.create({
      key: "foe",
      frames: this.anims.generateFrameNumbers("wizard", { start: 0, end: 4 }),
      frameRate: 5,
      repeat: -1
    });
    this.foe.anims.play("foe");
  }
  /*
     We also add some tweens to the player and the foe to make them move. The interesting part is how we can use the tweens to simulate a walk cycle. We just need to change the x value of the target and flip the sprite.
   */
  addAnimationTweens() {
    this.tweens.add({
      targets: [this.player],
      x: { from: this.player.x, to: 0 },
      duration: 2500,
      yoyo: true,
      repeat: -1,
      onYoyo: () => {
        this.player.flipX = !this.player.flipX;
      },
      onRepeat: () => {
        this.player.flipX = !this.player.flipX;
      }
    });
    this.tweens.add({
      targets: [this.foe],
      x: { from: this.foe.x, to: 100 },
      duration: 2500,
      yoyo: true,
      repeat: -1,
      onYoyo: () => {
        this.foe.flipX = !this.foe.flipX;
      },
      onRepeat: () => {
        this.foe.flipX = !this.foe.flipX;
      }
    });
  }
};

// games/dungeon/scenes/transition.ts
var Transition = class extends Phaser.Scene {
  constructor() {
    super({ key: "transition" });
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "key");
    __publicField(this, "theme");
  }
  /*
  In this short transition before the game, we show the instructions and the keys to press to start the game. This scene becomes the prelude right before the game to make the player ready.
    */
  create() {
    this.sound.stopAll();
    this.width = +this.sys.game.config.width;
    this.height = +this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.sound.add("start").play();
    this.playMusic();
    this.key = this.add.sprite(this.center_width, this.center_height - 120, "keys", 0).setOrigin(0.5).setScale(2);
    this.add.bitmapText(
      this.center_width,
      this.center_height - 20,
      "default",
      "GET ALL KEYS",
      30
    ).setOrigin(0.5);
    this.add.bitmapText(
      this.center_width,
      this.center_height + 40,
      "default",
      "from all rooms!",
      25
    ).setOrigin(0.5);
    this.input.keyboard?.on("keydown-ENTER", () => this.loadNext(), this);
    this.input.keyboard?.on("keydown-SPACE", () => this.loadNext(), this);
    this.time.delayedCall(1e3, () => this.loadNext(), void 0, this);
  }
  loadNext() {
    this.scene.start("game");
  }
  /*
  We play the music in a loop from the transition. This way the music doesn't stop when the player goes to the game and it dies. Once the player is in the game scene, if it dies he will be respawned in that scene and this music should continue playing, so it will not stop and start all the time.
    */
  playMusic(theme = "music") {
    this.theme = this.sound.add(theme);
    this.theme.stop();
    this.theme.play({
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    });
  }
};

// games/dungeon/gameobjects/bat.ts
var Bat = class extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture = "bat", _ground) {
    super(scene.matter.world, x, y, texture, 0);
    __publicField(this, "label");
    __publicField(this, "startX");
    __publicField(this, "direction");
    __publicField(this, "dead", false);
    this.label = "bat";
    this.scene = scene;
    this.scene.add.existing(this);
    this.startX = x;
    this.direction = Phaser.Math.RND.pick([-1, 1]);
    this.setFixedRotation();
    this.setIgnoreGravity(true);
    this.addCollisions();
    this.init();
  }
  /*
     Initiate the bat animation and movement. Also, add the update event to the scene so it will update in this class.
   */
  init() {
    this.scene.anims.create({
      key: this.label,
      frames: this.scene.anims.generateFrameNumbers(this.label, {
        start: 0,
        end: 1
      }),
      frameRate: 5,
      repeat: -1
    });
    this.scene.anims.create({
      key: this.label + "death",
      frames: this.scene.anims.generateFrameNumbers(this.label, {
        start: 2,
        end: 5
      }),
      frameRate: 5
    });
    this.anims.play(this.label, true);
    this.on("animationcomplete", this.animationComplete, this);
    this.setVelocityX(this.direction * 5);
    this.scene.events.on("update", this.update, this);
  }
  /*
     We add the collision event to the scene so we can handle the collision with the bat and the bubble.
   */
  addCollisions() {
  }
  onBatCollide({ gameObjectA, gameObjectB }) {
    if (gameObjectB instanceof Bubble) {
      gameObjectB.load("bat");
      this.destroy();
    }
  }
  /*
     Update the bat movement. If the bat is not moving anymore, we turn it around.
   */
  update() {
    if (!this.active) return;
    if (Math.abs(this.body.velocity.x) <= 0.5) this.turn();
  }
  /*
     This function turns the bat around and sets the velocity to the new direction.
   */
  turn() {
    this.direction = -this.direction;
    this.flipX = this.direction > 0;
    this.setFlipX(this.direction > 0);
    this.setVelocityX(this.direction * 5);
  }
  /*
     We don't destroy the bat directly, we kill the bat and play the death animation.
   */
  death() {
    this.dead = true;
    this.anims.play(this.label + "death");
  }
  /*
     This destroys the bat after the death animation is complete.
   */
  animationComplete(animation, _frame) {
    if (animation.key === this.label + "death") {
      this.destroy();
    }
  }
};

// games/dungeon/gameobjects/fireball.ts
var Fireball = class extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, direction) {
    super(scene.matter.world, x, y, "fireball", 0);
    __publicField(this, "label");
    __publicField(this, "direction");
    __publicField(this, "tween");
    this.label = "fireball";
    this.scene = scene;
    this.direction = direction;
    scene.add.existing(this);
    this.setIgnoreGravity(true);
    this.setVelocityX(5 * this.direction);
    this.setVelocityY(Phaser.Math.Between(0, -8));
    this.setBounce(1);
    this.init();
  }
  /*
     We create the animation for the fireball and add the update event to the scene so it will update in this class.
   */
  init() {
    this.scene.events.on("update", this.update, this);
    this.tween = this.scene.tweens.add({
      targets: this,
      duration: 200,
      scale: { from: 0.9, to: 1 },
      repeat: -1
    });
    this.scene.time.delayedCall(
      3e3,
      () => {
        this.destroy();
      },
      void 0,
      this
    );
  }
  update() {
    if (this.scene?.gameOver) return;
  }
  destroy() {
    this.tween?.destroy();
    super.destroy();
  }
};

// games/dungeon/gameobjects/wizard.ts
var Wizard = class extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture = "wizard", _ground) {
    super(scene.matter.world, x, y, texture, 0);
    __publicField(this, "label");
    __publicField(this, "startX");
    __publicField(this, "direction");
    __publicField(this, "timer");
    __publicField(this, "delayedTurn");
    __publicField(this, "fireball");
    this.label = "wizard";
    this.scene.add.existing(this);
    this.startX = x;
    this.direction = Phaser.Math.RND.pick([-1, 1]);
    this.setFixedRotation();
    this.addCollisions();
    this.init();
  }
  /*
  This function inits the wizard. It creates the animations and the update event. Also, we create a timer that will be used to shoot the fireballs.
    */
  init() {
    this.scene.anims.create({
      key: this.label,
      frames: this.scene.anims.generateFrameNumbers(this.label, {
        start: 0,
        end: 5
      }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.play(this.label, true);
    this.scene.events.on("update", this.update, this);
    this.timer = this.scene.time.addEvent({
      delay: 3e3,
      callback: this.directShot,
      callbackScope: this,
      loop: true
    });
  }
  /*
  As we did with the player and the bat, we create this callback to handle the collision with the bubble.
    */
  addCollisions() {
  }
  /*
  This will be called when the bubble hits the wizard. We "load" the wizard inside the bubble and destroy the wizard.
    */
  onWizardCollide({ gameObjectA, gameObjectB }) {
    if (gameObjectB instanceof Bubble) {
      gameObjectB.load("wizard");
      this.destroy();
    }
  }
  /*
  The wizard will try to shoot directly at the player. It will shoot a fireball and then turn around.
    */
  directShot() {
    this.scene.playAudio("fireball");
    const distance = Phaser.Math.Distance.BetweenPoints(
      this.scene.player,
      this
    );
    this.anims.play("wizardshot", true);
    const fireball = new Fireball(this.scene, this.x, this.y, this.direction);
    this.delayedTurn = this.scene.time.delayedCall(
      1e3,
      () => {
        this.turn();
      },
      void 0,
      this
    );
  }
  /*
   This method takes care of turning the wizard around.
   */
  turn() {
    this.direction = -this.direction;
    this.flipX = this.direction > 0;
    this.setFlipX(this.direction > 0);
    this.setVelocityX(this.direction * 5);
  }
  /*
  This will be called when the wizard is destroyed. We destroy the timer and the delayed turn before destroying the wizard.
    */
  destroy() {
    if (this.timer) this.timer.destroy();
    if (this.delayedTurn) this.delayedTurn.destroy();
    if (this.fireball) this.fireball.destroy();
    super.destroy();
  }
};

// games/dungeon/gameobjects/bubble.ts
var Bubble = class extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, offset, options = { isStatic: true }) {
    super(scene.matter.world, x + offset, y, "bubble", 0, options);
    __publicField(this, "offset");
    __publicField(this, "startX");
    __publicField(this, "startY");
    __publicField(this, "loaded", null);
    __publicField(this, "loadedTween");
    __publicField(this, "blob");
    this.offset = offset;
    this.setFriction(1, 0, Infinity);
    this.startX = x;
    this.startY = y;
    this.scene = scene;
    scene.add.existing(this);
    this.moveVertically();
    this.scene.events.on("update", this.update, this);
  }
  /*
     This function loads the sprite that will be inside the bubble. It also creates a tween to make it rotate.
   */
  load(sprite) {
    this.scene.playAudio("trap");
    this.loaded = this.scene.add.sprite(this.x, this.y, sprite).setOrigin(0.5).setScale(0.6);
    this.loaded.name = sprite;
    this.loadedTween = this.scene.tweens.add({
      targets: this.loaded,
      rotation: "+=5",
      yoyo: true,
      repeat: -1
    });
  }
  /*
     This method moves the bubble horizontally. It happens when the bubble is launched.
   */
  moveHorizontally() {
    this.scene.tweens.add({
      targets: this,
      scaleX: { from: 1, to: 0.9 },
      yoyo: true,
      repeat: -1,
      duration: 200
    });
    this.scene.tweens.addCounter({
      from: 0,
      to: Phaser.Math.Between(-400, 400),
      duration: 3500,
      ease: Phaser.Math.Easing.Sine.InOut,
      onUpdate: (tween, target) => {
        const x = this.startX + target.value;
        const dx = x - this.x;
        this.x = x;
        this.setVelocityX(dx);
      },
      onComplete: () => {
        this.scene.time.delayedCall(
          1e3,
          () => {
            this.destroy();
          },
          void 0,
          this
        );
      }
    });
  }
  /*
     This one moves the bubble vertically. It moves the bubble with a tween and then it destroys it.
   */
  moveVertically() {
    this.blob = this.scene.tweens.add({
      targets: this,
      scaleX: { from: 1, to: 0.9 },
      yoyo: true,
      repeat: -1,
      duration: 200
    });
    this.scene.tweens.addCounter({
      from: 0,
      to: -300,
      duration: 4500,
      ease: Phaser.Math.Easing.Sine.InOut,
      onUpdate: (tween, target) => {
        const y = this.startY + target.value;
        const dy = y - this.y;
        this.y = y;
        this.setVelocityY(dy);
      },
      onComplete: () => {
        this.blob?.destroy();
        this.scene.time.delayedCall(
          1e3,
          () => {
            this.destroy();
          },
          void 0,
          this
        );
      }
    });
  }
  /*
     When a bubble is destroyed, we respawn the sprite that was inside it, setting it free.
   */
  respawn() {
    this.loadedTween?.destroy();
    if (this.loaded?.name === "wizard") {
      new Wizard(this.scene, this.x, this.y);
    } else if (this.loaded?.name === "bat") {
      new Bat(this.scene, this.x, this.y);
    }
    this.loaded?.destroy();
    this.loaded = null;
  }
  /*
     We update the position of the sprite that was inside the bubble.
   */
  update() {
    if (!this.active) return;
    if (this.loaded) {
      this.loaded.x = this.x;
      this.loaded.y = this.y;
    }
  }
  /*
     This is called when the bubble is destroyed. We play the crash sound and respawn the sprite that was inside it and finally we actually destroy the bubble game object.
   */
  destroy() {
    if (!this.scene) return;
    this.scene.playAudio("crash");
    if (this.loaded) this.respawn();
    super.destroy();
  }
};

// games/dungeon/gameobjects/particle.ts
var Dust = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "dust", tween = false) {
    super(scene, x, y, name);
    this.scene = scene;
    this.name = name;
    this.setScale(0.5);
    this.scene.add.existing(this);
    this.init(tween);
  }
  /*
     This dust is a simple sprite that plays an animation and then destroys itself. It's used when the player lands, slides on a wall, or jumps. We can optionally add a tween to make it fade out.
   */
  init(tween) {
    if (tween) {
      this.scene.tweens.add({
        targets: this,
        duration: Phaser.Math.Between(500, 1e3),
        alpha: { from: 1, to: 0 },
        onComplete: () => {
          this.destroy();
        }
      });
    }
    this.scene.anims.create({
      key: this.name,
      frames: this.scene.anims.generateFrameNumbers(this.name, {
        start: 0,
        end: 10
      }),
      frameRate: 10
    });
    this.on("animationcomplete", this.animationComplete, this);
    this.anims.play(this.name, true);
  }
  animationComplete() {
    this.destroy();
  }
};

// games/dungeon/gameobjects/player.ts
var Player = class {
  constructor(scene, x, y) {
    __publicField(this, "label");
    __publicField(this, "moveForce");
    __publicField(this, "invincible");
    __publicField(this, "isTouching");
    __publicField(this, "canJump");
    __publicField(this, "jumpCooldownTimer");
    __publicField(this, "canShoot");
    __publicField(this, "shootCooldownTimer");
    __publicField(this, "onWall");
    __publicField(this, "sprite");
    __publicField(this, "sensors");
    __publicField(this, "cursor");
    __publicField(this, "W");
    __publicField(this, "A");
    __publicField(this, "S");
    __publicField(this, "D");
    __publicField(this, "isOnGround", false);
    __publicField(this, "isInAir", false);
    __publicField(this, "destroyed", false);
    this.scene = scene;
    this.label = "player";
    this.moveForce = 0.01;
    this.invincible = true;
    this.isTouching = { left: false, right: false, ground: false };
    this.canJump = true;
    this.jumpCooldownTimer = null;
    this.canShoot = true;
    this.shootCooldownTimer = null;
    this.onWall = false;
    this.init(x, y);
    this.addControls();
  }
  /*
     The init method is called from the constructor and in this case, it has several jobs. This is just a conventional class that contains a compound body: it consists of different bodies for the player, and we need to add them to the Matter world. We also need to add the player sprite to the scene and set up the animations. Finally, we need to add the colliders and events that will be used to control the player. If you set the debug to true you'll see the different bodies that make up the player. The ones on the sides it's used to detect collisions with walls and be able to climb up.
   */
  init(x, y) {
    this.scene.matter.world.on("beforeupdate", this.resetTouching, this);
    this.sprite = this.scene.matter.add.sprite(0, 0, "player", 0);
    const { width: w, height: h } = this.sprite;
    this.addEvents();
    this.addColliders();
    this.addAnimations();
    this.initInvincible();
  }
  /*
     We attach this class to the scene events, so we can update the player on every frame. We also add the destroy method to the scene events, so we can clean up the player when the scene is destroyed.
   */
  addEvents() {
    this.scene.events.on("update", this.update, this);
    this.scene.events.once("shutdown", this.destroy, this);
    this.scene.events.once("destroy", this.destroy, this);
  }
  /*
     These are the collider events that will be used to control the player. We use the MatterCollision plugin to detect collisions between the player and the walls. We also use the onSensorCollide method to detect collisions with the sensors that we added to the player. This is used to detect collisions with the walls and the ground.
   */
  addColliders() {
  }
  /*
     These define the different animation states to the player: idle, walking, shooting, etc.
   */
  addAnimations() {
    this.scene.anims.create({
      key: "playeridle",
      frames: this.scene.anims.generateFrameNumbers(this.label, {
        start: 0,
        end: 1
      }),
      frameRate: 5,
      repeat: -1
    });
    this.scene.anims.create({
      key: "playerwalk",
      frames: this.scene.anims.generateFrameNumbers(this.label, {
        start: 0,
        end: 3
      }),
      frameRate: 6
    });
    this.scene.anims.create({
      key: "playershot",
      frames: this.scene.anims.generateFrameNumbers(this.label, {
        start: 4,
        end: 5
      }),
      frameRate: 4
    });
    this.sprite.anims.play("playeridle", true);
    this.sprite.on("animationcomplete", this.animationComplete, this);
  }
  /*
     When the player is just created, it's invincible for a short time. This is done by a flag and changing the alpha of the sprite, so it blinks.
   */
  initInvincible() {
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: { from: 0.5, to: 1 },
      duration: 200,
      repeat: 10,
      onComplete: () => {
        this.invincible = false;
      }
    });
  }
  /*
     This is the method that is called when the player collides with something. We use it to detect collisions with the walls and the ground. We also use it to detect collisions with the sensors that we added to the player. This is used to detect collisions with the walls and the ground.
   */
  onSensorCollide({ bodyA, bodyB, pair }) {
    if (bodyB.isSensor) return;
    if (bodyA === this.sensors.left) {
      this.friction();
      this.onWall = true;
      this.isTouching.left = true;
      if (pair.separation > 0.5) this.sprite.x += pair.separation - 0.5;
    } else if (bodyA === this.sensors.right) {
      this.friction();
      this.onWall = true;
      this.isTouching.right = true;
      if (pair.separation > 0.5) this.sprite.x -= pair.separation - 0.5;
    } else if (bodyA === this.sensors.bottom) {
      this.land();
      this.isTouching.ground = true;
    }
  }
  /*
     This is used to reset the isTouching flags so we can determine if the player is on the ground or not.
   */
  resetTouching() {
    this.isTouching.left = false;
    this.isTouching.right = false;
    this.isTouching.ground = false;
  }
  /*
     This is used to add the controls to the player: WASD and arrows. We use the cursor keys to move the player and shoot bubbles.
   */
  addControls() {
    if (!this.scene.input.keyboard) throw "Unable to get keyboard input";
    this.cursor = this.scene.input.keyboard.createCursorKeys();
    this.W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }
  /*
     This is the game loop for the player. This is called on every frame. We check the input and move the player accordingly. We also check if the player is on the ground or not, and if it is, we allow it to jump. We also check if the player is in the air and touching a wall, so we can allow it to climb up.
   */
  update() {
    this.isOnGround = this.isTouching.ground;
    this.isInAir = !this.isOnGround;
    this.moveForce = this.isOnGround ? 0.01 : 5e-3;
    if (this.D.isDown || this.cursor.right.isDown) {
      this.sprite.setFlipX(true);
      if (!(this.isInAir && this.isTouching.right)) {
        this.step();
        this.sprite.anims.play("playerwalk", true);
        this.sprite.setVelocityX(5);
      }
    } else if (this.A.isDown || this.cursor.left.isDown) {
      this.sprite.setFlipX(false);
      if (!(this.isInAir && this.isTouching.left)) {
        this.step();
        this.sprite.anims.play("playerwalk", true);
        this.sprite.setVelocityX(-5);
      }
    } else {
      if (this.sprite.anims.currentAnim?.key !== "playershot") {
        this.sprite.anims.play("playeridle", true);
      }
    }
    if (this.sprite.body && this.sprite.body.velocity.x > 7) this.sprite.setVelocityX(7);
    else if (this.sprite.body && this.sprite.body.velocity.x < -7) this.sprite.setVelocityX(-7);
    this.checkJump();
    this.checkShoot();
  }
  /*
     If the player is jumping, we add a cooldown timer so it can't jump again until it touches the ground.
   */
  checkJump() {
    if ((this.canJump && this.isOnGround || this.onWall) && (this.W.isDown || this.cursor.up.isDown)) {
      this.sprite.setVelocityY(-8);
      this.scene.playAudio("jump");
      this.canJump = false;
      this.onWall = false;
      this.jumpCooldownTimer = this.scene.time.addEvent({
        delay: 250,
        callback: () => this.canJump = true
      });
    }
  }
  /*
     Same as we did with the jump, here we add a cooldown timer to the shooting so the player can't shoot again until the cooldown is over.
   */
  checkShoot() {
    if (this.canShoot && (Phaser.Input.Keyboard.JustDown(this.cursor.down) || Phaser.Input.Keyboard.JustDown(this.W))) {
      const offset = this.sprite.flipX ? 128 : -128;
      this.sprite.anims.play("playershot", true);
      this.scene.playAudio("bubble");
      this.canShoot = false;
      new Bubble(this.scene, this.sprite.x, this.sprite.y, offset);
      this.shootCooldownTimer = this.scene.time.addEvent({
        delay: 500,
        callback: () => this.canShoot = true
      });
    }
  }
  /*
     When the player is killed, apart from destroying the sprite, we also remove the events and colliders that we added to it.
   */
  destroy() {
    this.scene.playAudio("death");
    this.destroyed = true;
    this.scene.events.off("update", this.update, this);
    this.scene.events.off("shutdown", this.destroy, this);
    this.scene.events.off("destroy", this.destroy, this);
    if (this.scene.matter.world) {
      this.scene.matter.world.off("beforeupdate", this.resetTouching, this);
    }
    const sensors = [
      this.sensors.bottom,
      this.sensors.left,
      this.sensors.right
    ];
    if (this.jumpCooldownTimer) this.jumpCooldownTimer.destroy();
    this.sprite.destroy();
  }
  /*
  Every time the player moves, we add a few dust particles to the scene. This is done by creating a new Dust object. The same happens when the player is on the wall or landing after a jump. Probably there's a good chance to refactor this but in this particular case, for a couple of lines maybe it's not worth it.
    */
  step() {
    if (Phaser.Math.Between(0, 5) > 4) {
      this.scene.trailLayer.add(
        new Dust(
          this.scene,
          this.sprite.x,
          this.sprite.y + Phaser.Math.Between(10, 16)
        )
      );
    }
  }
  friction() {
    Array(Phaser.Math.Between(2, 4)).fill(0).forEach((i) => {
      new Dust(
        this.scene,
        this.sprite.x + Phaser.Math.Between(-8, 8),
        this.sprite.y + Phaser.Math.Between(-32, 32)
      );
    });
  }
  land() {
    if (this.sprite.body && this.sprite.body.velocity.y < 1) return;
    Array(Phaser.Math.Between(3, 6)).fill(0).forEach((i) => {
      new Dust(
        this.scene,
        this.sprite.x + Phaser.Math.Between(-32, 32),
        this.sprite.y + Phaser.Math.Between(10, 16)
      );
    });
  }
  /*
     This is called when the player dies, creating an explosion of dust particles.
     */
  explosion() {
    Array(Phaser.Math.Between(10, 15)).fill(0).forEach((i) => {
      new Dust(
        this.scene,
        this.sprite.x + Phaser.Math.Between(-32, 32),
        this.sprite.y + Phaser.Math.Between(20, 36)
      );
    });
  }
  /*
     This is called when the player finishes the shooting animation. We use it to play the idle animation again.
   */
  animationComplete(animation, frame) {
    if (animation.key === "playershot") {
      this.sprite.anims.play("playeridle", true);
    }
  }
};

// games/dungeon/gameobjects/dungeon_generator.ts
import Dungeon from "https://esm.sh/@mikewesthad/dungeon@2.0.1/es2022/dungeon.mjs";

// games/dungeon/gameobjects/coin.ts
var Coin = class extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture = "coin", options = { isStatic: true }) {
    super(scene.matter.world, x, y, texture, 0, options);
    __publicField(this, "label");
    __publicField(this, "tween");
    this.scene = scene;
    this.label = "coin";
    scene.add.existing(this);
    this.init();
  }
  /*
     The coin animation is created and played. Also, we add a tween to make it move up and down to make it more "desirable".
   */
  init() {
    this.scene.anims.create({
      key: this.label,
      frames: this.scene.anims.generateFrameNumbers(this.label, {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.play(this.label, true);
    this.tween = this.scene.tweens.add({
      targets: this,
      duration: 300,
      y: "-=5",
      repeat: -1,
      yoyo: true
    });
  }
  /*
     When the coin is collected, we stop the tween and destroy the coin.
   */
  destroy() {
    this.tween?.stop();
    super.destroy();
  }
};

// games/dungeon/gameobjects/key.ts
var key = class extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture = "keys", options = { isStatic: true }) {
    super(
      scene.matter.world,
      x,
      y,
      texture,
      Phaser.Math.RND.pick([0, 1]),
      options
    );
    __publicField(this, "label");
    __publicField(this, "tween");
    this.scene = scene;
    this.label = "keys";
    scene.add.existing(this);
    this.init();
  }
  /*
     As we did with the coin, we create the animation and add a tween to make it move up and down. We could possibly do something different here, like make it rotate. Or just reuse the same class as the coin.
     */
  init() {
    this.tween = this.scene.tweens.add({
      targets: this,
      duration: 300,
      y: "-=5",
      repeat: -1,
      yoyo: true
    });
  }
  destroy() {
    this.tween?.stop();
    super.destroy();
  }
};

// games/dungeon/gameobjects/seesaw.ts
var SeeSaw = class {
  constructor(scene, x, y, numTiles = 5) {
    const platform = scene.add.tileSprite(
      x,
      y,
      32 * numTiles / 2,
      18,
      "seesaw"
    );
    scene.matter.add.gameObject(platform, {
      restitution: 0,
      // No bounciness
      frictionAir: 0.2,
      // Spin forever without slowing down from air resistance
      friction: 0.2,
      // A little extra friction so the player sticks better
      // Density sets the mass and inertia based on area - 0.001 is the default. We're going lower
      // here so that the platform tips/rotates easily
      density: 5e-4
    });
    if (!platform.body) throw "";
    const constraint = scene.matter.constraint.create({
      pointA: { x: platform.x, y: platform.y },
      bodyB: platform.body,
      length: 0
    });
    scene.matter.world.add(constraint);
    const sign = Math.random() < 0.5 ? -1 : 1;
  }
};

// games/dungeon/gameobjects/dungeon_generator.ts
var DungeonGenerator = class {
  constructor(scene) {
    __publicField(this, "scene");
    __publicField(this, "dungeon");
    __publicField(this, "map");
    __publicField(this, "groundLayer");
    __publicField(this, "stuffLayer");
    this.scene = scene;
    this.generate();
  }
  /*
     This is the method that generates the whole dungeon. It's divided into different methods to make it more readable but basically, it generates the dungeon, and the map and then it places the different elements on the map.
   */
  generate() {
    this.generateDungeon();
    this.generateMap();
    this.dungeon.rooms.forEach((room) => {
      const { x, y, width, height } = room;
      this.groundLayer.weightedRandomize(
        [
          { index: 17, weight: 9 },
          // 9/10 times, use index 6
          { index: [7, 8, 9, 17, 18, 19], weight: 1 }
          // 1/10 times, randomly pick 7, 8 or 26
        ],
        x + 1,
        y + 1,
        width - 2,
        height - 2
      );
      this.placeCorners(room);
      this.placeWalls(room);
      const doors = room.getDoorLocations();
      this.addDoors(room, doors, x, y);
      this.addKey(room);
      this.addFoes(room);
      this.addCoins(room);
      this.addSeeSaw(room);
    });
  }
  /*
     This method generates the dungeon using the dungeon generator library. We just need to pass the width and height of the dungeon and some options. You can check the documentation of the library to see all the options available.
   */
  generateDungeon() {
    this.dungeon = new Dungeon({
      width: 50,
      height: 50,
      doorPadding: 2,
      rooms: {
        width: { min: 7, max: 15 },
        height: { min: 7, max: 15 },
        maxRooms: 12
      }
    });
  }
  /*
     This method adds a specific tilemap to our dungeon, with its layers and collisions.
   */
  generateMap() {
    this.map = this.scene.make.tilemap({
      tileWidth: 48,
      tileHeight: 48,
      width: this.dungeon.width,
      height: this.dungeon.height
    });
    const tileset = this.map.addTilesetImage("tiles", void 0, 48, 48, 0, 0);
    if (!tileset) throw "Unable to create tileset";
    this.groundLayer = this.map.createBlankLayer("Layer 1", tileset) ?? (() => {
      throw new Error("");
    })();
    this.stuffLayer = this.map.createBlankLayer("Stuff", tileset) ?? (() => {
      throw new Error("");
    })();
    const mappedTiles = this.dungeon.getMappedTiles({
      empty: -1,
      floor: -1,
      door: 3,
      wall: 0
    });
    this.groundLayer.putTilesAt(mappedTiles, 0, 0);
    this.groundLayer.setCollision(0);
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.groundLayer && this.scene.matter.world.convertTilemapLayer(this.groundLayer);
  }
  /*
     This method places the corners of the room. We use the tile index to place the corner tiles.
   */
  placeCorners(room) {
    const { left, right, top, bottom } = room;
    this.groundLayer.putTileAt(0, left, top);
    this.groundLayer.putTileAt(5, right, top);
    this.groundLayer.putTileAt(45, right, bottom);
    this.groundLayer.putTileAt(40, left, bottom);
  }
  /*
     This method places the walls of the room. We use the tile index to place the wall tiles. It uses a weighted randomize method to place the tiles which means that we can give more weight (frequency) to some tiles than others.
   */
  placeWalls(room) {
    const { width, height, left, right, top, bottom } = room;
    this.groundLayer?.weightedRandomize(
      [
        { index: 2, weight: 4 },
        { index: [1, 2, 3, 4], weight: 1 }
      ],
      left + 1,
      top,
      width - 2,
      1
    );
    this.groundLayer?.weightedRandomize(
      [
        { index: 42, weight: 4 },
        { index: [41, 42, 43, 44], weight: 1 }
      ],
      left + 1,
      bottom,
      width - 2,
      1
    );
    this.groundLayer?.weightedRandomize(
      [
        { index: 10, weight: 4 },
        { index: [10, 20, 30], weight: 1 }
      ],
      left,
      top + 1,
      1,
      height - 2
    );
    this.groundLayer?.weightedRandomize(
      [
        { index: 15, weight: 4 },
        { index: [15, 25, 35], weight: 1 }
      ],
      right,
      top + 1,
      1,
      height - 2
    );
  }
  /*
     As the name implies, this one adds the doors to the room. We use the tile index to place the door tiles.
   */
  addDoors(room, doors, x, y) {
    for (let i = 0; i < doors.length; i++) {
      const worldPosition = this.groundLayer?.tileToWorldXY(
        x + doors[i].x,
        y + doors[i].y
      );
      if (!worldPosition) throw "failed to determine worldPosition when adding doors";
      new Coin(this.scene, worldPosition.x + 20, worldPosition.y + 20);
      if (doors[i].y === 0) {
        this.groundLayer.putTilesAt([[7], [7]], x + doors[i].x, y + doors[i].y);
      } else if (doors[i].y === room.height - 1) {
        this.groundLayer.putTilesAt([[7], [7]], x + doors[i].x, y + doors[i].y);
      } else if (doors[i].x === 0) {
        this.groundLayer.putTilesAt([[7]], x + doors[i].x, y + doors[i].y);
      } else if (doors[i].x === room.width - 1) {
        this.groundLayer.putTilesAt([[7]], x + doors[i].x, y + doors[i].y);
      }
    }
  }
  /*
     Each room must have a key that the player has to collect. This method adds the key to the room.
   */
  addKey(room) {
    const keyX = Phaser.Math.Between(room.left + 2, room.right - 2);
    const keyY = Phaser.Math.Between(room.top + 2, room.bottom - 2);
    const worldPosition = this.groundLayer.tileToWorldXY(keyX, keyY);
    new key(this.scene, worldPosition.x + 22, worldPosition.y + 22);
  }
  /*
     Randomly, some rooms may have a seesaw. This method adds the seesaw to the center of the room.
   */
  addSeeSaw(room) {
    if (Phaser.Math.Between(0, 10) < 7) return;
    const worldPosition = this.groundLayer?.tileToWorldXY(
      room.centerX,
      room.centerY
    );
    if (!worldPosition) throw "Failed to get worldPosition when adding SeeSaw";
    new SeeSaw(
      this.scene,
      worldPosition.x + 22,
      worldPosition.y + 22,
      room.width
    );
  }
  /*
     Coins are randomly placed in the room. We use a random method to decide where to place the coins. It uses other helper methods to place the coins in different positions.
   */
  addCoins(room) {
    const where = Phaser.Math.RND.pick([
      "top",
      "bottom",
      "left",
      "right",
      "none"
    ]);
    const width = parseInt(room.width / 3 + "") - Phaser.Math.Between(1, 2);
    const height = parseInt(room.height / 3 + "") - Phaser.Math.Between(1, 2);
    switch (where) {
      case "top":
        this.addCoinsTop(room, width, height);
        break;
      case "bottom":
        this.addCoinsdBottom(room, width, height);
        break;
      case "left":
        this.addCoinsdLeft(room, width, height);
        break;
      case "right":
        this.addCoinsRight(room, width, height);
        break;
      default:
        break;
    }
  }
  addCoinsTop(room, width, height) {
    const keyY = room.top + Phaser.Math.Between(1, 2);
    const keyX = room.left + Phaser.Math.Between(1, 2);
    Array(width).fill(void 0).forEach((_x, i) => {
      Array(height).fill(void 0).forEach((y, j) => {
        const worldPosition = this.groundLayer.tileToWorldXY(
          keyX + i,
          keyY + j
        );
        if (!worldPosition) throw "Failed to get worldPosition";
        new Coin(this.scene, worldPosition.x + 20, worldPosition.y + 20);
      });
    });
  }
  addCoinsdBottom(room, width, height) {
    const keyY = room.bottom - Phaser.Math.Between(1, 2);
    const keyX = room.left + Phaser.Math.Between(1, 2);
    Array(width).fill(void 0).forEach((_x, i) => {
      Array(height).fill(void 0).forEach((_y, j) => {
        const worldPosition = this.groundLayer.tileToWorldXY(
          keyX + i,
          keyY - j
        );
        new Coin(this.scene, worldPosition.x + 20, worldPosition.y + 20);
      });
    });
  }
  addCoinsdLeft(room, width, height) {
    const keyY = room.top + Phaser.Math.Between(3, 4);
    const keyX = room.left + Phaser.Math.Between(1, 2);
    Array(width).fill(void 0).forEach((_x, i) => {
      Array(height).fill(void 0).forEach((_y, j) => {
        const worldPosition = this.groundLayer.tileToWorldXY(
          keyX + i,
          keyY - j
        );
        new Coin(this.scene, worldPosition.x + 20, worldPosition.y + 20);
      });
    });
  }
  addCoinsRight(room, width, height) {
    const keyY = room.top + Phaser.Math.Between(1, 2);
    const keyX = room.right - Phaser.Math.Between(3, 4);
    Array(width).fill(void 0).forEach((_x, i) => {
      Array(height).fill(void 0).forEach((_y, j) => {
        const worldPosition = this.groundLayer.tileToWorldXY(
          keyX - i,
          keyY + j
        );
        new Coin(this.scene, worldPosition.x + 20, worldPosition.y + 20);
      });
    });
  }
  addFoes(room) {
    const keyX = Phaser.Math.Between(room.left + 2, room.right - 2);
    const keyY = Phaser.Math.Between(room.top + 2, room.bottom - 2);
    const worldPosition = this.groundLayer.tileToWorldXY(keyX, keyY);
    if (Phaser.Math.Between(0, 5) > 4) {
      new Wizard(
        this.scene,
        worldPosition.x + 22,
        worldPosition.y + 22,
        void 0,
        this.groundLayer
      );
    } else {
      new Bat(
        this.scene,
        worldPosition.x + 22,
        worldPosition.y + 22,
        void 0,
        this.groundLayer
      );
    }
  }
  /*
     This one adds the top traps or spikes to the room. Finally is not used in the game but it's a good example of how to add more elements to the dungeon.
   */
  addTopTraps(room) {
    const { x, y, width, height, left, right, top, bottom, tiles } = room;
    const topTiles = tiles[0];
    topTiles.forEach((tile, i) => {
      if (tile === 1 && i > 0 && i < right) {
        this.groundLayer.putTileAt(5, i + left, top + 1);
      }
    });
  }
};

// games/dungeon/scenes/game.ts
var Game = class extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    __publicField(this, "player");
    __publicField(this, "score");
    __publicField(this, "scoreText");
    __publicField(this, "scoreCoins");
    __publicField(this, "scoreSeconds");
    __publicField(this, "scoreKeys");
    __publicField(this, "name");
    __publicField(this, "number");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "dungeon");
    __publicField(this, "timer");
    __publicField(this, "trailLayer");
    __publicField(this, "audios");
    __publicField(this, "gameOver");
    this.player = null;
    this.score = 0;
    this.scoreText = null;
  }
  init(data) {
    this.name = data.name;
    this.number = data.number;
  }
  preload() {
    this.registry.set("seconds", 0);
    this.registry.set("coins", 0);
    this.registry.set("keys", 0);
  }
  /*
     From this, we create the whole thing. We call the methods to add the map, the player, the collisions, the camera and the scores.
   */
  create() {
    this.width = +this.sys.game.config.width;
    this.height = +this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.addMap();
    this.addPlayer();
    this.addCollisions();
    this.addCamera();
    this.addScores();
    this.loadAudios();
  }
  /*
     This method creates the map using the DungeonGenerator class.
   */
  addMap() {
    this.dungeon = new DungeonGenerator(this);
    this.input.keyboard?.on("keydown-ENTER", () => this.finishScene(), this);
  }
  /*
     This method adds the scores to the scene. We add the coins, the seconds, the keys and the timer. We'll update them with other methods.
   */
  addScores() {
    this.add.sprite(62, 26, "coin", 0).setOrigin(0.5).setScrollFactor(0).setScale(0.8);
    this.scoreCoins = this.add.bitmapText(100, 24, "default", "x0", 15).setOrigin(0.5).setScrollFactor(0);
    this.scoreSeconds = this.add.bitmapText(this.center_width, 24, "default", "0", 15).setOrigin(0.5).setScrollFactor(0);
    this.add.sprite(this.width - 90, 24, "keys", 0).setOrigin(0.5).setScrollFactor(0).setScale(0.8);
    this.scoreKeys = this.add.bitmapText(this.width - 48, 24, "default", "x0", 15).setOrigin(0.5).setScrollFactor(0);
    this.timer = this.time.addEvent({
      delay: 1e3,
      callback: () => {
        this.updateSeconds();
      },
      callbackScope: this,
      loop: true
    });
  }
  /*
     This method adds the player to the scene. It creates a new Player object along with a trail layer that will be used to draw the trail of the player.
   */
  addPlayer() {
    this.trailLayer = this.add.layer();
    this.player = new Player(
      this,
      this.dungeon.map.widthInPixels / 2,
      this.dungeon.map.heightInPixels / 2
      // 100, 
    );
  }
  /*
   This method sets up the collisions between the player and anything else. Basically, it sets a callback function that will be called when the player collides with something.
   */
  addCollisions() {
  }
  /*
   This is the callback that we call when the player collides with something. We check the label of the object that the player collides with and call the corresponding method.
   */
  onPlayerCollide({ gameObjectA, gameObjectB }) {
    if (!gameObjectB) return;
    if (gameObjectB.label === "coin") this.playerPicksCoin(gameObjectB);
    if (gameObjectB.label === "keys") this.playerPicksKey(gameObjectB);
    if (gameObjectB.label === "bat") this.playerHitsFoe(gameObjectB);
    if (gameObjectB.label === "wizard") this.playerHitsFoe(gameObjectB);
    if (gameObjectB.label === "fireball") this.playerHitsFoe(gameObjectB);
    if (!(gameObjectB instanceof Phaser.Tilemaps.Tile)) return;
    const tile = gameObjectB;
  }
  /*
   This is called when a player picks a coin. It destroys the coin and updates the score.
   */
  playerPicksCoin(coin) {
    this.showPoints(coin.x, coin.y, "1", this.scoreCoins);
    coin.destroy();
    this.updateCoins();
    this.playAudio("coin");
  }
  /*
   Same as the previous one but with the key.
   */
  playerPicksKey(key2) {
    this.updateKeys();
    this.showPoints(
      key2.x,
      key2.y,
      this.registry.get("keys") + "/" + this.dungeon.dungeon.rooms.length,
      this.scoreKeys
    );
    key2.destroy();
  }
  /*
   Unless the player is invincible (blinking at the beginning), this is called when the player hits any foe. It kills the player, destroys the foe, and restarts the scene.
   */
  playerHitsFoe(foe) {
    if (this.player?.invincible) return;
    this.player?.explosion();
    foe.destroy();
    this.restartScene();
  }
  /*
   Every time we need to show points, we call this method. It creates a text element, adds a tween to it, and destroys it when the tween is finished.
   */
  showPoints(x, y, score, textElement, color = 16777215) {
    const text = this.add.bitmapText(x + 20, y - 80, "default", "+" + score, 10).setDropShadow(2, 3, color, 0.7).setOrigin(0.5);
    this.tweens.add({
      targets: text,
      duration: 1e3,
      alpha: { from: 1, to: 0 },
      x: {
        from: text.x + Phaser.Math.Between(-10, 10),
        to: text.x + Phaser.Math.Between(-40, 40)
      },
      y: { from: text.y - 10, to: text.y - 60 },
      onComplete: () => {
        text.destroy();
      }
    });
    this.textUpdateEffect(textElement, color);
  }
  /*
   This method adds the camera to the scene and the background color. It sets the bounds of the camera to the size of the map and makes it follow the player.
   */
  addCamera() {
    this.cameras.main.setBounds(
      0,
      0,
      this.dungeon.map.widthInPixels,
      this.dungeon.map.heightInPixels
    );
    this.player && this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);
    this.cameras.main.setBackgroundColor(2429722);
  }
  /*
   As we did in other games, here we add the audio files to the scene along with a method to play them.
   */
  loadAudios() {
    this.audios = {
      jump: this.sound.add("jump"),
      bubble: this.sound.add("bubble"),
      trap: this.sound.add("trap"),
      crash: this.sound.add("crash"),
      fireball: this.sound.add("fireball"),
      death: this.sound.add("death"),
      coin: this.sound.add("start")
    };
  }
  playAudio(key2) {
    this.audios[key2].play();
  }
  /*
   This method is called when the player dies. It makes the camera shake and fade out and then restarts the scene.
   */
  restartScene() {
    if (this.player) this.player.sprite.visible = false;
    this.cameras.main.shake(100);
    this.cameras.main.fade(250, 0, 0, 0);
    this.cameras.main.once("camerafadeoutcomplete", () => this.scene.restart());
  }
  /*
   If a player finishes the stage, we fade out the camera and start the outro scene.
   */
  finishScene() {
    this.cameras.main.fade(250, 0, 0, 0);
    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start("outro", {
        next: "underwater",
        name: "STAGE",
        number: this.number + 1
      });
    });
  }
  /*
     This method is called every second. It updates the seconds and the timer because, for any competitive player, time is the most important thing. We could add a scoreboard at the end ordered by time.
   */
  updateSeconds(points = 1) {
    const seconds = +this.registry.get("seconds") + points;
    this.registry.set("seconds", seconds);
    this.scoreSeconds.setText(seconds.toString());
  }
  /*
   The next two functions update the coins and keys scores. In the case of the keys, if the player has collected all the keys, we finish the scene.
   */
  updateCoins(points = 1) {
    const coins = +this.registry.get("coins") + points;
    this.registry.set("coins", coins);
    this.scoreCoins.setText("x" + coins);
  }
  updateKeys(points = 1) {
    const keys = +this.registry.get("keys") + points;
    this.registry.set("keys", keys);
    this.scoreKeys.setText("x" + keys);
    if (keys === this.dungeon.dungeon.rooms.length) {
      this.finishScene();
    }
  }
  /*
   We have this method to update the text elements when we add points to the score. In this class is not used currently but we could use it later or in other classes.
   */
  textUpdateEffect(textElement, color) {
    textElement.setTint(color);
    const prev = textElement.y;
    this.tweens.add({
      targets: textElement,
      duration: 100,
      alpha: { from: 1, to: 0.8 },
      scale: { from: 1.2, to: 1 },
      repeat: 5,
      onComplete: () => {
        textElement.setTint(16777215);
        textElement.y = prev;
      }
    });
  }
};

// games/dungeon/main.ts
var config = {
  width: 600,
  height: 600,
  scale: {
    mode: Phaser2.Scale.FIT,
    autoCenter: Phaser2.Scale.CENTER_BOTH
  },
  autoRound: false,
  parent: "game-container",
  physics: {
    default: "matter",
    matter: {
      debug: false
    }
  },
  plugins: {
    scene: []
  },
  scene: [Bootloader, Splash, Transition, Game, Outro]
};
var game = new Phaser2.Game(config);
//# sourceMappingURL=main.js.map
