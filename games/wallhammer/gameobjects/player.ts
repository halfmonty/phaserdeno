import Game from '../scenes/game.ts';
import Blow from "./blow.ts";
import Brick from "./brick.ts";
import { JumpSmoke } from "./particle.ts";

enum playerAnimation {
    startidle = "startidle",
    idle      = "playeridle",
    walk      = "playerwalk",
    jump      = "playerjump",
    hammer    = "playerhammer",
    build     = "playerbuild",
    dead      = "playerdead"
}

export default class Player extends Phaser.GameObjects.Sprite {
    declare scene: Game;
    declare body: Phaser.Physics.Arcade.Body;
    spaceBar: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    right: boolean;
    cursor: Phaser.Types.Input.Keyboard.CursorKeys;
    jumping: boolean;
    building: boolean;
    falling: boolean;
    mjolnir: boolean;
    walkVelocity: number;
    jumpVelocity: number;
    invincible: boolean;
    health: number;
    dead: boolean;
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;


    constructor(scene: Phaser.Scene, x: number, y: number, health = 10) {
        super(scene, x, y, "walt");
        this.setOrigin(0.5);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.cursor = this.scene.input.keyboard?.createCursorKeys()!;
        this.spaceBar = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)!;
        this.down = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)!;
        this.right = true;
        this.body.setGravityY(100);
        this.body.setSize(48, 60);
        this.init();
        this.jumping = false;
        this.building = false;
        this.falling = false;
        this.mjolnir = false;
        this.walkVelocity = 200;
        this.jumpVelocity = -400;
        this.invincible = false;
        this.health = health;
        this.dead = false;
        this.W = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W)!;
        this.A = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A)!;
        this.S = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S)!;
        this.D = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D)!;
    }

    init() {
        this.createAnim(this.scene, playerAnimation.startidle, 0, 1, 3, -1);
        this.createAnim(this.scene, playerAnimation.idle, 2, 3, 3, -1);
        this.createAnim(this.scene, playerAnimation.walk, 4, 6, 10, -1);
        this.createAnim(this.scene, playerAnimation.jump, 4, 4, 1);
        this.createAnim(this.scene, playerAnimation.hammer, 7, 8, 10);
        this.createAnim(this.scene, playerAnimation.build, 9, 10, 10, 2);
        this.createAnim(this.scene, playerAnimation.dead, 11, 16, 5);

        this.anims.play(playerAnimation.startidle, true);
        this.on("animationcomplete", this.animationComplete, this);
    }

    createAnim(scene: Phaser.Scene, key: string, start: number, end: number, frameRate: number, repeat?: number) {
        scene.anims.create({
            key,
            frames: this.scene.anims.generateFrameNumbers("walt", { start, end }),
            frameRate,
            repeat
        });
    }

    override update() {
        if (this.dead) return;
        if (this.jumping) {
            if (this.body.velocity.y >= 0) {
                this.body.setGravityY(700);
                this.falling = true;
            }
        }

        if (
            (Phaser.Input.Keyboard.JustDown(this.cursor.up) || 
            Phaser.Input.Keyboard.JustDown(this.W)) &&
            this.body.blocked.down
        ) {
            this.building = false;
            this.body.setVelocity(this.jumpVelocity);
            this.body.setGravityY(400);
            this.anims.play(playerAnimation.jump, true);
            this.scene.playAudio("jump");
            this.jumping = true;
            this.jumpSmoke();
        } else if (this.cursor.right.isDown || this.D.isDown) {
            this.building = false;
            if (this.body.blocked.down) {
                this.anims.play(playerAnimation.walk, true);
            }
            this.right = true;
            this.flipX = this.body.velocity.x < 0;
            this.body.setVelocityX(this.walkVelocity);
        } else if ( this.cursor.left.isDown || this.A.isDown) {
            this.building = false;
            if(this.body.blocked.down) {
                this.anims.play(playerAnimation.walk, true);
            }
            this.right = false;
            this.flipX = true;
            this.body.setVelocityX(-this.walkVelocity);
        } else {
            if(this.body.blocked.down) {
                if (this.jumping) {
                    this.scene.playAudio("land");
                    this.landSmoke();
                }
                this.jumping = false;
                this.falling = false;

                if(!this.building) this.anims.play(playerAnimation.idle, true);
            }

            this.body.setVelocityX(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) this.hammerBlow();

        if (
            Phaser.Input.Keyboard.JustDown(this.cursor.down) ||
            Phaser.Input.Keyboard.JustDown(this.S)
        ) this.buildBlock();
    }

    landSmoke() {
        this.jumpSmoke(20);
    }

    jumpSmoke(offsetY = 10, varX?: number) {
        Array(Phaser.Math.Between(3, 6))
            .fill(0)
            .forEach((_i) => {
                const offset = varX || Phaser.Math.Between(-1, 1) > 0 ? 1 : -1;
                varX = varX || Phaser.Math.Between(0, 20);
                new JumpSmoke(this.scene, this.x + offset * varX, this.y + offsetY)
            });
    }

    buildBlock() {
        this.building = true;
        this.anims.play(playerAnimation.build, true);
        this.scene.playAudio("build")
        const offsetX = this.right ? 64 : -64;
        const offsetY = this.jumpVelocity === -400 ? 0 : -128;
        this.buildSmoke(32, offsetX);
        this.scene.bricks.add(
            new Brick(this.scene, this.x + offsetX, this.y + offsetY)
        );
    }

    buildSmoke(offsetY = 10, offsetX: number) {
        Array(Phaser.Math.Between(8, 14))
            .fill(0)
            .forEach((_i) => {
                const varX = Phaser.Math.Between(-20, 20);
                new JumpSmoke(this.scene, this.x + (offsetX + varX), this.y + offsetY);
            });
    }

    hammerBlow() {
        this.building = true;
        this.anims.play(playerAnimation.hammer, true);
        const offsetX = this.right ? 32 : -32;
        const size = this.mjolnir ? 128 : 32;
        this.scene.blows.add(
            new Blow(this.scene, this.x + offsetX, this.y, size, size)
        );
    }

    turn() {
        this.right = !this.right;
    }

    animationComplete(animation: Phaser.Animations.Animation, _frame: Phaser.Animations.AnimationFrame) {
        if (animation.key === "playerground") {
            this.anims.play("playeridle", true);
        }

        if (animation.key === playerAnimation.hammer || animation.key === playerAnimation.build) {
            this.building = false;
            this.anims.play(this.jumping? playerAnimation.jump : playerAnimation.idle, true);
        }
    }

    hit() {
        this.health--;
        this.anims.play(playerAnimation.dead, true);
        this.body.enable = false;
        if (this.health === 0 ) this.die();
    }

    die() {
        this.dead = true;
        this.anims.play(playerAnimation.dead, true);
        this.body.immovable = true;
        this.body.moves = false;
        this.scene.restartScene();
    }

    applyPrize(prize: string) {
        switch (prize) {
            case "speed":
                this.walkVelocity = 330;
                this.flashPlayer();
                break;
            case "hammer":
                this.mjolnir = true;
                this.flashPlayer();
                break;
            case "boots":
                this.jumpVelocity = -600;
                this.flashPlayer();
                break;
            case "coin":
                this.scene.updateCoins();
                break;
            case "star":
                this.invincible = true;
                this.scene.tweens.add({
                    targets: this,
                    duration: 300,
                    alpha: { from: 0.7, to: 1 },
                    repeat: -1
                });
                break;
            default:
                break;
        }
    }

    flashPlayer() {
        this.scene.tweens.add({
            targets: this,
            duration: 50,
            scale: { from: 1.2, to: 1 },
            repeat: 10
        });
    }
}