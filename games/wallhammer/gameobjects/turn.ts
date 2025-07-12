export default class Turn extends Phaser.GameObjects.Rectangle {
    declare body: Phaser.Physics.Arcade.Body;
    constructor(scene: Phaser.Scene, x: number, y: number, width: number = 32, height: number = 32, type: string = "") {
        super(scene, x, y, width, height, 0xffffff);
        this.type = type;
        this.setAlpha(0);
        this.x = x;
        this.y = y;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.immovable = true;
        this.body.moves = false;
    }

    disable() {
        this.visible = false;
        this.destroy();
    }

    override destroy() {
        super.destroy();
    }
}