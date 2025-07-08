var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// games/wallhammer/main.ts
import Phaser2 from "https://esm.sh/phaser@4.0.0-rc.4";

// games/wallhammer/scenes/boodloader.ts
var Bootloader = class extends Phaser.Scene {
  constructor() {
    super({ key: "bootloader" });
    __publicField(this, "progressBar");
    __publicField(this, "loadBar");
  }
  preload() {
    this.createBars();
    this.load.on(
      "progress",
      (value) => {
        this.progressBar.clear();
        this.progressBar.fillStyle(15767863, 1);
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
    Array(5).fill(0).forEach((_, i) => {
      this.load.audio(`music${i}`, `assets/wallhammer/sounds/music${i}.mp3`);
    });
    this.load.image("pello", "assets/wallhammer/images/pello.png");
    this.load.image("landscape", "assets/wallhammer/images/landscape.png");
    this.load.audio("build", "assets/wallhammer/sounds/build.mp3");
    this.load.audio("coin", "assets/wallhammer/sounds/coin.mp3");
    this.load.audio("death", "assets/wallhammer/sounds/death.mp3");
    this.load.audio("jump", "assets/wallhammer/sounds/jump.mp3");
    this.load.audio("kill", "assets/wallhammer/sounds/kill.mp3");
    this.load.audio("land", "assets/wallhammer/sounds/land.mp3");
    this.load.audio("lunchbox", "assets/wallhammer/sounds/lunchbox.mp3");
    this.load.audio("prize", "assets/wallhammer/sounds/prize.mp3");
    this.load.audio("stone_fail", "assets/wallhammer/sounds/stone_fail.mp3");
    this.load.audio("stone", "assets/wallhammer/sounds/stone.mp3");
    this.load.audio("foedeath", "assets/wallhammer/sounds/foedeath.mp3");
    this.load.audio("stage", "assets/wallhammer/sounds/stage.mp3");
    this.load.audio("splash", "assets/wallhammer/sounds/splash.mp3");
    Array(2).fill(0).forEach((_, i) => {
      this.load.image(`brick${i}`, `assets/wallhammer/images/brick${i}.png`);
    });
    Array(5).fill(0).forEach((_, i) => {
      this.load.image(
        `platform${i + 2}`,
        `assets/wallhammer/images/platform${i + 2}.png`
      );
    });
    this.load.bitmapFont(
      "pixelFont",
      "assets/wallhammer/fonts/mario.png",
      "assets/wallhammer/fonts/mario.xml"
    );
    this.load.spritesheet("walt", "assets/wallhammer/images/walt.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    Array(5).fill(0).forEach((_, i) => {
      this.load.tilemapTiledJSON(`scene${i}`, `assets/wallhammer/maps/scene${i}.json`);
    });
    this.load.image("softbricks", "assets/wallhammer/maps/softbricks.png");
    this.load.image("bricks", "assets/wallhammer/maps/bricks.png");
    this.load.image("background", "assets/wallhammer/maps/background.png");
    this.load.image("chain", "assets/wallhammer/images/chain.png");
    this.load.spritesheet("bat", "assets/wallhammer/images/bat.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("zombie", "assets/wallhammer/images/zombie.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("coin", "assets/wallhammer/images/coin.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("lunchbox", "assets/wallhammer/images/lunchbox.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("hammer", "assets/wallhammer/images/hammer.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("speed", "assets/wallhammer/images/speed.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("boots", "assets/wallhammer/images/boots.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("star", "assets/wallhammer/images/star.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.bitmapFont(
      "hammerfont",
      "assets/wallhammer/fonts/hammer.png",
      "assets/wallhammer/fonts/hammer.xml"
    );
    this.registry.set("score", 0);
    this.registry.set("coins", 0);
  }
  createBars() {
    this.loadBar = this.add.graphics();
    this.loadBar.fillStyle(13264642, 1);
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
};

// games/wallhammer/gameobjects/blow.ts
var Blow = class extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width = 32, height = 32, type = "") {
    super(scene, x, y, width, height, 16777215);
    this.type = type;
    this.y = y;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.scene.tweens.add({
      targets: this,
      duration: 300,
      scale: { from: 1, to: 0 },
      onComplete: () => {
        this.destroy();
      }
    });
  }
};

// games/wallhammer/gameobjects/brick.ts
var Brick = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "brick0") {
    super(scene, x, y, name);
    this.name = name;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.immovable = true;
    this.body.moves = false;
    this.scene.tweens.add({
      targets: this,
      duration: 50,
      x: { from: this.x, to: this.x + Phaser.Math.Between(-7, 7) },
      y: { from: this.y, to: this.y + Phaser.Math.Between(-7, 7) },
      repeat: 5
    });
  }
};

// games/wallhammer/gameobjects/particle.ts
var Smoke = class extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, color = 268435455, gravity = false) {
    width = width ?? Phaser.Math.Between(10, 25);
    height = height ?? Phaser.Math.Between(10, 25);
    super(scene, x, y, width, height, color);
    __publicField(this, "color");
    scene.add.existing(this);
    this.color = color;
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
var RockSmoke = class extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, color = 16771755, gravity = false) {
    width = width ?? Phaser.Math.Between(30, 55);
    height = height ?? Phaser.Math.Between(30, 55);
    super(scene, x, y, width, height, color);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.body.setVelocityY(-100);
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
var JumpSmoke = class extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, color = 16771755, gravity = false) {
    width = width ?? Phaser.Math.Between(10, 25);
    height = height ?? Phaser.Math.Between(10, 25);
    super(scene, x, y, width, height, color);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.body.setVelocityX(Phaser.Math.Between(-20, 20));
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
var Debris = class extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, color = 16771755, gravity = false) {
    width = width ?? Phaser.Math.Between(15, 30);
    height = height ?? Phaser.Math.Between(15, 30);
    super(scene, x, y + 5, width, height, color);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.body.setVelocityX(Phaser.Math.Between(-50, 50));
    this.body.setVelocityY(width * height);
  }
};

// games/wallhammer/gameobjects/player.ts
var Player = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, health = 10) {
    super(scene, x, y, "walt");
    __publicField(this, "spaceBar");
    __publicField(this, "down");
    __publicField(this, "right");
    __publicField(this, "cursor");
    __publicField(this, "jumping");
    __publicField(this, "building");
    __publicField(this, "falling");
    __publicField(this, "mjolnir");
    __publicField(this, "walkVelocity");
    __publicField(this, "jumpVelocity");
    __publicField(this, "invincible");
    __publicField(this, "health");
    __publicField(this, "dead");
    __publicField(this, "W");
    __publicField(this, "A");
    __publicField(this, "S");
    __publicField(this, "D");
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.cursor = this.scene.input.keyboard?.createCursorKeys();
    this.spaceBar = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.down = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.right = true;
    this.body.setGravityY(100);
    this.body.setSize(48, 60);
    this.init();
    this.jumping = false;
    this.building = false;
    this.falling = false;
    this.mjolnir = false;
    this.walkVelocity = 200;
    this.jumpVelocity = -400;
    this.invincible = false;
    this.health = health;
    this.dead = false;
    this.W = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }
  init() {
    this.createAnim(this.scene, "startidle" /* startidle */, 0, 1, 3, -1);
    this.createAnim(this.scene, "playeridle" /* idle */, 2, 3, 3, -1);
    this.createAnim(this.scene, "playerwalk" /* walk */, 4, 6, 10, -1);
    this.createAnim(this.scene, "playerjump" /* jump */, 4, 4, 1);
    this.createAnim(this.scene, "playerhammer" /* hammer */, 7, 8, 10);
    this.createAnim(this.scene, "playerbuild" /* build */, 9, 10, 10, 2);
    this.createAnim(this.scene, "playerdead" /* dead */, 11, 16, 5);
    this.anims.play("startidle" /* startidle */, true);
    this.on("animationcomplete", this.animationComplete, this);
  }
  createAnim(scene, key, start, end, frameRate, repeat) {
    scene.anims.create({
      key,
      frames: this.scene.anims.generateFrameNumbers("walt", { start, end }),
      frameRate,
      repeat
    });
  }
  update() {
    if (this.dead) return;
    if (this.jumping) {
      if (this.body.velocity.y >= 0) {
        this.body.setGravityY(700);
        this.falling = true;
      }
    }
    if ((Phaser.Input.Keyboard.JustDown(this.cursor.up) || Phaser.Input.Keyboard.JustDown(this.W)) && this.body.blocked.down) {
      this.building = false;
      this.body.setVelocity(this.jumpVelocity);
      this.body.setGravityY(400);
      this.anims.play("playerjump" /* jump */, true);
      this.scene.playAudio("jump");
      this.jumping = true;
      this.jumpSmoke();
    } else if (this.cursor.right.isDown || this.D.isDown) {
      this.building = false;
      if (this.body.blocked.down) {
        this.anims.play("playerwalk" /* walk */, true);
      }
      this.right = true;
      this.flipX = this.body.velocity.x < 0;
      this.body.setVelocityX(this.walkVelocity);
    } else if (this.cursor.left.isDown || this.A.isDown) {
      this.building = false;
      if (this.body.blocked.down) {
        this.anims.play("playerwalk" /* walk */, true);
      }
      this.right = false;
      this.flipX = true;
      this.body.setVelocityX(-this.walkVelocity);
    } else {
      if (this.body.blocked.down) {
        if (this.jumping) {
          this.scene.playAudio("land");
          this.landSmoke();
        }
        this.jumping = false;
        this.falling = false;
        if (!this.building) this.anims.play("playeridle" /* idle */, true);
      }
      this.body.setVelocityX(0);
    }
    if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) this.hammerBlow();
    if (Phaser.Input.Keyboard.JustDown(this.cursor.down) || Phaser.Input.Keyboard.JustDown(this.S)) this.buildBlock();
  }
  landSmoke() {
    this.jumpSmoke(20);
  }
  jumpSmoke(offsetY = 10, varX) {
    Array(Phaser.Math.Between(3, 6)).fill(0).forEach((_i) => {
      const offset = varX || Phaser.Math.Between(-1, 1) > 0 ? 1 : -1;
      varX = varX || Phaser.Math.Between(0, 20);
      new JumpSmoke(this.scene, this.x + offset * varX, this.y + offsetY);
    });
  }
  buildBlock() {
    this.building = true;
    this.anims.play("playerbuild" /* build */, true);
    this.scene.playAudio("build");
    const offsetX = this.right ? 64 : -64;
    const offsetY = this.jumpVelocity === -400 ? 0 : -128;
    this.buildSmoke(32, offsetX);
    this.scene.bricks.add(
      new Brick(this.scene, this.x + offsetX, this.y + offsetY)
    );
  }
  buildSmoke(offsetY = 10, offsetX) {
    Array(Phaser.Math.Between(8, 14)).fill(0).forEach((i) => {
      const varX = Phaser.Math.Between(-20, 20);
      new JumpSmoke(this.scene, this.x + (offsetX + varX), this.y + offsetY);
    });
  }
  hammerBlow() {
    this.building = true;
    this.anims.play("playerhammer" /* hammer */, true);
    const offsetX = this.right ? 32 : -32;
    const size = this.mjolnir ? 128 : 32;
    this.scene.blows.add(
      new Blow(this.scene, this.x + offsetX, this.y, size, size)
    );
  }
  turn() {
    this.right = !this.right;
  }
  animationComplete(animation, frame) {
    if (animation.key === "playerground") {
      this.anims.play("playeridle", true);
    }
    if (animation.key === "playerhammer" /* hammer */ || animation.key === "playerbuild" /* build */) {
      this.building = false;
      this.anims.play(this.jumping ? "playerjump" /* jump */ : "playeridle" /* idle */, true);
    }
  }
  hit() {
    this.health--;
    this.anims.play("playerdead" /* dead */, true);
    this.body.enable = false;
    if (this.health === 0) this.die();
  }
  die() {
    this.dead = true;
    this.anims.play("playerdead" /* dead */, true);
    this.body.immovable = true;
    this.body.moves = false;
    this.scene.restartScene();
  }
  applyPrize(prize) {
    switch (prize) {
      case "speed":
        this.walkVelocity = 330;
        this.flashPlayer();
        break;
      case "hammer":
        this.mjolnir = true;
        this.flashPlayer();
        break;
      case "boots":
        this.jumpVelocity = -600;
        this.flashPlayer();
        break;
      case "coin":
        this.scene.updateCoins();
        break;
      case "star":
        this.invincible = true;
        this.scene.tweens.add({
          targets: this,
          duration: 300,
          alpha: { from: 0.7, to: 1 },
          repeat: -1
        });
        break;
      default:
        break;
    }
  }
  flashPlayer() {
    this.scene.tweens.add({
      targets: this,
      duration: 50,
      scale: { from: 1.2, to: 1 },
      repeat: 10
    });
  }
};

// games/wallhammer/gameobjects/bat.ts
var Bat = class extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type = "right") {
    super(scene, x, y, "bat");
    __publicField(this, "direction");
    __publicField(this, "dead", false);
    this.name = "bat";
    this.scene.physics.add.existing(this);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.direction = type === "right" ? 1 : -1;
    this.init();
  }
  /* Inits the animations for the bat and starts the movement. We also add a listener for the 'animationcomplete' event */
  init() {
    this.scene.anims.create({
      key: this.name,
      frames: this.scene.anims.generateFrameNumbers(this.name, {
        start: 0,
        end: 1
      }),
      frameRate: 5,
      repeat: -1
    });
    this.scene.anims.create({
      key: this.name + "death",
      frames: this.scene.anims.generateFrameNumbers(this.name, {
        start: 2,
        end: 5
      }),
      frameRate: 5
    });
    this.anims.play(this.name, true);
    this.body?.velocity.set(this.direction * 150);
    this.flipX = this.direction > 0;
    this.on("animationcomplete", this.animationComplete, this);
  }
  update() {
  }
  // Turn the bat around and changes the direction
  turn() {
    this.direction = -this.direction;
    this.flipX = this.direction > 0;
    this.body?.velocity.set(this.direction * 150);
  }
  // This kills the bad 'nicely' by playing the death animation
  death() {
    this.dead = true;
    if (this.body) this.body.enable = false;
    this.rotation = 0;
    this.anims.play(this.name + "death");
  }
  // This is called when any animation is completed. If the death animation is completed, then destroy the bat. 
  animationComplete(animation, _frame) {
    if (animation.key === this.name + "death") {
      this.destroy();
    }
  }
};

// games/wallhammer/gameobjects/zombie.ts
var Zombie = class extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type = "right") {
    super(scene, x, y, "zombie");
    __publicField(this, "direction");
    __publicField(this, "dead", false);
    this.name = "zombie";
    this.scene = scene;
    this.scene.physics.add.existing(this);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.direction = type === "right" ? -1 : 1;
    this.init();
  }
  // Inits animation for the zombies and starts the movement
  init() {
    this.scene.anims.create({
      key: this.name,
      frames: this.scene.anims.generateFrameNumbers(this.name, {
        start: 0,
        end: 2
      }),
      frameRate: 5,
      repeat: -1
    });
    this.scene.anims.create({
      key: this.name + "death",
      frames: this.scene.anims.generateFrameNumbers(this.name, {
        start: 3,
        end: 5
      }),
      frameRate: 5
    });
    this.anims.play(this.name, true);
    this.body?.velocity.set(this.direction * 100);
    this.flipX = this.direction < 0;
    this.on("animationcomplete", this.animationComplete, this);
  }
  // Turns the zombie around and changes the direction
  turn() {
    this.direction = -this.direction;
    this.flipX = this.direction < 0;
    this.body?.velocity.set(this.direction * 100);
  }
  // This kills the zombie "nicely" by playing the death animation
  death() {
    this.dead = true;
    if (this.body) this.body.enable = true;
    this.rotation = 0;
    this.anims.play(this.name + "death");
  }
  // When death animation is completed, then destroy the zombie
  animationComplete(animation, _frame) {
    if (animation.key === this.name + "death") {
      this.destroy();
    }
  }
};

// games/wallhammer/gameobjects/turn.ts
var Turn = class extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width = 32, height = 32, type = "") {
    super(scene, x, y, width, height, 16777215);
    this.type = type;
    this.setAlpha(0);
    this.x = x;
    this.y = y;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.immovable = true;
    this.body.moves = false;
  }
  disable() {
    this.visible = false;
    this.destroy();
  }
  destroy() {
    super.destroy();
  }
};

// games/wallhammer/gameobjects/coin.ts
var Coin = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "coin") {
    super(scene, x, y, name);
    __publicField(this, "disabled");
    this.name = name;
    this.setScale(0.7);
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.immovable = true;
    this.body.moves = false;
    this.disabled = false;
    this.init();
  }
  init() {
    this.scene.anims.create({
      key: this.name,
      frames: this.scene.anims.generateFrameNumbers(this.name, {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.play(this.name, true);
    this.scene.tweens.add({
      targets: this,
      duration: 500,
      y: this.y - 20,
      repeat: -1,
      yoyo: true
    });
  }
  pick() {
    const { x, y } = this.scene.cameras.main.getWorldPoint(
      this.scene.scoreCoinsLogo.x,
      this.scene.scoreCoinsLogo.y
    );
    this.disabled = true;
    this.scene.tweens.add({
      targets: this,
      duration: 500,
      x: { from: this.x, to: x },
      y: { from: this.y, to: y },
      scale: { from: 0.7, to: 0.5 },
      onComplete: () => {
        this.destroy();
      }
    });
  }
};

// games/wallhammer/gameobjects/lunchbox.ts
var LunchBox = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "lunchbox") {
    super(scene, x, y, name);
    __publicField(this, "disabled");
    __publicField(this, "prizeSprite");
    this.scene = scene;
    this.name = name;
    this.setScale(1);
    this.setOrigin(0.5);
    this.body = this.body;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.immovable = true;
    this.body.moves = false;
    this.disabled = false;
    this.init();
  }
  init() {
    this.scene.anims.create({
      key: this.name,
      frames: this.scene.anims.generateFrameNumbers(this.name, {
        start: 0,
        end: 0
      }),
      frameRate: 1
    });
    this.scene.anims.create({
      key: this.name + "opened",
      frames: this.scene.anims.generateFrameNumbers(this.name, {
        start: 1,
        end: 1
      }),
      frameRate: 1
    });
    this.anims.play(this.name, true);
    this.scene.tweens.add({
      targets: this,
      duration: 500,
      y: this.y - 20,
      repeat: -1,
      yoyo: true
    });
  }
  pick() {
    this.anims.play(this.name + "opened", true);
    this.showPrize();
    this.disabled = true;
    this.scene.time.delayedCall(
      1e3,
      () => {
        this.destroy();
        this.prizeSprite?.destroy();
      },
      void 0,
      this
    );
  }
  showPrize() {
    const prize = ["boots", "hammer", "coin", "star", "speed"];
    const selectedPrize = Phaser.Math.RND.pick(prize);
    this.scene.player.applyPrize(selectedPrize);
    this.prizeSprite = this.scene.add.sprite(this.x, this.y, selectedPrize).setOrigin(0.5).setScale(0.8);
    this.scene.tweens.add({
      targets: this.prizeSprite,
      duration: 500,
      y: { from: this.y, to: this.y - 64 },
      onComplete: () => {
        this.scene.playAudio("prize");
      }
    });
  }
};

// games/wallhammer/gameobjects/platform.ts
var Platform = class extends Phaser.GameObjects.Container {
  constructor(scene, x, y, size = 4, demo = false) {
    super(scene, x, y);
    __publicField(this, "chain");
    __publicField(this, "platform");
    this.x = x;
    this.y = y;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.body.setBounce(1);
    this.body.setSize(size * 64, 64);
    this.body.setOffset(-2, -2);
    this.body.immovable = true;
    this.body.moves = false;
    this.chain = new Phaser.GameObjects.Sprite(
      this.scene,
      size * 32 - 32,
      -2048,
      "chain"
    ).setOrigin(0);
    this.add(this.chain);
    this.platform = new Phaser.GameObjects.Sprite(
      this.scene,
      0,
      0,
      "platform" + size
    ).setOrigin(0);
    this.init();
  }
  init() {
    const type = Phaser.Math.Between(0, 7);
    let offsetX = this.x;
    let offsetY = this.y;
    switch (type) {
      case 0:
        offsetX = Phaser.Math.Between(-50, 50);
        break;
      case 1:
        offsetY = Phaser.Math.Between(-50, 50);
        break;
      case 2:
        offsetX = Phaser.Math.Between(-100, 100);
        offsetY = Phaser.Math.Between(-100, 100);
        break;
      case 3:
      case 4:
      case 5:
      case 6:
      default:
        break;
    }
    this.scene.tweens.add({
      targets: this,
      duration: Phaser.Math.Between(4e3, 6e3),
      x: { from: this.x, to: offsetX },
      y: { from: this.y, to: offsetY },
      repeat: -1,
      yoyo: true
    });
  }
};

// games/wallhammer/scenes/game.ts
var Game = class extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    __publicField(this, "player");
    __publicField(this, "score");
    __publicField(this, "scoreText");
    __publicField(this, "name");
    __publicField(this, "number");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "scoreCoins");
    __publicField(this, "scoreCoinsLogo");
    __publicField(this, "tileSetBg", null);
    __publicField(this, "tileMap");
    __publicField(this, "tileSet", null);
    __publicField(this, "objectsLayer", null);
    __publicField(this, "platform");
    __publicField(this, "batGroup");
    __publicField(this, "zombieGroup");
    __publicField(this, "foesGroup");
    __publicField(this, "turnGroup");
    __publicField(this, "exitGroup");
    __publicField(this, "platformGroup");
    __publicField(this, "lunchBoxGroup");
    __publicField(this, "bricks");
    __publicField(this, "blows");
    __publicField(this, "coins");
    __publicField(this, "elements");
    __publicField(this, "audios");
    __publicField(this, "theme");
    this.player = null;
    this.score = 0;
    this.scoreText = null;
  }
  init(data) {
    this.name = data.name;
    this.number = data.number;
  }
  preload() {
  }
  create() {
    this.width = +this.sys.game.config.width;
    this.height = +this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.cameras.main.setBackgroundColor(6464191);
    this.add.tileSprite(0, 1e3, 1024 * 10, 512, "landscape").setOrigin(0.5);
    this.createMap();
    this.cameras.main.setBounds(0, 0, 20920 * 2, 20080 * 2);
    this.physics.world.setBounds(0, 0, 20920 * 2, 20080 * 2);
    this.addPlayer();
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05, 0, 240);
    this.physics.world.enable([this.player]);
    this.addScore();
    this.loadAudios();
    this.playMusic();
  }
  addScore() {
    this.scoreCoins = this.add.bitmapText(75, 10, "pixelFont", "x0", 30).setDropShadow(0, 4, 2236962, 0.9).setOrigin(0).setScrollFactor(0);
    this.scoreCoinsLogo = this.add.sprite(50, 25, "coin").setScale(1).setOrigin(0.5).setScrollFactor(0);
    this.anims.create({
      key: "coinscore",
      frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 7 }),
      frameRate: 8
    });
    this.scoreCoinsLogo.play({ key: "coinscore", repeat: -1 });
  }
  createMap() {
    this.tileMap = this.make.tilemap({
      key: "scene" + this.number,
      tileWidth: 64,
      tileHeight: 64
    });
    console.log(this.tileMap);
    this.tileSetBg = this.tileMap.addTilesetImage("background");
    if (!this.tileSetBg) throw "Background tileset missing";
    this.tileMap.createLayer("background", this.tileSetBg);
    this.tileSet = this.tileMap.addTilesetImage("softbricks");
    this.platform = this.tileMap.createLayer(
      "scene" + this.number,
      this.tileSet
    );
    if (!this.platform) throw "Failed to creat platform layer";
    this.objectsLayer = this.tileMap.getObjectLayer("objects");
    this.platform?.setCollisionByExclusion([-1]);
    this.batGroup = this.add.group();
    this.zombieGroup = this.add.group();
    this.foesGroup = this.add.group();
    this.turnGroup = this.add.group();
    this.exitGroup = this.add.group();
    this.platformGroup = this.add.group();
    this.lunchBoxGroup = this.add.group();
    this.bricks = this.add.group();
    this.addsObjects();
    this.addColliders();
  }
  addsObjects() {
    this.objectsLayer?.objects.forEach((object) => {
      if (!object.x || !object.y)
        throw "bat object not defined correctly";
      if (object.name === "bat") {
        const bat = new Bat(this, object.x, object.y, object.type);
        this.batGroup.add(bat);
        this.foesGroup.add(bat);
      }
      if (object.name === "zombie") {
        const zombie = new Zombie(this, object.x, object.y, object.type);
        this.zombieGroup.add(zombie);
        this.foesGroup.add(zombie);
      }
      if (object.name === "platform") {
        this.platformGroup.add(
          new Platform(this, object.x, object.y, +object.type)
        );
      }
      if (object.name === "turn") {
        this.turnGroup.add(new Turn(this, object.x, object.y));
      }
      if (object.name === "lunchbox") {
        this.lunchBoxGroup.add(new LunchBox(this, object.x, object.y));
      }
      if (object.name === "text") {
        this.add.bitmapText(object.x, object.y, "pixelFont", object.text.text, 30).setDropShadow(2, 4, 2236962, 0.9).setOrigin(0);
      }
      if (object.name === "exit") {
        this.exitGroup.add(
          new Turn(this, object.x, object.y, object.width, object.height, object.type).setOrigin(0.5)
        );
      }
    });
  }
  addColliders() {
    this.physics.add.collider(
      this.batGroup,
      this.platform,
      this.turnFoe,
      () => {
        return true;
      },
      this
    );
    this.physics.add.collider(
      this.zombieGroup,
      this.bricks,
      this.turnFoe,
      () => {
        return true;
      },
      this
    );
    this.physics.add.collider(
      this.batGroup,
      this.bricks,
      this.turnFoe,
      () => {
        return true;
      },
      this
    );
    this.physics.add.collider(
      this.zombieGroup,
      this.turnGroup,
      this.turnFoe,
      () => {
        return true;
      },
      this
    );
    this.physics.add.collider(
      this.zombieGroup,
      this.platform,
      this.hitFloor,
      () => {
        return true;
      },
      this
    );
  }
  turnFoe(foe, _platform) {
    foe.turn();
  }
  // hitFloor() {}
  addPlayer() {
    this.elements = this.add.group();
    this.coins = this.add.group();
    const playerPosition = this.objectsLayer?.objects.find(
      (object) => object.name === "player"
    );
    if (!playerPosition || !playerPosition.x || !playerPosition.y) throw "Unable to get player position";
    this.player = new Player(this, playerPosition.x, playerPosition.y, 0);
    this.physics.add.collider(
      this.player,
      // TODO: fix type here
      this.platform,
      this.hitFloor,
      () => {
        return true;
      },
      this
    );
    this.physics.add.collider(
      this.player,
      this.platformGroup,
      this.hitFloor,
      () => {
        return true;
      },
      this
    );
    this.physics.add.collider(
      this.player,
      this.bricks,
      this.hitFloor,
      () => {
        return true;
      },
      this
    );
    this.physics.add.overlap(
      this.player,
      this.coins,
      this.pickCoin,
      () => {
        return true;
      },
      this
    );
    this.physics.add.overlap(
      this.player,
      this.lunchBoxGroup,
      this.pickLunchBox,
      () => {
        return true;
      },
      this
    );
    this.physics.add.overlap(
      this.player,
      this.exitGroup,
      () => {
        this.playAudio("stage");
        this.time.delayedCall(1e3, () => this.finishScene(), void 0, this);
      },
      () => {
        return true;
      },
      this
    );
    this.blows = this.add.group();
    this.physics.add.overlap(
      this.blows,
      this.platform,
      this.blowPlatform,
      () => {
        return true;
      },
      this
    );
    this.physics.add.overlap(
      this.blows,
      this.bricks,
      this.blowBrick,
      () => {
        return true;
      },
      this
    );
    this.physics.add.overlap(
      this.blows,
      this.foesGroup,
      this.blowFoe,
      () => {
        return true;
      },
      this
    );
    this.physics.add.overlap(
      this.bricks,
      this.foesGroup,
      this.foeBlowBrick,
      () => {
        return true;
      },
      this
    );
    this.physics.add.collider(
      this.player,
      this.batGroup,
      this.hitPlayer,
      () => {
        return true;
      },
      this
    );
    this.physics.add.collider(
      this.player,
      this.zombieGroup,
      this.hitPlayer,
      () => {
        return true;
      },
      this
    );
  }
  pickCoin(_player, coin) {
    if (!coin.disabled) {
      coin.pick();
      this.playAudio("coin");
      this.updateCoins();
    }
  }
  pickLunchBox(_player, lunchbox) {
    if (!lunchbox.disabled) {
      this.playAudio("lunchbox");
      lunchbox.pick();
    }
  }
  hitPlayer(player, foe) {
    if (player.invincible) {
      foe.death();
      this.playAudio("foedeath");
    } else if (!player.dead && this.number > 0) {
      player.die();
      this.playAudio("death");
    }
  }
  blowFoe(_blow, foe) {
    this.playAudio("kill");
    this.playAudio("foedeath");
    foe.death();
  }
  foeBlowBrick(brick, foe) {
    foe.turn();
    Array(Phaser.Math.Between(4, 6)).fill(0).forEach(() => new Debris(this, brick.x, brick.y));
    brick.destroy();
  }
  blowPlatform(blow, platform) {
    const tile = this.getTile(platform);
    if (this.isBreakable(tile)) {
      this.playAudioRandomly("stone_fail");
      this.playAudioRandomly("stone");
      if (this.player?.mjolnir) this.cameras.main.shake(30);
      blow.destroy();
      Array(Phaser.Math.Between(4, 6)).fill(0).forEach(() => new Debris(this, tile.pixelX, tile.pixelY));
      this.platform.removeTileAt(tile.x, tile.y);
      this.spawnCoin(tile);
    }
  }
  getTile(platform) {
    const { x, y } = platform;
    return this.platform.getTileAt(x, y);
  }
  isBreakable(tile) {
    return tile?.properties["element"] === "break";
  }
  spawnCoin(tile) {
    if (Phaser.Math.Between(0, 11) > 5) {
      this.time.delayedCall(
        500,
        () => {
          this.coins.add(new Coin(this, tile.pixelX, tile.pixelY));
        }
      );
    }
  }
  blowBrick(blow, brick) {
    if (this.player?.mjolnir) this.cameras.main.shake(30);
    this.playAudio("stone_fail");
    this.playAudioRandomly("stone");
    blow.destroy();
    Array(Phaser.Math.Between(4, 6)).fill(0).forEach(() => new Debris(this, brick.x, brick.y));
    brick.destroy();
  }
  hitFloor(_player, platform) {
    if (this.player?.jumping && !this.player.falling && this.player.body?.velocity.y === 0) {
      const tile = this.getTile(platform);
      if (this.isBreakable(tile)) {
        this.playAudioRandomly("stone");
        Array(Phaser.Math.Between(4, 6)).fill(0).forEach(() => new Debris(this, tile.pixelX, tile.pixelY));
        this.platform.removeTileAt(tile.x, tile.y);
      } else if (platform.name === "brick0") {
        this.playAudioRandomly("stone");
        Array(Phaser.Math.Between(4, 6)).fill(0).forEach(() => new Debris(this, platform.x, platform.y));
        platform.destroy();
      }
    }
  }
  loadAudios() {
    this.audios = {
      build: this.sound.add("build"),
      coin: this.sound.add("coin"),
      death: this.sound.add("death"),
      jump: this.sound.add("jump"),
      kill: this.sound.add("kill"),
      land: this.sound.add("land"),
      lunchbox: this.sound.add("lunchbox"),
      prize: this.sound.add("prize"),
      stone_fail: this.sound.add("stone_fail"),
      stone: this.sound.add("stone"),
      foedeath: this.sound.add("foedeath"),
      stage: this.sound.add("stage")
    };
  }
  playAudio(key) {
    this.audios[key].play();
  }
  playAudioRandomly(key) {
    const volume = Phaser.Math.Between(0.8, 1);
    const rate = Phaser.Math.Between(0.8, 1);
    this.audios[key].play({ volume, rate });
  }
  playMusic() {
    this.theme = this.sound.add("music" + this.number);
    this.theme.stop();
    this.theme.play({
      mute: false,
      volume: 0.7,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    });
  }
  update() {
    this.player?.update();
    if (this.number === 3 && this.player && this.player.y > 1500) this.restartScene();
  }
  finishScene() {
    if (this.theme) this.theme.stop;
    this.scene.start("transition", { name: "STAGE", number: this.number + 1 });
  }
  restartScene() {
    this.time.delayedCall(
      1e3,
      () => {
        if (this.theme) this.theme.stop();
        this.scene.start("transition", { name: "STAGE", number: this.number });
      },
      void 0,
      this
    );
  }
  updateCoins() {
    const coins = +this.registry.get("coins") + 1;
    this.registry.set("coins", coins);
    this.scoreCoins.setText("x" + coins);
    this.tweens.add({
      targets: [this.scoreCoins, this.scoreCoinsLogo],
      scale: { from: 1.4, to: 1 },
      duration: 50,
      repeat: 10
    });
  }
};

// games/wallhammer/scenes/splash.ts
var Splash = class extends Phaser.Scene {
  constructor() {
    super({ key: "splash" });
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "theme");
    __publicField(this, "space");
  }
  create() {
    this.width = +this.sys.game.config.width;
    this.height = +this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.cameras.main.setBackgroundColor(0);
    this.time.delayedCall(1e3, () => this.showInstructions(), void 0, this);
    this.input.keyboard?.on("keydown-SPACE", () => this.startGame(), this);
    this.input.keyboard?.on("keydown-ENTER", () => this.startGame(), this);
    this.playMusic();
    this.showTitle();
    this.playAudioRandomly("stone");
  }
  startGame() {
    if (this.theme) this.theme.stop();
    this.scene.start("transition", {
      next: "game",
      name: "STAGE",
      number: 0,
      time: 30
    });
  }
  showTitle() {
    "WALL".split("").forEach((letter, i) => {
      this.time.delayedCall(
        200 * (i + 1),
        () => {
          this.playAudioRandomly("stone_fail");
          if (Phaser.Math.Between(0, 5) > 2) this.playAudioRandomly("stone");
          const text = this.add.bitmapText(130 * (i + 1) + 140, 200, "hammerfont", letter, 170).setTint(13264642).setOrigin(0.5).setDropShadow(4, 6, 15767863, 0.9);
          Array(Phaser.Math.Between(4, 6)).fill(0).forEach(() => new Debris(this, text.x, text.y, 13264642));
        },
        void 0,
        this
      );
    });
    "HAMMER".split("").forEach((letter, i) => {
      this.time.delayedCall(
        200 * (i + 1) + 800,
        () => {
          this.playAudioRandomly("stone_fail");
          if (Phaser.Math.Between(0, 5) > 2) this.playAudioRandomly("stone");
          const text = this.add.bitmapText(130 * (i + 1), 350, "hammerfont", letter, 170).setTint(13264642).setOrigin(0.5).setDropShadow(4, 6, 15767863, 0.9);
          Array(Phaser.Math.Between(4, 6)).fill(0).forEach(() => new Debris(this, text.x, text.y, 13264642));
        },
        void 0,
        this
      );
    });
  }
  playAudioRandomly(key) {
    const volume = Phaser.Math.Between(0.8, 1);
    const rate = 1;
    this.sound.add(key).play({ volume, rate });
  }
  playMusic() {
    this.theme = this.sound.add("splash");
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
  showInstructions() {
    this.add.bitmapText(this.center_width, 450, "pixelFont", "WASD/Arrows: move", 30).setOrigin(0.5);
    this.add.bitmapText(this.center_width, 500, "pixelFont", "S/DOWN: BUILD WALL", 30).setOrigin(0.5);
    this.add.bitmapText(this.center_width, 550, "pixelFont", "SPACE: HAMMER", 30).setOrigin(0.5);
    this.add.sprite(this.center_width - 120, 620, "pello").setOrigin(0.5).setScale(0.3);
    this.add.bitmapText(this.center_width + 40, 620, "pixelFont", "By PELLO", 15).setOrigin(0.5);
    this.space = this.add.bitmapText(this.center_width, 670, "pixelFont", "Press SPACE to start", 30).setOrigin(0.5);
    this.tweens.add({
      targets: this.space,
      duration: 300,
      alpha: { from: 0, to: 1 },
      repeat: -1,
      yoyo: true
    });
  }
};

// games/wallhammer/scenes/transition.ts
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
    __publicField(this, "scoreCoins");
    __publicField(this, "scoreCoinsLogo");
  }
  init(data) {
    this.name = data.name;
    this.number = data.number;
    this.next = data.next;
  }
  create() {
    const messages = ["TUTORIAL", "STAGE 1", "STAGE 2", "STAGE 3", "STAGE 4"];
    this.width = +this.sys.game.config.width;
    this.height = +this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    if (this.number === 5) this.loadOutro();
    this.addScore();
    this.add.sprite(this.center_width, this.center_height - 170, "walt");
    this.add.bitmapText(this.center_width, this.center_height - 20, "pixelFont", messages[this.number], 40).setOrigin(0.5);
    this.add.bitmapText(this.center_width, this.center_height + 20, "pixelFont", "Ready?", 30).setOrigin(0.5);
    this.input.keyboard?.on("keydown-ENTER", () => this.loadNext(), this);
    this.input.keyboard?.on("keydown-SPACE", () => this.loadNext(), this);
    this.time.delayedCall(
      3e3,
      () => {
        this.loadNext();
      },
      void 0,
      this
    );
  }
  loadNext() {
    this.scene.start("game", { name: this.name, number: this.number });
  }
  loadOutro() {
    this.scene.start("outro", { name: this.name, number: this.number });
  }
  addScore() {
    this.scoreCoins = this.add.bitmapText(
      this.center_width + 32,
      this.center_height - 100,
      "pixelFont",
      "x" + this.registry.get("coins"),
      30
    ).setDropShadow(0, 4, 2236962, 0.9).setOrigin(0.5).setScrollFactor(0);
    this.scoreCoinsLogo = this.add.sprite(this.center_width - 32, this.center_height - 100, "coin").setScale(0.7).setOrigin(0.5).setScrollFactor(0);
    this.anims.create({
      key: "coinscore",
      frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 7 }),
      frameRate: 8
    });
    this.scoreCoinsLogo.play({ key: "coinscore", repeat: -1 });
  }
};

// games/wallhammer/scenes/outro.ts
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
  }
  create() {
    this.width = +this.sys.game.config.width;
    this.height = +this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.introLayer = this.add.layer();
    this.splashLayer = this.add.layer();
    this.text = [
      "You did it!!",
      "Thanks to your building skills",
      "and your mighty hammer,",
      "you saved the earth.",
      "Made in 3 days for Minijam",
      "by Pello",
      "",
      "Press SPACE"
    ];
    this.showHistory();
    this.input.keyboard?.on("keydown-SPACE", this.startSplash, this);
    this.input.keyboard?.on("keydown-ENTER", this.startSplash, this);
  }
  startSplash() {
    this.scene.start("splash");
  }
  showHistory() {
    this.text.forEach((line, i) => {
      this.time.delayedCall(
        (i + 1) * 2e3,
        () => this.showLine(line, (i + 1) * 70),
        void 0,
        this
      );
    });
  }
  showLine(text, y) {
    const line = this.introLayer.add(
      this.add.bitmapText(this.center_width, y, "pixelFont", text, 25).setOrigin(0.5).setAlpha(0)
    );
    this.tweens.add({
      targets: line,
      duration: 2e3,
      alpha: 1
    });
  }
};

// games/wallhammer/main.ts
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
      gravity: { x: 0, y: 350 },
      debug: false
    }
  },
  scene: [Bootloader, Splash, Transition, Game, Outro]
};
var game = new Phaser2.Game(config);
export {
  game
};
//# sourceMappingURL=main.js.map
