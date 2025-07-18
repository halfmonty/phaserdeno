export default class Key extends Phaser.Physics.Matter.Sprite {
    label: string;
    tween?: Phaser.Tweens.Tween;

	constructor(scene: Phaser.Scene, x: number, y: number, texture = 'keys', options = { isStatic: true }) {
		super(
			scene.matter.world,
			x,
			y,
			texture,
			Phaser.Math.RND.pick([0, 1]),
			options,
		);
		this.scene = scene;
		this.label = 'keys';
		scene.add.existing(this);

		this.init();
	}

	/*
    As we did with the coin, we create the animation and add a tween to make it move up and down. We could possibly do something different here, like make it rotate. Or just reuse the same class as the coin.
    */
	init() {
		this.tween = this.scene.tweens.add({
			targets: this,
			duration: 300,
			y: '-=5',
			repeat: -1,
			yoyo: true,
		});
	}

	override destroy() {
		this.tween?.stop();
		super.destroy();
	}
}
