export default class Bootloader extends Phaser.Scene {
    loadBar!: Phaser.GameObjects.Graphics;
    progressBar!: Phaser.GameObjects.Graphics;

    constructor() {
        super({ key: "bootloader" });
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
            (value: number) => {
                this.progressBar.clear();
                this.progressBar.fillStyle(0xa6f316, 1);
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
                this.scene.start('splash');
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
        Array(9)
            .fill(0)
            .forEach((_, i) => {
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
            frameHeight: 32,
        });
        this.load.spritesheet("heart", "assets/pushpull/images/heart.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("frog", "assets/pushpull/images/frog.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.spritesheet("frog2", "assets/pushpull/images/frog2.png", {
            frameWidth: 48,
            frameHeight: 32,
        });
        this.load.spritesheet("trail", "assets/pushpull/images/trail.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("block", "assets/pushpull/images/block.png", {
            frameWidth: 48,
            frameHeight: 48,
        });
    }

    setRegistry() {
        this.registry.set("score", 0);
        this.registry.set("moves", 0);
        this.registry.set("coins", 0);
    }

    createBars() {
        this.loadBar = this.add.graphics();
        this.loadBar.fillStyle(0xffe066, 1);
        this.loadBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        );
        this.progressBar = this.add.graphics();
    }
}