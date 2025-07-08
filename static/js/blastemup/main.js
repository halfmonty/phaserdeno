var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// games/blastemup/main.ts
import Phaser2 from "https://esm.sh/phaser@4.0.0-rc.4";

// games/blastemup/scenes/bootloader.ts
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
        this.progressBar.fillStyle(8966732, 1);
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
        this.scene.start("game");
      },
      this
    );
    Array(6).fill(0).forEach((_, i) => {
      this.load.audio(`muzik${i}`, `assets/blastemup/sounds/muzik${i}.mp3`);
    });
    this.load.image("ship1_1", "assets/blastemup/images/starship.png");
    this.load.image("foeship", "assets/blastemup/images/foeship.png");
    this.load.image("pello", "assets/blastemup/images/pello.png");
    this.load.image("hex", "assets/blastemup/images/hex64.png");
    this.load.image("asteroid", "assets/blastemup/images/asteroid.png");
    this.load.audio("splash", "assets/blastemup/sounds/splash.mp3");
    this.load.audio("game-over", "assets/blastemup/sounds/game-over.mp3");
    this.load.audio("explosion", "assets/blastemup/sounds/explosion.mp3");
    this.load.audio("shot", "assets/blastemup/sounds/shot.mp3");
    this.load.audio("foeshot", "assets/blastemup/sounds/foeshot.mp3");
    this.load.audio("pick", "assets/blastemup/sounds/pick.mp3");
    this.load.audio("asteroid", "assets/blastemup/sounds/asteroid.mp3");
    this.load.bitmapFont(
      "arcade",
      "assets/blastemup/fonts/arcade.png",
      "assets/blastemup/fonts/arcade.xml"
    );
    this.load.bitmapFont(
      "wendy",
      "assets/blastemup/fonts/arcade.png",
      "assets/blastemup/fonts/wendy.xml"
    );
    this.load.bitmapFont(
      "starshipped",
      "assets/blastemup/fonts/starshipped.png",
      "assets/blastemup/fonts/starshipped.xml"
    );
    this.load.spritesheet("shot", "assets/blastemup/images/shot.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("shotfoe", "assets/blastemup/images/shotfoe.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("energy", "assets/blastemup/images/energy.png", {
      frameWidth: 32,
      frameHeight: 32
    });
  }
  create() {
  }
  createBars() {
    this.loadBar = this.add.graphics();
    this.loadBar.fillStyle(33923, 1);
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
};

// games/blastemup/gameobjects/particle.ts
var Particle = class extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, color = 16777215, size = 4, alpha = 1) {
    super(scene, x, y, size, size, color, alpha);
    this.name = "bubble";
    this.scene = scene;
    this.alpha = alpha;
    this.setOrigin(0.5);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.init();
  }
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
var particle_default = Particle;

// games/blastemup/gameobjects/player.ts
var Player = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name) {
    super(scene, x, y, "ship1_1");
    __publicField(this, "speed");
    __publicField(this, "friction");
    __publicField(this, "death");
    __publicField(this, "cursor");
    __publicField(this, "upDelta");
    __publicField(this, "oldPosition");
    this.scene = scene;
    this.name = name;
    this.tint = Math.random() * 16777215;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.body.setCircle(26);
    this.body.setOffset(6, 9);
    this.body.setBounce(0.8);
    this.angle = 0;
    this.speed = 0;
    this.friction = 0.95;
    this.death = false;
    this.init();
  }
  /*
  Sets the controls for both cursor keys. Also sets default prooperties for body.
  	*/
  init() {
    this.cursor = this.scene.input.keyboard?.createCursorKeys() ?? (() => {
      throw "Failed to get keyboard input";
    })();
    this.scene.events.on("update", this.update, this);
    this.body.setDrag(300);
    this.body.setAngularDrag(400);
    this.body.setMaxVelocity(600);
    this.upDelta = 0;
  }
  /*
  This is a getter so we can get the unique identifier from the name of the player.
  	*/
  get key() {
    return this.name.split(":")[1];
  }
  /*
  The update loop is used to move the spaceship according to the user input. When the player moves to right/left the body of the ship will rotate, when moving up it will gain velocity. Randomly, a trailing particle will be added.
  	*/
  update(_timestep, delta) {
    if (this.death) return;
    if (this.scene.player.key == this.key) {
      if (this.cursor.left.isDown) {
        this.body.setAngularVelocity(-150);
      } else if (this.cursor.right.isDown) {
        this.body.setAngularVelocity(150);
      } else {
        this.body.setAngularVelocity(0);
      }
      if (this.cursor.up.isDown) {
        this.upDelta += delta;
        if (this.upDelta > 200) {
          this.upDelta = 0;
        }
        this.body.setVelocity(
          Math.cos(this.rotation) * 300,
          Math.sin(this.rotation) * 300
        );
      } else {
        this.body.setAcceleration(0);
      }
      if (Phaser.Math.Between(1, 4) > 1) {
        this.scene.thrust.add(
          new particle_default(this.scene, this.x, this.y, 16777215, 10)
        );
      }
    }
  }
  destroy() {
    this.death = true;
    super.destroy();
  }
};
var player_default = Player;

// games/blastemup/status.ts
var NEW_PLAYER = "newPlayer";
var PLAYER_DISCONNECTED = "playerDisconnected";
var PLAYER_IS_MOVING = "playerIsMoving";

// games/blastemup/scenes/game.ts
var Game = class extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    __publicField(this, "id", null);
    __publicField(this, "socket");
    __publicField(this, "enemies");
    __publicField(this, "enemyPlayers");
    __publicField(this, "player");
    __publicField(this, "thrust");
    __publicField(this, "audios");
    __publicField(this, "theme");
  }
  create() {
    this.id = null;
    this.startSockets();
    this.loadAudios();
    this.playMusic();
  }
  /*
  This is where the connection with the server is established and we set listeners for events that we will receive from that server. Through those listeners, we will be aware of new players, player movement and player destroy events. We need to add that `.bind(this)` to this event callback to make the elements of this class reachable. In this case, we separate the group of enemies in a hash and their physical group with `this.enemyPlayers` to set the collisions. But we could just use the physical group.
  	*/
  startSockets() {
    this.socket = new WebSocket("ws://localhost:3000/ws/blastemup/");
    this.socket.onopen = () => {
      console.log("Connected to WebSocket server");
      this.addPlayer();
    };
    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleMessage(data.type, data.payload);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    this.socket.onclose = () => {
      console.log("WebSocket connection closed");
      this.destroy();
    };
    this.enemies = {};
    this.enemyPlayers = this.physics.add.group();
  }
  handleMessage(type, payload) {
    switch (type) {
      case "newPlayer":
        this.addEnemyPlayers(payload);
        break;
      case "currentPlayers":
        Object.keys(payload).forEach((key) => {
          if (!this.enemies[key] && key !== this.player.key) {
            this.addEnemyPlayers(payload[key]);
          }
        });
        break;
      case "playerMoved":
        {
          const [_name, key] = payload.name.split(":");
          if (this.enemies[key]) {
            this.enemies[key].setRotation(payload.rotation);
            this.enemies[key].setPosition(payload.x, payload.y);
          }
        }
        break;
      case "playerDisconnected":
        this.enemyPlayers.getChildren().forEach((otherPlayer) => {
          const op = otherPlayer;
          if (payload === op.key) {
            otherPlayer.destroy();
          }
        });
        break;
      default:
        console.log("Unknown message type:", type);
    }
  }
  sendMessage(type, payload) {
    console.log(`sending message ${type}`);
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }));
    } else {
      console.warn("WebSocket is not connected");
    }
  }
  /*
  When a new enemy event is received, we'll add this new game object to this player's screen.
  	*/
  addEnemyPlayers(enemyPlayer) {
    const [_name, key] = enemyPlayer.name.split(":");
    console.log("Adding enemy player! ", enemyPlayer.name, " Against ", key);
    const enemy = new player_default(
      this,
      enemyPlayer.x,
      enemyPlayer.y,
      enemyPlayer.name
    );
    this.enemies[enemy.key] = enemy;
    this.enemyPlayers.add(enemy);
    this.addColliders();
  }
  /*
  When we add our local player to the game, we must notify the server about it! We are setting a generic game here, but we could add a custom name from a website.
  	*/
  addPlayer() {
    this.thrust = this.add.layer();
    const x = 600 + Phaser.Math.Between(-100, 100);
    const y = 500 + Phaser.Math.Between(-100, 100);
    this.player = new player_default(this, x, y, "MyName:" + crypto.randomUUID());
    console.log("Creating player! ", this.player.key);
    this.sendMessage(NEW_PLAYER, this.player);
    this.setCamera();
  }
  setCamera() {
    this.cameras.main.setBackgroundColor(13421772);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05, 0, 100);
  }
  /*
  This is the only collider in this simplified game. If the player hits any other ship, both ships will be destroyed.
  	*/
  addColliders() {
    this.physics.add.overlap(
      this.player,
      this.enemyPlayers,
      this.playerCollision,
      void 0,
      this
    );
  }
  playerCollision(player, foe) {
    this.sendMessage(PLAYER_DISCONNECTED, player.key);
    player.destroy();
    foe.destroy();
  }
  /*
  In the game loop, we check if the player position has changed. If it has, we notify the server about it, so other players can reproduce the movement.
  	*/
  update() {
    if (this.player) {
      const currPosition = {
        x: this.player.x,
        y: this.player.y,
        rotation: this.player.rotation
      };
      if (this.player.oldPosition && (currPosition.x !== this.player.oldPosition.x || currPosition.y !== this.player.oldPosition.y || currPosition.rotation !== this.player.oldPosition.rotation)) {
        this.sendMessage(PLAYER_IS_MOVING, {
          key: this.player.key,
          ...currPosition
        });
      }
      this.player.oldPosition = currPosition;
    }
  }
  /*
  The rest of the game is same as usual.
  	*/
  loadAudios() {
    this.audios = {
      pick: this.sound.add("pick"),
      shot: this.sound.add("shot"),
      foeshot: this.sound.add("foeshot"),
      explosion: this.sound.add("explosion"),
      asteroid: this.sound.add("asteroid")
    };
  }
  playAudio(key) {
    this.audios[key].play({ volume: 0.2 });
  }
  playMusic(theme) {
    const selectedMusic = theme ?? `muzik${Phaser.Math.Between(0, 5)}`;
    this.theme = this.sound.add(selectedMusic);
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
  startGame() {
    if (this.theme) this.theme.stop();
    this.scene.start("game");
  }
  destroy() {
    console.log("destroying");
    if (this.player) this.sendMessage(PLAYER_DISCONNECTED, this.player.key);
  }
};

// games/blastemup/main.ts
var config = {
  useTicker: true,
  width: 868,
  height: 800,
  scale: {
    mode: Phaser2.Scale.FIT,
    autoCenter: Phaser2.Scale.CENTER_BOTH
  },
  parent: "game-container",
  autoRound: false,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  plugins: {},
  scene: [Bootloader, Game]
};
var game = new Phaser2.Game(config);
//# sourceMappingURL=main.js.map
