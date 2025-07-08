export default class Braun extends Phaser.GameObjects.Sprite {
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, 'body');
		this.name = 'body';
		this.setOrigin(0);
		this.rotation = 1.6;
		scene.add.existing(this);
	}
}
