export default class Bootloader extends Phaser.Scene {
  progressBar!: Phaser.GameObjects.Graphics;
  loadBar!: Phaser.GameObjects.Graphics;
  constructor() {
    super({ key: "bootloader" });
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
      function (this: Bootloader, value: number) {
        this.progressBar.clear();
        this.progressBar.fillStyle(0x0088aa, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
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
    Array(4)
      .fill(0)
      .forEach((_, i) => {
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
    Array(3)
      .fill(0)
      .forEach((_, i) => {
        this.load.audio(`music${i + 1}`, `assets/starshake/sounds/music${i + 1}.mp3`);
      });
  }

  /*
    Load the sprite sheets (animated images) we use in the game.
    */
  loadSpritesheets() {
    this.load.spritesheet("player1", "assets/starshake/images/player1.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("foe0", "assets/starshake/images/foe0.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("foe1", "assets/starshake/images/foe1.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("foe2", "assets/starshake/images/foe2.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("guinxu", "assets/starshake/images/guinxu.png", {
      frameWidth: 128,
      frameHeight: 144,
    });
    this.load.spritesheet("plenny0", "assets/starshake/images/plenny0.png", {
      frameWidth: 64,
      frameHeight: 64,
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
    this.loadBar.fillStyle(0xd40000, 1);
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
}