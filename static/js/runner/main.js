var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// games/runner/main.ts
import Phaser2 from "https://esm.sh/phaser@4.0.0-rc.4";

// games/runner/gameobjects/player.ts
var Player = class extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, number) {
    super(scene, x, y, 32, 32, 65280);
    __publicField(this, "jumping");
    __publicField(this, "invincible");
    __publicField(this, "health");
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.collideWorldBounds = true;
    this.setScale(1);
    this.jumping = false;
    this.invincible = false;
    this.health = 10;
    this.body.mass = 10;
    this.body.setDragY(10);
  }
};
var player_default = Player;

// games/runner/gameobjects/generator.ts
var Generator = class {
  constructor(scene) {
    __publicField(this, "scene");
    __publicField(this, "pinos");
    this.scene = scene;
    this.scene.time.delayedCall(2e3, () => this.init(), void 0, this);
    this.pinos = 0;
  }
  init() {
    this.generateCloud();
    this.generateObstacle();
    this.generateCoin();
  }
  /*
  This is the function that generates the clouds. It creates a new cloud and then calls itself again after a random amount of time.
  
  This is done using the Phaser `time.delayedCall` function.
  */
  generateCloud() {
    new Cloud(this.scene);
    this.scene.time.delayedCall(
      Phaser.Math.Between(2e3, 3e3),
      () => this.generateCloud(),
      void 0,
      this
    );
  }
  generateObstacle() {
    this.scene.obstacles.add(
      new Obstacle(
        this.scene,
        800,
        this.scene.height - Phaser.Math.Between(32, 128)
      )
    );
    this.scene.time.delayedCall(
      Phaser.Math.Between(1500, 2500),
      () => this.generateObstacle(),
      void 0,
      this
    );
  }
  generateCoin() {
    this.scene.coins.add(
      new Coin(
        this.scene,
        800,
        this.scene.height - Phaser.Math.Between(32, 128)
      )
    );
    this.scene.time.delayedCall(
      Phaser.Math.Between(500, 1500),
      () => this.generateCoin(),
      void 0,
      this
    );
  }
};
var Cloud = class extends Phaser.GameObjects.Rectangle {
  constructor(scene, x = 800, y = Phaser.Math.Between(0, 100)) {
    super(scene, x, y, 98, 32, 16777215);
    scene.add.existing(this);
    const alpha = 1 / Phaser.Math.Between(1, 3);
    this.setScale(alpha);
    this.init();
  }
  init() {
    this.scene.tweens.add({
      targets: this,
      x: { from: 800, to: -100 },
      duration: 2e3 / this.scale,
      onComplete: () => {
        this.destroy();
      }
    });
  }
};
var Obstacle = class extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 32, 32, 16711680);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    const alpha = 1 / Phaser.Math.Between(1, 3);
    this.init();
  }
  init() {
    this.scene.tweens.add({
      targets: this,
      x: { from: 820, to: -100 },
      duration: 2e3,
      onComplete: () => {
        this.destroy();
      }
    });
  }
};
var Coin = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "coin");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    const alpha = 1 / Phaser.Math.Between(1, 3);
    this.init();
  }
  init() {
    this.scene.tweens.add({
      targets: this,
      x: { from: 820, to: -100 },
      duration: 2e3,
      onComplete: () => {
        this.destroy();
      }
    });
    const coinAnimation = this.scene.anims.create({
      key: "coin",
      frames: this.scene.anims.generateFrameNumbers("coin", {
        start: 0,
        end: 7
      }),
      frameRate: 8
    });
    this.play({ key: "coin", repeat: -1 });
  }
};

// games/runner/scenes/game.ts
var Game = class extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    __publicField(this, "player");
    __publicField(this, "score");
    __publicField(this, "scoreText");
    __publicField(this, "number");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "obstacles");
    __publicField(this, "coins");
    __publicField(this, "generator");
    __publicField(this, "SPACE");
    __publicField(this, "updateScoreEvent");
    __publicField(this, "audios");
    __publicField(this, "theme");
    __publicField(this, "jumpTween");
    __publicField(this, "name");
    this.player = null;
    this.score = 0;
    this.scoreText = null;
  }
  init(data) {
    this.name = data.name;
    this.number = data.number;
  }
  /*
    We use the `preload` method to load all the assets that we need for the game.
    We also set the score to 0 in the registry, so we can access it from other scenes.
    */
  preload() {
    this.registry.set("score", "0");
    this.load.audio("coin", "assets/runner/sounds/coin.mp3");
    this.load.audio("jump", "assets/runner/sounds/jump.mp3");
    this.load.audio("dead", "assets/runner/sounds/dead.mp3");
    this.load.audio("theme", "assets/runner/sounds/theme.mp3");
    this.load.spritesheet("coin", "./assets/runner/images/coin.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.bitmapFont(
      "arcade",
      "assets/runner/fonts/arcade.png",
      "assets/runner/fonts/arcade.xml"
    );
    this.score = 0;
  }
  /*
  Here we do several things.
  
  - We use the `create` method to initialize the game.
  - We set some variables to store width and height that we may need later.,
  - We set the background color, and create the player, the obstacles, and the coins.
  - We also create the keyboard input to listen to the space key.
  - Also, we add a collider between the player and the obstacles and an overlap
  between the player and the coins. The key part there is to set a function that will be called when the player overlaps with a coin or hits an obstacle.
  */
  create() {
    this.width = Number(this.sys.game.config.width);
    this.height = Number(this.sys.game.config.height);
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.cameras.main.setBackgroundColor(8900331);
    this.obstacles = this.add.group();
    this.coins = this.add.group();
    this.generator = new Generator(this);
    if (!this.input.keyboard) throw Error("No keyboard found");
    this.SPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.player = new player_default(this, this.center_width - 100, this.height - 200);
    this.scoreText = this.add.bitmapText(
      this.center_width,
      10,
      "arcade",
      this.score.toString(),
      20
    );
    this.physics.add.collider(
      this.player,
      this.obstacles,
      this.hitObstacle,
      () => {
        return true;
      },
      this
    );
    this.physics.add.overlap(
      this.player,
      this.coins,
      this.hitCoin,
      () => {
        return true;
      },
      this
    );
    this.loadAudios();
    this.playMusic();
    this.input.on(
      "pointerdown",
      (pointer) => this.jump(),
      this
    );
    this.updateScoreEvent = this.time.addEvent({
      delay: 100,
      callback: () => this.updateScore(),
      callbackScope: this,
      loop: true
    });
  }
  /*
  This method is called when the player hits an obstacle. We stop the updateScoreEvent so the score doesn't increase anymore.
  
  And obviously, we finish the scene.
  */
  hitObstacle(player, obstacle) {
    this.updateScoreEvent.destroy();
    this.finishScene();
  }
  /*
  This method is called when the player hits a coin. We play a sound, update the score, and destroy the coin.
  */
  hitCoin(player, coin) {
    this.playAudio("coin");
    this.updateScore(1e3);
    coin.destroy();
  }
  /*
  We use this `loadAudios` method to load all the audio files that we need for the game.
  
  Then we'll play them using the `playAudio` method.
  */
  loadAudios() {
    this.audios = {
      jump: this.sound.add("jump"),
      coin: this.sound.add("coin"),
      dead: this.sound.add("dead")
    };
  }
  playAudio(key) {
    this.audios[key].play();
  }
  /*
  This method is specific to the music. We use it to play the theme music in a loop.
  */
  playMusic(theme = "theme") {
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
  This is the game loop. The function is called every frame.
  
  Here is where we can check if a key was pressed or the situation of the player to act accordingly. We use the `update` method to check if the player pressed the space key.
  */
  update() {
    if (Phaser.Input.Keyboard.JustDown(this.SPACE)) {
      this.jump();
    } else if (this.player?.body.blocked.down) {
      this.jumpTween?.stop();
      this.player.rotation = 0;
    }
  }
  /*
  This is the method that we use to make the player jump. A jump is just a velocity in the Y-axis. Gravity will do the rest.
  
  We also play a jumping sound and we add a tween to rotate the player while jumping.
  */
  jump() {
    if (!this.player?.body.blocked.down) return;
    this.player.body.setVelocityY(-300);
    this.playAudio("jump");
    this.jumpTween = this.tweens.add({
      targets: this.player,
      duration: 1e3,
      angle: { from: 0, to: 360 },
      repeat: -1
    });
  }
  /*
  What should we do when we finish the game scene?
  
  - Stop the theme music
  - Play the dead sound
  - Set the score in the registry to show it in the `gameover` scene.
  - Start the `gameover` scene.
  
  */
  finishScene() {
    this.theme.stop();
    this.playAudio("dead");
    this.registry.set("score", "" + this.score);
    this.scene.start("gameover");
  }
  /*
  This method is called every 100ms and it is used to update the score and show it on the screen.
  */
  updateScore(points = 1) {
    this.score += points;
    this.scoreText?.setText(this.score.toString());
  }
};

// games/runner/scenes/gameover.ts
var GameOver = class extends Phaser.Scene {
  constructor() {
    super({ key: "gameover" });
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
  }
  create() {
    this.width = Number(this.sys.game.config.width);
    this.height = Number(this.sys.game.config.height);
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.cameras.main.setBackgroundColor(8900331);
    this.add.bitmapText(
      this.center_width,
      50,
      "arcade",
      this.registry.get("score"),
      25
    ).setOrigin(0.5);
    this.add.bitmapText(
      this.center_width,
      this.center_height,
      "arcade",
      "GAME OVER",
      45
    ).setOrigin(0.5);
    this.add.bitmapText(
      this.center_width,
      250,
      "arcade",
      "Press SPACE or Click to restart!",
      15
    ).setOrigin(0.5);
    this.input.keyboard?.on("keydown-SPACE", this.startGame, this);
    this.input.on(
      "pointerdown",
      (pointer) => this.startGame(),
      this
    );
  }
  /**
   * Typescript Addition:
   * To the best of my knowledge, this method is not used anywhere in the codebase.
   *
   * It is attempting to add to an `introLayer` property which is not defined anywhere.
   *
   * So to make Typescript happy (since it doesn't know what `introLayer` is) I just commented it out.
   *
   * However, if I had to make an educated guess I assume it was meant to be a Phaser.GameObjects.Layer
   */
  // showLine(text: string, y:number) {
  //   let line = this.introLayer.add(
  //     this.add
  //       .bitmapText(this.center_width, y, "pixelFont", text, 25)
  //       .setOrigin(0.5)
  //       .setAlpha(0)
  //   );
  //   this.tweens.add({
  //     targets: line,
  //     duration: 2000,
  //     alpha: 1,
  //   });
  // }
  startGame() {
    this.scene.start("game");
  }
};

// games/runner/main.ts
var config = {
  width: 600,
  height: 300,
  scale: {
    mode: Phaser2.Scale.FIT,
    autoCenter: Phaser2.Scale.CENTER_BOTH
  },
  autoRound: false,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 350 },
      debug: true
    }
  },
  scene: [Game, GameOver]
};
var game = new Phaser2.Game(config);
export {
  game
};
//# sourceMappingURL=main.js.map
