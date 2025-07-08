export default class Zombie extends Phaser.Physics.Arcade.Sprite {
    direction: number;
    dead: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, type: string = "right") {
        super(scene, x, y, "zombie");
        this.name = "zombie";
        this.scene = scene;
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        // this.body?.setAllowGravity(true);
        this.direction = type === "right" ? -1 : 1;

        this.init();
    }

    // Inits animation for the zombies and starts the movement
    init() {
        this.scene.anims.create({
            key: this.name,
            frames: this.scene.anims.generateFrameNumbers(this.name, {
                start: 0,
                end: 2,
            }),
            frameRate: 5,
            repeat: -1,
        });

        this.scene.anims.create({
            key: this.name + "death",
            frames: this.scene.anims.generateFrameNumbers(this.name, {
                start: 3,
                end:5
            }),
            frameRate: 5
        });

        this.anims.play(this.name, true);
        this.body?.velocity.set(this.direction * 100);
        this.flipX = this.direction < 0;
        this.on("animationcomplete", this.animationComplete, this);
    }

    // Turns the zombie around and changes the direction
    turn() {
        this.direction = -this.direction;
        this.flipX = this.direction < 0;
        this.body?.velocity.set(this.direction * 100);
    }

    // This kills the zombie "nicely" by playing the death animation
    death() {
        this.dead = true;
        if (this.body) this.body.enable = true
        this.rotation = 0;
        this.anims.play(this.name + "death");
    }

    // When death animation is completed, then destroy the zombie
    animationComplete(animation: Phaser.Animations.Animation, _frame: Phaser.Animations.AnimationFrame) {
        if(animation.key === this.name + "death") {
            this.destroy();
        }
    }
}