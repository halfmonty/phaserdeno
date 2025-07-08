export default class Platform extends Phaser.GameObjects.Container {
    chain: Phaser.GameObjects.Sprite;
    platform: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number, size = 4, demo = false) {
        super(scene, x, y);
        this.x = x;
        this.y = y;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        (this.body as Phaser.Physics.Arcade.Body).setBounce(1);
        (this.body as Phaser.Physics.Arcade.Body).setSize(size * 64, 64);
        (this.body as Phaser.Physics.Arcade.Body).setOffset(-2, -2);
        (this.body as Phaser.Physics.Arcade.Body).immovable = true;
        (this.body as Phaser.Physics.Arcade.Body).moves = false;
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
            duration: Phaser.Math.Between(4000, 6000),
            x: { from: this.x, to: offsetX },
            y: { from: this.y, to: offsetY },
            repeat: -1,
            yoyo: true
        });
    }
}