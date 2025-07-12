export class Smoke extends Phaser.GameObjects.Rectangle {
    color: number;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, color = 0xfffffff, _gravity = false) {
        width = width ?? Phaser.Math.Between(10, 25);
        height = height ?? Phaser.Math.Between(10, 25);

        super(scene, x, y, width, height, color);
        scene.add.existing(this);
        this.color = color
        this.init();
    }

    init() {
        this.scene.tweens.add({
            targets: this,
            duration: 800,
            scale: { from: 1, to: 0 },
            onComplete: () => {
                this.destroy();
            },
        });
    }
}

export enum Colors {
    redbrick    = 0xa13000,
    orangebrick = 0xb03e00,
    goldenbrick = 0xb06f00,
    greybrick   = 0x4d4d4d,
}

export class RockSmoke extends Phaser.GameObjects.Rectangle {
    declare body: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, x: number, y: number, width?: number, height?: number, color = 0xffeaab, _gravity = false) {
        width = width ?? Phaser.Math.Between(30, 55);
        height = height ?? Phaser.Math.Between(30, 55);
        
        super(scene, x, y, width, height, color);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setVelocityY(-100);

        this.init();
    }

    init() {
        this.scene.tweens.add({
            targets: this,
            duration: 800,
            scale: { from: 1, to: 0 },
            onComplete: () => {
                this.destroy();
            }
        });
    }
}

export class JumpSmoke extends Phaser.GameObjects.Rectangle {
    declare body: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, x: number, y: number, width?: number, height?: number, color = 0xffeaab, _gravity = false) {
        width = width ?? Phaser.Math.Between(10, 25);
        height = height ?? Phaser.Math.Between(10, 25);

        super(scene, x, y, width, height, color);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setVelocityX(Phaser.Math.Between(-20, 20));

        this.init();
    }

    init() {
        this.scene.tweens.add({
            targets: this,
            duration: 800,
            scale: { from: 1, to: 0},
            onComplete: () => {
                this.destroy();
            }
        });
    }
}

export class Debris extends Phaser.GameObjects.Rectangle {
    declare body: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, x: number, y: number, width?: number, height?: number, color = 0xffeaab, _gravity = false) {
        width = width ?? Phaser.Math.Between(15, 30);
        height = height ?? Phaser.Math.Between(15, 30);

        super(scene, x, y + 5, width, height, color)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setVelocityX(Phaser.Math.Between(-50, 50));
        this.body.setVelocityY(width * height);
    }
}