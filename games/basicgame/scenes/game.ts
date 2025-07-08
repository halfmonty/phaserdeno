export default class Game extends Phaser.Scene {
    player!: Phaser.Physics.Arcade.Sprite;
    platforms!: Phaser.Physics.Arcade.StaticGroup;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    score = 0;
    scoreText!: Phaser.GameObjects.Text;
    stars!: Phaser.Physics.Arcade.Group;

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('sky', 'assets/basicgame/sky.png');
        this.load.image('ground', 'assets/basicgame/platform.png');
        this.load.image('star', 'assets/basicgame/star.png');
        this.load.image('bomb', 'assets/basicgame/bomb.png');
        this.load.spritesheet('dude', 'assets/basicgame/dude.png', { frameWidth: 32, frameHeight: 48 })
    }

    create() {
        this.add.image(400, 300, 'sky');

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, this.platforms);

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.forEach((star) => {
            const starSprite = star as Phaser.Physics.Arcade.Sprite
            starSprite.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        this.physics.add.collider(this.stars, this.platforms);

        // Collect stars
        this.physics.add.overlap(
            this.player,
            this.stars,
            this.collectStar as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            undefined,
            this,
        );

        // Create cursor keys
        this.cursors = this.input.keyboard!.createCursorKeys();

        // Score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            color: '#ffffff',
        });

        // Instructions
        this.add.text(400, 100, 'Use Arrow Keys to Move\nCollect Yellow Stars!', {
            fontSize: '24px',
            color: '#ffffff',
            align: 'center',
        }).setOrigin(0.5);
    }

    override update(time: number, delta: number): void {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body?.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    private collectStar = (
        _player: Phaser.Physics.Arcade.Sprite,
        star: Phaser.Physics.Arcade.Sprite,
    ) => {
        star.disableBody(true, true);

        if (this.stars.countActive(true) === 0) {
            this.stars.children.forEach((child) => {
                (child as Phaser.Physics.Arcade.Sprite).enableBody(
                    true,
                    (child as any).x,
                    0,
                    true,
                    true,
                );
            });
        }
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    };
}