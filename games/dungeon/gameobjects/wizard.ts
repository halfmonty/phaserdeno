import Fireball from './fireball.ts';
import Bubble from './bubble.ts';
import Game from '../scenes/game.ts';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';

export default class Wizard extends Phaser.Physics.Matter.Sprite {
    declare scene: Game;
    label: string;
    startX: number;
    direction: number;
    timer!: Phaser.Time.TimerEvent;
    delayedTurn?: Phaser.Time.TimerEvent;
    fireball?: Fireball;
	unsubscribeBatCollide!: PhaserMatterCollisionPlugin.Unsubscribe;

	constructor(scene: Phaser.Scene, x: number, y: number, texture = 'wizard', _ground?: Phaser.Tilemaps.TilemapLayer) {
		super(scene.matter.world, x, y, texture, 0);
		this.label = 'wizard';
		this.scene.add.existing(this);
		this.startX = x;
		this.direction = Phaser.Math.RND.pick([-1, 1]);

		this.setFixedRotation();
		this.addCollisions();
		this.init();
	}

	/*
This function inits the wizard. It creates the animations and the update event. Also, we create a timer that will be used to shoot the fireballs.
  */
	init() {
		this.scene.anims.create({
			key: this.label,
			frames: this.scene.anims.generateFrameNumbers(this.label, {
				start: 0,
				end: 5,
			}),
			frameRate: 5,
			repeat: -1,
		});

		this.anims.play(this.label, true);
		this.scene.events.on('update', this.update, this);
		this.timer = this.scene.time.addEvent({
			delay: 3000,
			callback: this.directShot,
			callbackScope: this,
			loop: true,
		});
	}

	/*
As we did with the player and the bat, we create this callback to handle the collision with the bubble.
  */
	addCollisions() {
		this.unsubscribeBatCollide = this.scene.matterCollision.addOnCollideStart({
			objectA: this,
			callback: this.onWizardCollide,
			context: this,
		});
	}

	/*
This will be called when the bubble hits the wizard. We "load" the wizard inside the bubble and destroy the wizard.
  */
	onWizardCollide: PhaserMatterCollisionPlugin.CollideCallback<this, PhaserMatterCollisionPlugin.CollidingObject> = ({ gameObjectB }) => {
		if (gameObjectB instanceof Bubble) {
			gameObjectB.load('wizard');
			this.destroy();
		}
	}

	/*
The wizard will try to shoot directly at the player. It will shoot a fireball and then turn around.
  */
	directShot() {
		this.scene.playAudio('fireball');
		this.anims.play('wizardshot', true);
		new Fireball(this.scene, this.x, this.y, this.direction);
		this.delayedTurn = this.scene.time.delayedCall(
			1000,
			() => {
				this.turn();
			},
			undefined,
			this,
		);
	}

	/*
  This method takes care of turning the wizard around.
  */
	turn() {
		this.direction = -this.direction;
		this.flipX = this.direction > 0;
		this.setFlipX(this.direction > 0);
		this.setVelocityX(this.direction * 5);
	}

	/*
This will be called when the wizard is destroyed. We destroy the timer and the delayed turn before destroying the wizard.
  */
	override destroy() {
		if (this.timer) this.timer.destroy();
		if (this.delayedTurn) this.delayedTurn.destroy();
		if (this.fireball) this.fireball.destroy();
		super.destroy();
	}
}
