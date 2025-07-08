export default class Block extends Phaser.GameObjects.Sprite {
    id?: number;
    constructor(scene: Phaser.Scene, x: number, y: number, name = "block_blue", _velocity = 100) {
        super(scene, x, y, name);
        this.setOrigin(0, 0);
        this.scene = scene;
        this.name = name;
    }
}