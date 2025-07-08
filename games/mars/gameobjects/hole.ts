export default class Hole extends Phaser.GameObjects.Sprite {
	declare body: Phaser.Physics.Arcade.Body;

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, 'hole');
		this.name = 'hole';
		this.setOrigin(0);
		this.setAlpha(0);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.body.setAllowGravity(false);
	}
}
