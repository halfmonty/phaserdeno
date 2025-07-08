export default class Transition extends Phaser.Scene {
    name!: string;
    number!: number;
    next!: Phaser.Scene;

    width!: number;
    height!: number;
    center_width!: number;
    center_height!: number;

    scoreCoins: Phaser.GameObjects.BitmapText | undefined;
    scoreCoinsLogo: Phaser.GameObjects.Sprite | undefined;

    constructor() {
        super({ key: "transition" });
    }

    init(data: {name: string, number: number, next: Phaser.Scene}) {
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
        this.add.bitmapText(this.center_width, this.center_height - 20, "pixelFont", messages[this.number], 40)
            .setOrigin(0.5);
        this.add.bitmapText(this.center_width, this.center_height + 20, "pixelFont", "Ready?", 30)
            .setOrigin(0.5);
        this.input.keyboard?.on("keydown-ENTER", () => this.loadNext(), this);
        this.input.keyboard?.on("keydown-SPACE", () => this.loadNext(), this);
        this.time.delayedCall(
            3000,
            () => {
                this.loadNext();
            },
            undefined,
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
        this.scoreCoins = this.add
            .bitmapText(
                this.center_width + 32,
                this.center_height - 100,
                "pixelFont",
                "x" + this.registry.get("coins"),
                30
            )
            .setDropShadow(0, 4, 0x222222, 0.9)
            .setOrigin(0.5)
            .setScrollFactor(0);
        
        this.scoreCoinsLogo = this.add
            .sprite(this.center_width - 32, this.center_height - 100, "coin")
            .setScale(0.7)
            .setOrigin(0.5)
            .setScrollFactor(0);
        
        this.anims.create({
            key: "coinscore",
            frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 7 }),
            frameRate: 8
        });
        this.scoreCoinsLogo.play({ key: "coinscore", repeat: -1 });
    }
}