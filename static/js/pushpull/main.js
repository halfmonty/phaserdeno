var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// games/pushpull/main.ts
import Phaser2 from "https://esm.sh/phaser@4.0.0-rc.4";

// games/pushpull/scenes/bootloader.ts
var Bootloader = class extends Phaser.Scene {
  constructor() {
    super({ key: "bootloader" });
    __publicField(this, "loadBar");
    __publicField(this, "progressBar");
  }
  preload() {
    this.createBars();
    this.setLoadEvents();
    this.loadFonts();
    this.loadAudios();
    this.loadImages();
    this.loadSpritesheets();
    this.loadMaps();
    this.setRegistry();
  }
  setLoadEvents() {
    this.load.on(
      "progress",
      (value) => {
        this.progressBar.clear();
        this.progressBar.fillStyle(10941206, 1);
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
  loadFonts() {
    this.load.bitmapFont(
      "mario",
      "assets/pushpull/fonts/mario.png",
      "assets/pushpull/fonts/mario.xml"
    );
  }
  loadImages() {
    this.load.image("pello", "assets/pushpull/images/pello.png");
    this.load.image("background", "assets/pushpull/images/background.png");
    this.load.image("tileset_fg", "assets/pushpull/maps/tileset_fg.png");
    this.load.image("block_red", "assets/pushpull/images/block_red.png");
    this.load.image("block_green", "assets/pushpull/images/block_green.png");
    this.load.image("block_blue", "assets/pushpull/images/block_blue.png");
    this.load.image("block_yellow", "assets/pushpull/images/block_yellow.png");
    this.load.image("star", "assets/pushpull/images/star.png");
  }
  loadMaps() {
    Array(9).fill(0).forEach((_, i) => {
      this.load.tilemapTiledJSON(`scene${i}`, `assets/pushpull/maps/scene${i}.json`);
    });
  }
  loadAudios() {
    this.load.audio("music", "assets/pushpull/sounds/music.mp3");
    this.load.audio("splash", "assets/pushpull/sounds/splash.mp3");
    this.load.audio("win", "assets/pushpull/sounds/win.mp3");
    this.load.audio("hover", "assets/pushpull/sounds/hover.mp3");
    this.load.audio("select", "assets/pushpull/sounds/select.mp3");
    this.load.audio("bump", "assets/pushpull/sounds/bump.mp3");
    this.load.audio("move", "assets/pushpull/sounds/move.mp3");
  }
  loadSpritesheets() {
    this.load.spritesheet("spider", "assets/pushpull/images/spider.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("heart", "assets/pushpull/images/heart.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("frog", "assets/pushpull/images/frog.png", {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.spritesheet("frog2", "assets/pushpull/images/frog2.png", {
      frameWidth: 48,
      frameHeight: 32
    });
    this.load.spritesheet("trail", "assets/pushpull/images/trail.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("block", "assets/pushpull/images/block.png", {
      frameWidth: 48,
      frameHeight: 48
    });
  }
  setRegistry() {
    this.registry.set("score", 0);
    this.registry.set("moves", 0);
    this.registry.set("coins", 0);
  }
  createBars() {
    this.loadBar = this.add.graphics();
    this.loadBar.fillStyle(16769126, 1);
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
};

// games/pushpull/scenes/outro.ts
var Outro = class extends Phaser.Scene {
  constructor() {
    super({ key: "outro" });
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "introLayer");
    __publicField(this, "splashLayer");
    __publicField(this, "text", []);
  }
  /*
     This scene will show some text
     */
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
  /*
     Helper function to show the text line by line
     */
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

// games/pushpull/scenes/splash.ts
var Splash = class extends Phaser.Scene {
  constructor() {
    super({ key: "splash" });
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "background");
    __publicField(this, "theme");
    __publicField(this, "gameLogo1");
    __publicField(this, "gameLogo2");
    __publicField(this, "startButton");
    __publicField(this, "space");
  }
  create() {
    this.width = +this.sys.game.config.width;
    this.height = +this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.background = this.add.tileSprite(0, 0, 1024, 1024, "background").setOrigin(0);
    this.cameras.main.setBackgroundColor(3970982);
    this.time.delayedCall(1e3, () => this.showInstructions(), void 0, this);
    this.addStartButton();
    this.input.keyboard?.on("keydown-SPACE", () => this.startGame(), this);
    this.playMusic();
    this.showTitle();
    this.addStartButton();
  }
  update() {
    this.background.tilePositionX += 1;
    this.background.tilePositionY += 1;
  }
  startGame() {
    if (this.theme) this.theme.stop();
    this.playGameMusic();
    this.scene.start("transition", { name: "STAGE", number: 0 });
  }
  playGameMusic(theme = "music") {
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
  showTitle() {
    this.gameLogo1 = this.add.bitmapText(this.center_width - 1e3, 100, "mario", "Push", 120).setOrigin(0.5).setTint(16777215).setDropShadow(3, 4, 7715143, 0.7);
    this.gameLogo2 = this.add.bitmapText(this.center_width + 1e3, 220, "mario", "Pull", 120).setOrigin(0.5).setTint(16769126).setDropShadow(2, 3, 6895104, 0.7);
    this.titleTweens();
  }
  titleTweens() {
    this.tweens.add({
      targets: [this.gameLogo2],
      duration: 1e3,
      x: { from: this.gameLogo2.x, to: this.center_width },
      onComplete: () => {
        this.tweens.add({
          targets: [this.gameLogo2],
          duration: 1e3,
          x: "-=20",
          repeat: -1,
          ease: "Linear",
          yoyo: true
        });
      }
    });
    this.tweens.add({
      targets: [this.gameLogo1],
      duration: 1e3,
      x: { from: this.gameLogo1.x, to: this.center_width },
      onComplete: () => {
        this.tweens.add({
          targets: [this.gameLogo1],
          duration: 1e3,
          x: "+=20",
          repeat: -1,
          ease: "Linear",
          yoyo: true
        });
      }
    });
  }
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
  addStartButton() {
    this.startButton = this.add.bitmapText(this.center_width, 500, "mario", "start", 30).setOrigin(0.5).setTint(16769126).setDropShadow(2, 3, 6895104, 0.7);
    this.startButton.setInteractive();
    171;
    this.startButton.on("pointerdown", () => {
      this.sound.add("move").play();
      this.startGame();
    });
    this.startButton.on("pointerover", () => {
      this.startButton.setTint(4089973);
    });
    this.startButton.on("pointerout", () => {
      this.startButton.setTint(16769126);
    });
    this.tweens.add({
      targets: this.space,
      duration: 300,
      alpha: { from: 0, to: 1 },
      repeat: -1,
      yoyo: true
    });
  }
  showInstructions() {
    this.add.sprite(this.center_width - 80, 400, "pello").setOrigin(0.5).setScale(0.5);
    this.add.bitmapText(this.center_width + 40, 400, "mario", "By PELLO", 15).setOrigin(0.5);
    this.tweens.add({
      targets: this.space,
      duration: 300,
      alpha: { from: 0, to: 1 },
      repeat: -1,
      yoyo: true
    });
  }
};

// games/pushpull/scenes/transition.ts
var Transition = class extends Phaser.Scene {
  constructor() {
    super({ key: "transition" });
    __publicField(this, "name");
    __publicField(this, "number");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
  }
  init(data) {
    this.name = data.name;
    this.number = data.number;
  }
  /*
     We just show the name of the stage and the word "Ready?". If the stage is the last one, we start the outro scene.
   */
  create() {
    const messages = [
      "Tutorial",
      "Stage0",
      "Stage1",
      "Stage2",
      "Stage3",
      "Stage4",
      "Stage5",
      "Stage6",
      "Stage7",
      "Outro"
    ];
    this.width = +this.sys.game.config.width;
    this.height = +this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.cameras.main.setBackgroundColor(3970982);
    if (this.number === 9) {
      this.scene.start("outro", { name: this.name, number: this.number });
    }
    this.add.bitmapText(
      this.center_width,
      this.center_height - 20,
      "mario",
      messages[this.number],
      40
    ).setOrigin(0.5).setTint(10941206).setDropShadow(2, 3, 7715143, 0.7);
    this.add.bitmapText(
      this.center_width,
      this.center_height + 20,
      "mario",
      "Ready?",
      30
    ).setOrigin(0.5).setTint(10941206).setDropShadow(2, 3, 7715143, 0.7);
    this.time.delayedCall(1e3, () => this.loadNext(), void 0, this);
  }
  loadNext() {
    this.scene.start("game", {
      name: this.name,
      number: this.number,
      limitedTime: 10 + this.number * 3
    });
  }
};

// games/pushpull/gameobjects/block.ts
var Block = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "block_blue", _velocity = 100) {
    super(scene, x, y, name);
    __publicField(this, "id");
    this.setOrigin(0, 0);
    this.scene = scene;
    this.name = name;
  }
};

// games/pushpull/gameobjects/block_group.ts
var BlockGroup = class extends Phaser.GameObjects.Container {
  constructor(scene, x, y, w = 2, h = 3, color = "blue", defaultVelocity = 100) {
    super(scene, x, y);
    __publicField(this, "w");
    __publicField(this, "h");
    __publicField(this, "id");
    __publicField(this, "defaultVelocity");
    __publicField(this, "allowChangeDirection");
    __publicField(this, "cursor");
    __publicField(this, "W");
    __publicField(this, "A");
    __publicField(this, "S");
    __publicField(this, "D");
    this.w = +w;
    this.h = +h;
    this.id = Math.random();
    this.name = "block_" + color;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.immovable = true;
    this.active = false;
    153;
    this.setKeys();
    this.defaultVelocity = defaultVelocity;
    this.createBlock();
    this.allowChangeDirection = true;
    this.scene.events.on("update", this.update, this);
    this.setListeners();
  }
  createBlock() {
    this.body.setSize(this.w * 32, this.h * 32);
    for (let i = 0; i < this.w; i++) {
      for (let j = 0; j < this.h; j++) {
        this.add(new Block(this.scene, i * 32, j * 32, this.name));
      }
    }
  }
  setKeys() {
    if (!this.scene.input.keyboard) throw "No Keyboard input found";
    this.cursor = this.scene.input.keyboard.createCursorKeys();
    this.W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.scene.events.on("update", this.update, this);
  }
  setListeners() {
    this.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, 64, 96),
      Phaser.Geom.Rectangle.Contains
    );
    this.on("pointerdown", () => {
      this.scene.playAudio("select");
      this.iterate((block) => block.setTint(3170416));
      this.activate();
    });
    this.on("pointerover", () => {
      this.scene.playAudio("hover");
      this.iterate((block) => block.setTint(3170416));
    });
    this.on("pointerout", () => {
      this.iterate((block) => block.clearTint());
    });
  }
  activate() {
    if (this.scene.activeBlock) this.scene.activeBlock.deactivate();
    this.active = true;
    this.scene.activeBlock = this;
  }
  deactivate() {
    this.active = false;
  }
  update() {
    if (!this.active) return;
    if ((Phaser.Input.Keyboard.JustUp(this.S) || Phaser.Input.Keyboard.JustUp(this.cursor.down)) && this.canMoveDown()) {
      this.leaveTrail(this.w * 32, 32);
      this.y += 32;
      this.scene.updateMoves();
    } else if ((Phaser.Input.Keyboard.JustUp(this.W) || Phaser.Input.Keyboard.JustUp(this.cursor.up)) && this.canMoveUp()) {
      this.leaveTrail(this.w * 32, 32, 0, (this.h - 1) * 32);
      this.y -= 32;
      this.scene.updateMoves();
    } else if ((Phaser.Input.Keyboard.JustUp(this.D) || Phaser.Input.Keyboard.JustUp(this.cursor.right)) && this.canMoveRight()) {
      this.leaveTrail(32, this.h * 32);
      this.x += 32;
      this.scene.updateMoves();
    } else if ((Phaser.Input.Keyboard.JustUp(this.A) || Phaser.Input.Keyboard.JustUp(this.cursor.left)) && this.canMoveLeft()) {
      this.leaveTrail(32, this.h * 32, (this.w - 1) * 32);
      this.x -= 32;
      this.scene.updateMoves();
    }
  }
  leaveTrail(w, h, offsetX = 0, offsetY = 0) {
    this.scene.playAudio("move");
    const trail = this.scene.add.rectangle(this.x + offsetX, this.y + offsetY, w, h, 13421772).setOrigin(0);
    this.scene.tweens.add({
      targets: [trail],
      duration: 300,
      alpha: { from: 1, to: 0 },
      onComplete: () => {
        trail.destroy();
      }
    });
  }
  isOverlap(x = 0, y = 0) {
    const overlaps = [...this.scene.blocks.children].map((object) => {
      const block = object;
      if (block.id === this.id) return false;
      const myBounds = this.getBounds();
      const otherBounds = block.getBounds();
      myBounds.x += 1;
      myBounds.y += 1;
      myBounds.width = this.w * 32 - 2;
      myBounds.height = this.h * 32 - 2;
      myBounds.x += x;
      myBounds.y += y;
      const intersect = Phaser.Geom.Intersects.RectangleToRectangle(
        myBounds,
        otherBounds
      );
      return intersect;
    });
    return !overlaps.every((block) => !block);
  }
  canMoveDown(distance = 32) {
    if (this.isOverlap(0, 1)) {
      this.scene.playAudio("bump");
      return false;
    }
    distance = this.h * 32;
    const blocks = Array(this.w).fill(0).map((_, i) => {
      return this.scene.platform.getTileAtWorldXY(
        this.x + i * 32,
        this.y + distance
      );
    });
    const canMove = blocks.every((block) => !block);
    if (!canMove) {
      this.scene.playAudio("bump");
    }
    return canMove;
  }
  canMoveUp(_distance = 32) {
    if (this.isOverlap(0, -1)) {
      this.scene.playAudio("bump");
      return false;
    }
    const blocks = Array(this.w).fill(0).map((_, i) => {
      return this.scene.platform.getTileAtWorldXY(
        this.x + i * 32,
        this.y - 1
      );
    });
    const canMove = blocks.every((block) => !block);
    if (!canMove) {
      this.scene.playAudio("bump");
    }
    return canMove;
  }
  canMoveLeft(distance = 32) {
    if (this.isOverlap(-1, 0)) {
      this.scene.playAudio("bump");
      return false;
    }
    const blocks = Array(this.h).fill(0).map((_, i) => {
      return this.scene.platform.getTileAtWorldXY(
        this.x - distance,
        this.y + i * 32
      );
    });
    const canMove = blocks.every((block) => !block);
    if (!canMove) {
      this.scene.playAudio("bump");
    }
    return canMove;
  }
  canMoveRight(distance = 32) {
    if (this.isOverlap(1, 0)) {
      this.scene.playAudio("bump");
      return false;
    }
    distance = this.w * 32;
    const blocks = Array(this.h).fill(0).map((_, i) => {
      return this.scene.platform.getTileAtWorldXY(
        this.x + distance,
        this.y + i * 32
      );
    });
    const canMove = blocks.every((block) => !block);
    if (!canMove) {
      this.scene.playAudio("bump");
    }
    return canMove;
  }
};

// games/pushpull/gameobjects/exit.ts
var Exit = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "star") {
    super(scene, x, y, "star");
    this.name = name;
    this.setOrigin(0.5);
    this.setAlpha(0);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
  }
};

// games/pushpull/scenes/game.ts
var Game = class extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    __publicField(this, "player");
    __publicField(this, "score");
    __publicField(this, "scoreText");
    __publicField(this, "name");
    __publicField(this, "number");
    __publicField(this, "limitedTime");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "center_width");
    __publicField(this, "center_height");
    __publicField(this, "solved");
    __publicField(this, "R");
    __publicField(this, "movesText");
    __publicField(this, "totalMoves");
    __publicField(this, "tileMap");
    __publicField(this, "tileSetBg", null);
    __publicField(this, "tileSet", null);
    __publicField(this, "platform");
    __publicField(this, "objectsLayer", null);
    __publicField(this, "exits");
    __publicField(this, "blocks");
    __publicField(this, "texts");
    __publicField(this, "activeBlock");
    __publicField(this, "pointer");
    __publicField(this, "audios");
    __publicField(this, "winText");
    __publicField(this, "timerText");
    this.player = null;
    this.score = 0;
    this.scoreText = null;
  }
  init(data) {
    this.name = data.name;
    this.number = data.number ?? 0;
    this.limitedTime = data.limitedTime ?? 10;
  }
  preload() {
  }
  create() {
    this.width = +this.sys.game.config.width;
    this.height = +this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.cameras.main.setBackgroundColor(0);
    this.input.mouse?.disableContextMenu();
    this.addPointer();
    this.addMap();
    this.addMoves();
    this.addRetry();
    this.loadAudios();
    this.showTexts();
    this.solved = false;
  }
  addRetry() {
    if (!this.input.keyboard) throw "Failed to get keyboard input";
    this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  }
  addMoves() {
    this.movesText = this.add.bitmapText(this.center_width, 32, "mario", "0", 30).setOrigin(0.5).setTint(16769126).setDropShadow(3, 4, 7715143, 0.7);
    this.totalMoves = 0;
  }
  addMap() {
    this.tileMap = this.make.tilemap({
      key: `scene${this.number}`,
      tileWidth: 32,
      tileHeight: 32
    });
    this.tileSetBg = this.tileMap.addTilesetImage("tileset_fg");
    if (!this.tileSetBg) throw "Failed to create Tile Set Bg";
    this.tileMap.createLayer("background", this.tileSetBg);
    this.tileSet = this.tileMap.addTilesetImage("tileset_fg");
    if (!this.tileSet) throw "Failed to create Tile Set";
    this.platform = this.tileMap.createLayer(
      `scene${this.number}`,
      this.tileSet
    );
    this.objectsLayer = this.tileMap.getObjectLayer("objects");
    this.platform.setCollisionByExclusion([-1]);
    this.physics.world.setBounds(0, 0, this.width, this.height);
    this.exits = this.add.group();
    this.blocks = this.add.group();
    this.texts = [];
    this.addObjects();
  }
  addObjects() {
    this.objectsLayer?.objects.forEach((object) => {
      if (!object.x || !object.y) throw "Object missing properties";
      if (object.name.startsWith("block")) {
        const [_name, width, height, color] = object.name.split("_");
        this.activeBlock = new BlockGroup(
          this,
          object.x,
          object.y,
          +width,
          +height,
          color
        );
        this.blocks.add(this.activeBlock);
        if (object.name.startsWith("block_1_1")) {
          this.addPlayer(this.activeBlock);
        }
      }
      if (object.name.startsWith("exit")) {
        this.exits.add(new Exit(this, object.x - 16, object.y));
      }
    });
  }
  showTexts() {
    if (this.number > 0) return;
    const texts = [
      "Select cubes",
      "Pull/push them with WASD/Arrows",
      "MOVE the red to exit"
    ];
    texts.forEach((text, i) => {
      this.add.bitmapText(this.center_width, 425 + 35 * i, "mario", text, 15).setOrigin(0.5).setTint(16769126).setDropShadow(1, 2, 12526882, 0.7);
    });
  }
  addPlayer(block) {
    this.player = block;
    this.physics.add.overlap(
      this.player,
      this.exits,
      this.hitExit,
      () => {
        return true;
      },
      this
    );
  }
  hitExit(player, exit) {
    player.active = false;
    exit.destroy();
    this.finishScene();
  }
  addPointer() {
    this.pointer = this.input.activePointer;
    this.input.mouse?.disableContextMenu();
  }
  loadAudios() {
    this.audios = {
      bump: this.sound.add("bump"),
      hover: this.sound.add("hover"),
      select: this.sound.add("select"),
      move: this.sound.add("move"),
      win: this.sound.add("win")
    };
  }
  playAudio(key) {
    this.audios[key].play();
  }
  playRandom(key, volume = 1) {
    this.audios[key].play({
      rate: Phaser.Math.Between(1, 1.5),
      detune: Phaser.Math.Between(-1e3, 1e3),
      delay: 0,
      volume
    });
  }
  update() {
    if (Phaser.Input.Keyboard.JustDown(this.R)) {
      this.restartScene();
    }
  }
  finishScene() {
    if (this.solved) return;
    this.playAudio("win");
    this.solved = true;
    const totalMoves = +this.registry.get("moves") + this.totalMoves;
    this.registry.set("moves", totalMoves);
    this.winText = this.add.bitmapText(this.center_width, -100, "mario", "STAGE CLEARED!", 30).setOrigin(0.5).setTint(16769126).setDropShadow(2, 3, 7715143, 0.7);
    this.tweens.add({
      targets: this.winText,
      duration: 500,
      y: { from: this.winText.y, to: this.center_height }
    });
    this.tweens.add({
      targets: [this.winText, this.movesText],
      duration: 100,
      scale: { from: 1, to: 1.1 },
      repeat: -1,
      yoyo: true
    });
    this.time.delayedCall(
      2e3,
      () => {
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
  restartScene() {
    this.scene.start("game", {
      next: "underwater",
      name: "STAGE",
      number: this.number
    });
  }
  updateMoves() {
    this.totalMoves++;
    this.movesText.setText(this.totalMoves.toString());
    this.tweens.add({
      targets: [this.timerText],
      duration: 200,
      alpha: { from: 0.6, to: 1 },
      repeat: -1
    });
  }
};

// games/pushpull/main.ts
var config = {
  width: 608,
  height: 608,
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
  plugins: {},
  scene: [Bootloader, Splash, Transition, Game, Outro]
};
var game = new Phaser2.Game(config);
//# sourceMappingURL=main.js.map
