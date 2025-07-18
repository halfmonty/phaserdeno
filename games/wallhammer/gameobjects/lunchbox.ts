import Game from '../scenes/game.ts';

export default class LunchBox extends Phaser.GameObjects.Sprite {;
    declare scene: Game
    declare body: Phaser.Physics.Arcade.Body;
    disabled: boolean;
    prizeSprite: Phaser.GameObjects.Sprite | undefined;

    constructor(scene: Phaser.Scene, x: number, y: number, name:string = "lunchbox") {
        super(scene, x, y, name);
        this.scene = scene as Game;
        this.name = name;
        this.setScale(1);
        this.setOrigin(0.5);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.immovable = true;
        this.body.moves = false;
        this.disabled = false;
        this.init();
    }

    init() {
        this.scene.anims.create({
            key: this.name,
            frames: this.scene.anims.generateFrameNumbers(this.name, {
                start: 0,
                end: 0,
            }),
            frameRate: 1
        });

        this.scene.anims.create({
            key: this.name + "opened",
            frames: this.scene.anims.generateFrameNumbers(this.name, {
                start: 1,
                end: 1,
            }),
            frameRate: 1
        });

        this.anims.play(this.name, true);
        this.scene.tweens.add({
            targets: this,
            duration: 500,
            y: this.y -20,
            repeat: -1,
            yoyo: true
        });
    }

    pick() {
        this.anims.play(this.name + "opened", true);
        this.showPrize();
        this.disabled = true;
        this.scene.time.delayedCall(
            1000,
            () => {
                this.destroy();
                this.prizeSprite?.destroy();
            },
            undefined,
            this
        );
    }

    showPrize() {
        const prize = ["boots", "hammer", "coin", "star", "speed"];
        const selectedPrize = Phaser.Math.RND.pick(prize);
        this.scene.player?.applyPrize(selectedPrize);
        this.prizeSprite = this.scene.add
            .sprite(this.x, this.y, selectedPrize)
            .setOrigin(0.5)
            .setScale(0.8);
        this.scene.tweens.add({
            targets: this.prizeSprite,
            duration: 500,
            y: { from: this.y, to: this.y - 64},
            onComplete: () => {
                this.scene.playAudio("prize");
            }
        })
    }
}