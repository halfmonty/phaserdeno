export default class Turn extends Phaser.GameObjects.Rectangle {
    constructor(scene: Phaser.Scene, x: number, y: number, width: number = 32, height: number = 32, type: string = "") {
        super(scene, x, y, width, height, 0xffffff);
        this.type = type;
        this.setAlpha(0);
        this.x = x;
        this.y = y;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        (this.body as Phaser.Physics.Arcade.Body).immovable = true;
        (this.body as Phaser.Physics.Arcade.Body).moves = false;
    }

    disable() {
        this.visible = false;
        this.destroy();
    }

    override destroy() {
        super.destroy();
    }
}