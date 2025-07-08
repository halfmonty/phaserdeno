export default class Bootloader extends Phaser.Scene {
    progressBar!: Phaser.GameObjects.Graphics;
    loadBar!: Phaser.GameObjects.Graphics;

    constructor() {
        super({ key: 'bootloader' });
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
      (value: number) => {
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
    Array(5)
      .fill(0)
      .forEach((_, i) => {
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
      frameHeight: 48,
    });
    this.load.spritesheet("dust", "assets/dungeon/images/dust.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("coin", "assets/dungeon/images/coin.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("keys", "assets/dungeon/images/keys.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("bat", "assets/dungeon/images/bat.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("wizard", "assets/dungeon/images/wizard.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
  }

  /*
    This one adds the load bar to the scene.
    */
  createBars() {
    this.loadBar = this.add.graphics();
    this.loadBar.fillStyle(0x00aafb, 1);
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
}