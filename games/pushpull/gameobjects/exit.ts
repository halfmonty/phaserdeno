export default class Exit extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, name = "star") {
        super(scene, x, y, "star");
        this.name = name;
        this.setOrigin(0.5);
        this.setAlpha(0);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    }
}