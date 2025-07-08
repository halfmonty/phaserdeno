var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// games/basicgame/main.ts
import Phaser2 from "https://esm.sh/phaser@4.0.0-rc.4";

// games/basicgame/scenes/game.ts
var Game = class extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    __publicField(this, "player");
    __publicField(this, "platforms");
    __publicField(this, "cursors");
    __publicField(this, "score", 0);
    __publicField(this, "scoreText");
    __publicField(this, "stars");
    __publicField(this, "collectStar", (_player, star) => {
      star.disableBody(true, true);
      if (this.stars.countActive(true) === 0) {
        this.stars.children.forEach((child) => {
          child.enableBody(
            true,
            child.x,
            0,
            true,
            true
          );
        });
      }
      this.score += 10;
      this.scoreText.setText("Score: " + this.score);
    });
  }
  preload() {
    this.load.image("sky", "assets/basicgame/sky.png");
    this.load.image("ground", "assets/basicgame/platform.png");
    this.load.image("star", "assets/basicgame/star.png");
    this.load.image("bomb", "assets/basicgame/bomb.png");
    this.load.spritesheet("dude", "assets/basicgame/dude.png", { frameWidth: 32, frameHeight: 48 });
  }
  create() {
    this.add.image(400, 300, "sky");
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");
    this.player = this.physics.add.sprite(100, 450, "dude");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    this.physics.add.collider(this.player, this.platforms);
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });
    this.stars.children.forEach((star) => {
      const starSprite = star;
      starSprite.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      void 0,
      this
    );
    this.cursors = this.input.keyboard.createCursorKeys();
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      color: "#ffffff"
    });
    this.add.text(400, 100, "Use Arrow Keys to Move\nCollect Yellow Stars!", {
      fontSize: "24px",
      color: "#ffffff",
      align: "center"
    }).setOrigin(0.5);
  }
  update(time, delta) {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }
    if (this.cursors.up.isDown && this.player.body?.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
};

// games/basicgame/main.ts
var config = {
  width: 800,
  height: 600,
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
      debug: false
    }
  },
  scene: [Game]
};
var game = new Phaser2.Game(config);
//# sourceMappingURL=main.js.map
