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
                this.progressBar.fillStyle(0xf09937, 1);
                this.progressBar.fillRect(
                    this.cameras.main.width / 4,
                    this.cameras.main.height / 2 - 16,
                    (this.cameras.main.width / 2) * value,
                    16,
                );
            },
            this,
        );

        this.load.on(
            "complete",
            () => {
                this.scene.start("splash");
            },
            this,
        );

        Array(5)
            .fill(0)
            .forEach((_, i) => {
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

        Array(2)
            .fill(0)
            .forEach((_, i) => {
                this.load.image(`brick${i}`, `assets/wallhammer/images/brick${i}.png`);
            });
        Array(5)
            .fill(0)
            .forEach((_, i) => {
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
            frameHeight: 64,
        });
        Array(5)
            .fill(0)
            .forEach((_, i) => {
                this.load.tilemapTiledJSON(`scene${i}`, `assets/wallhammer/maps/scene${i}.json`);
            });
        this.load.image("softbricks", "assets/wallhammer/maps/softbricks.png");
        this.load.image("bricks", "assets/wallhammer/maps/bricks.png");
        this.load.image("background", "assets/wallhammer/maps/background.png");
        this.load.image("chain", "assets/wallhammer/images/chain.png");

        this.load.spritesheet("bat", "assets/wallhammer/images/bat.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("zombie", "assets/wallhammer/images/zombie.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("coin", "assets/wallhammer/images/coin.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("lunchbox", "assets/wallhammer/images/lunchbox.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("hammer", "assets/wallhammer/images/hammer.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("speed", "assets/wallhammer/images/speed.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("boots", "assets/wallhammer/images/boots.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("star", "assets/wallhammer/images/star.png", {
            frameWidth: 64,
            frameHeight: 64,
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
        this.loadBar.fillStyle(0xca6702, 1);
        this.loadBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        );
        this.progressBar = this.add.graphics();
    }
}
