import { ShootingPatternType } from "./shooting_patterns.ts";

class PowerUp extends Phaser.GameObjects.Sprite {
  power: ShootingPatternType;
  id: number;
  shadow!: Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body };
  direction!: number;

  declare body: Phaser.Physics.Arcade.Body;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    name = "plenny0",
    power: ShootingPatternType = "fruit"
  ) {
    super(scene, x, y, name);
    this.name = name;
    this.power = power;
    this.scene = scene;
    this.id = Math.random();
    this.spawnShadow(x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.body.setCircle(19);
    this.body.setOffset(12, 12);
    this.body.setVelocityX(-100);
    this.init();
  }

  /*
   The power-up also spawns a shadow.
    */
  spawnShadow(x: number, y: number) {
    /**
     * Typescript addition: I would love to do this better. I hate type
     * assertions! However, it's better to do one assertion here on creation
     * rather than every time we use it.
     */
    this.shadow = this.scene.add
      .image(x + 20, y + 20, "plenny0")
      .setTint(0x000000)
      .setAlpha(0.4) as typeof this.shadow;

    this.scene.physics.add.existing(this.shadow);
    this.shadow.body.setVelocityX(-100);
  }

  /*
    This sets the animation and movement of the power-up.
    */
  init() {
    this.scene.anims.create({
      key: this.name,
      frames: this.scene.anims.generateFrameNumbers(this.name),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.tweens.add({
      targets: [this],
      duration: 5000,
      x: { from: this.x, to: 0 },
      y: { from: this.y - 10, to: this.y + 10 },
      scale: { from: 0.8, to: 1 },
      repeat: -1,
      yoyo: true,
    });

    this.scene.tweens.add({
      targets: this.shadow,
      duration: 5000,
      x: { from: this.shadow.x, to: 0 },
      y: { from: this.shadow.y - 10, to: this.y + 10 },
      scale: { from: 0.8, to: 1 },
      repeat: -1,
      yoyo: true,
    });

    this.anims.play(this.name, true);
    this.body.setVelocityX(-100);
    this.shadow.body.setVelocityX(-100);
    this.direction = -1;
  }

  /*
    When this element is destroyed, it will also destroy the shadow.
    */
  override destroy() {
    this.shadow.destroy();
    super.destroy();
  }
}

export default PowerUp;