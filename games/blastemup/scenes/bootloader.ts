export default class Bootloader extends Phaser.Scene {
    progressBar!: Phaser.GameObjects.Graphics;
    loadBar!: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: "bootloader" });
  }

  preload() {
    this.createBars();
    this.load.on(
      "progress",
      (value: number) => {
        this.progressBar.clear();
        this.progressBar.fillStyle(0x88d24c, 1);
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
        this.scene.start("game");
      },
      this
    );

    Array(6)
      .fill(0)
      .forEach((_, i) => {
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
      frameHeight: 32,
    });
    this.load.spritesheet("shotfoe", "assets/blastemup/images/shotfoe.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("energy", "assets/blastemup/images/energy.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {}

  createBars() {
    this.loadBar = this.add.graphics();
    this.loadBar.fillStyle(0x008483, 1);
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
}