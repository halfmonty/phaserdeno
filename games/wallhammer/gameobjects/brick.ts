    export default class Brick extends Phaser.GameObjects.Sprite {
        declare body: Phaser.Physics.Arcade.Body;
        constructor(scene: Phaser.Scene, x: number, y: number, name = "brick0") {
            super(scene, x, y, name);
            this.name = name;

            this.scene.add.existing(this);
            this.scene.physics.add.existing(this);
            this.body.immovable = true;
            this.body.moves = false;
            this.scene.tweens.add({
                targets: this,
                duration: 50,
                x: { from: this.x, to: this.x + Phaser.Math.Between(-7, 7) },
                y: { from: this.y, to: this.y + Phaser.Math.Between(-7, 7) },
                repeat: 5,
            });
        }
    }