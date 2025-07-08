export default class Blow extends Phaser.GameObjects.Rectangle {

    constructor(scene: Phaser.Scene, x: number, y: number, width = 32, height = 32, type = "") {
        super(scene, x, y, width, height, 0xffffff);
        this.type = type;
        this.y = y;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        this.scene.tweens.add({
            targets: this,
            duration: 300,
            scale: { from: 1, to: 0 },
            onComplete: () => {
                this.destroy();
            }
        });
    }
}