import Player from "../gameobjects/player.ts";
import { Debris } from "../gameobjects/particle.ts";
import Bat from "../gameobjects/bat.ts";
import Zombie from "../gameobjects/zombie.ts";
import Turn from "../gameobjects/turn.ts";
import Coin from "../gameobjects/coin.ts";
import LunchBox from "../gameobjects/lunchbox.ts";
import Platform from "../gameobjects/platform.ts";
import Blow from "../gameobjects/blow.ts";
import Brick from "../gameobjects/brick.ts";

export default class Game extends Phaser.Scene {
    player: Player | null;
    score: number;
    scoreText:  string | null;
    name!: string;
    number!: number;
    width!: number;
    height!: number;
    center_width!: number;
    center_height!: number;
    scoreCoins!: Phaser.GameObjects.BitmapText;
    scoreCoinsLogo!: Phaser.GameObjects.Sprite;
    tileSetBg: Phaser.Tilemaps.Tileset | null = null;
    tileMap!: Phaser.Tilemaps.Tilemap;
    tileSet: Phaser.Tilemaps.Tileset | null = null;
    objectsLayer: Phaser.Tilemaps.ObjectLayer | null = null;
    platform!: Phaser.Tilemaps.TilemapLayer;

    batGroup!: Phaser.GameObjects.Group;
    zombieGroup!: Phaser.GameObjects.Group;
    foesGroup!: Phaser.GameObjects.Group;
    turnGroup!: Phaser.GameObjects.Group;
    exitGroup!: Phaser.GameObjects.Group;
    platformGroup!: Phaser.GameObjects.Group;
    lunchBoxGroup!: Phaser.GameObjects.Group;
    bricks!: Phaser.GameObjects.Group;
    blows!: Phaser.GameObjects.Group;
    coins!: Phaser.GameObjects.Group;
    elements!: Phaser.GameObjects.Group;
    audios!: Record<string, Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound>;
    theme?: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

    constructor() {
        super({ key: "game" });
        this.player = null;
        this.score = 0;
        this.scoreText = null;
    }

    init(data: {name: string, number: number}) {
        this.name = data.name;
        this.number = data.number;
    }

    preload() {}

    create() {
        this.width = +this.sys.game.config.width;
        this.height = +this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;
        this.cameras.main.setBackgroundColor(0x62a2bf);
        this.add.tileSprite(0, 1000, 1024 * 10, 512, "landscape").setOrigin(0.5);
        this.createMap();

        this.cameras.main.setBounds(0, 0, 20920 * 2, 20080 * 2);
        this.physics.world.setBounds(0, 0, 20920 * 2, 20080 * 2);
        this.addPlayer();

        this.cameras.main.startFollow(this.player!, true, 0.05, 0.05, 0, 240);
        this.physics.world.enable([this.player!]);
        this.addScore();
        this.loadAudios();
        this.playMusic();
    }

    addScore() {
        this.scoreCoins = this.add
            .bitmapText(75, 10, "pixelFont", "x0", 30)
            .setDropShadow(0, 4, 0x222222, 0.9)
            .setOrigin(0)
            .setScrollFactor(0);
        this.scoreCoinsLogo = this.add
            .sprite(50, 25, "coin")
            .setScale(1)
            .setOrigin(0.5)
            .setScrollFactor(0);
        this.anims.create({
            key: "coinscore",
            frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 7 }),
            frameRate: 8,
        });
        this.scoreCoinsLogo.play({ key: "coinscore", repeat: -1 });
    }

    createMap() {
        this.tileMap = this.make.tilemap({
            key: "scene" + this.number,
            tileWidth: 64,
            tileHeight: 64
        });
        console.log(this.tileMap);
        this.tileSetBg = this.tileMap.addTilesetImage("background");
        if (!this.tileSetBg) throw("Background tileset missing");
        this.tileMap.createLayer("background", this.tileSetBg);

        this.tileSet = this.tileMap.addTilesetImage("softbricks");
        this.platform = this.tileMap.createLayer(
            "scene" + this.number,
            this.tileSet!
        ) as Phaser.Tilemaps.TilemapLayer;
        if( !this.platform ) throw("Failed to creat platform layer");
        this.objectsLayer = this.tileMap.getObjectLayer("objects");

        this.platform?.setCollisionByExclusion([-1]);
        this.batGroup = this.add.group();
        this.zombieGroup = this.add.group();
        this.foesGroup = this.add.group();
        this.turnGroup = this.add.group();
        this.exitGroup = this.add.group();
        this.platformGroup = this.add.group();
        this.lunchBoxGroup = this.add.group();
        this.bricks = this.add.group();

        this.addsObjects();
        this.addColliders();
    }

    addsObjects() {
        this.objectsLayer?.objects.forEach((object) => {
            if (!object.x || !object.y)
                throw("bat object not defined correctly");

            if (object.name === "bat") {
                const bat = new Bat(this, object.x, object.y, object.type)
                this.batGroup.add(bat);
                this.foesGroup.add(bat);
            }

            if (object.name === "zombie") {
                const zombie = new Zombie(this, object.x, object.y, object.type);
                this.zombieGroup.add(zombie);
                this.foesGroup.add(zombie);
            }

            if (object.name === "platform") {
                this.platformGroup.add(
                    new Platform(this, object.x, object.y, +object.type)
                )
            }

            if (object.name === "turn") {
                this.turnGroup.add(new Turn(this, object.x, object.y));
            }

            if (object.name === "lunchbox") {
                this.lunchBoxGroup.add(new LunchBox(this, object.x, object.y));
            }

            if (object.name === "text") {
                this.add
                    .bitmapText(object.x, object.y, "pixelFont", object.text.text, 30)
                    .setDropShadow(2, 4, 0x222222, 0.9)
                    .setOrigin(0);
            }

            if (object.name === "exit") {
                this.exitGroup.add(
                    new Turn(this, object.x, object.y, object.width, object.height, object.type).setOrigin(0.5)
                )
            }
        });
    }

    addColliders() {
        this.physics.add.collider(
            this.batGroup,
            this.platform,
            this.turnFoe as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            () => {
                return true;
            },
            this
        );

        this.physics.add.collider(
            this.zombieGroup,
            this.bricks,
            this.turnFoe as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            () => {
                return true;
            },
            this
        );

        this.physics.add.collider(
            this.batGroup,
            this.bricks,
            this.turnFoe as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            () => {
                return true;
            },
            this
        );

        this.physics.add.collider(
            this.zombieGroup,
            this.turnGroup,
            this.turnFoe as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            () => {
                return true;
            },
            this
        );

        this.physics.add.collider(
            this.zombieGroup,
            this.platform,
            this.hitFloor as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            () => {
                return true;
            },
            this
        );
    }

    turnFoe(foe: Bat | Zombie, _platform: Platform) {
        foe.turn();
    }

    // hitFloor() {}

    addPlayer() {
        this.elements = this.add.group();
        this.coins = this.add.group();

        const playerPosition = this.objectsLayer?.objects.find(
            (object) => object.name === "player"
        );
        if(!playerPosition || !playerPosition.x || !playerPosition.y) throw("Unable to get player position");
        this.player = new Player(this, playerPosition.x, playerPosition.y, 0);

        this.physics.add.collider(
            this.player as Phaser.Types.Physics.Arcade.ArcadeColliderType,
            this.platform,
            this.hitFloor as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            () => {
                return true;
            },
            this
        );

        this.physics.add.collider(
            this.player as Phaser.Types.Physics.Arcade.ArcadeColliderType,
            this.platformGroup,
            this.hitFloor as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            () => {
                return true;
            },
            this
        );

        this.physics.add.collider(
            this.player as Phaser.Types.Physics.Arcade.ArcadeColliderType,
            this.bricks,
            this.hitFloor as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            () => {
                return true
            },
            this
        );

        this.physics.add.overlap(
            this.player as Phaser.Types.Physics.Arcade.ArcadeColliderType,
            this.coins,
            this.pickCoin as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            () => {
                return true;
            },
            this
        );

        this.physics.add.overlap(
            this.player as Phaser.Types.Physics.Arcade.ArcadeColliderType,
            this.lunchBoxGroup,
            this.pickLunchBox as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            () => {
                return true;
            },
            this
        );

        this.physics.add.overlap(
            this.player as Phaser.Types.Physics.Arcade.ArcadeColliderType,
            this.exitGroup,
            () => {
                this.playAudio("stage");
                this.time.delayedCall(1000, () => this.finishScene(), undefined, this);
            },
            () => {
                return true;
            },
            this
        );

        this.blows = this.add.group();

        this.physics.add.overlap(
            this.blows,
            this.platform,
            this.blowPlatform as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            () => {
                return true;
            },
            this
        );

        this.physics.add.overlap(
            this.blows,
            this.bricks,
            this.blowBrick as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            () => {
                return true;
            },
            this
        );

        this.physics.add.overlap(
            this.blows,
            this.foesGroup,
            this.blowFoe as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            () => {
                return true;
            },
            this
        );

        this.physics.add.overlap(
            this.bricks,
            this.foesGroup,
            this.foeBlowBrick as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            () => {
                return true;
            },
            this
        );

        this.physics.add.collider(
            this.player as Phaser.Types.Physics.Arcade.ArcadeColliderType,
            this.batGroup,
            this.hitPlayer as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            () => {
                return true;
            },
            this
        );

        this.physics.add.collider(
            this.player as Phaser.Types.Physics.Arcade.ArcadeColliderType,
            this.zombieGroup,
            this.hitPlayer as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            () => {
                return true;
            },
            this
        );
    }

    pickCoin(_player: Player, coin: Coin) {
        if(!coin.disabled) {
            coin.pick();
            this.playAudio("coin");
            this.updateCoins();
        }
    }

    pickLunchBox(_player: Player, lunchbox: LunchBox) {
        if (!lunchbox.disabled) {
            this.playAudio("lunchbox");
            lunchbox.pick();
        }
    }

    hitPlayer(player: Player, foe: Bat | Zombie) {
        if (player.invincible) {
            foe.death();
            this.playAudio("foedeath");
        } else if (!player.dead && this.number > 0) {
            player.die();
            this.playAudio("death");
        }
    }

    blowFoe(_blow: Blow, foe: Bat | Zombie) {
        this.playAudio("kill");
        this.playAudio("foedeath");
        foe.death();
    }

    foeBlowBrick(brick: Brick, foe: Bat | Zombie) {
        foe.turn();
        Array(Phaser.Math.Between(4, 6))
            .fill(0)
            .forEach(() => new Debris(this, brick.x, brick.y));
        brick.destroy();
    }

    blowPlatform(blow: Blow, platform: Platform) {
        const tile = this.getTile(platform);
        if (this.isBreakable(tile)) {
            this.playAudioRandomly("stone_fail");
            this.playAudioRandomly("stone");
            if (this.player?.mjolnir) this.cameras.main.shake(30);
            blow.destroy();
            Array(Phaser.Math.Between(4, 6))
                .fill(0)
                .forEach(() => new Debris(this, tile.pixelX, tile.pixelY));
            this.platform.removeTileAt(tile.x, tile.y);
            this.spawnCoin(tile);
        }
    }

    getTile(platform: Platform) {
        const  { x, y } = platform;
        return this.platform.getTileAt(x, y);
    }

    isBreakable(tile?: Phaser.Tilemaps.Tile) {
        return tile?.properties["element"] === "break";
    }

    spawnCoin(tile: Phaser.Tilemaps.Tile) {
        if (Phaser.Math.Between(0, 11) > 5) {
            this.time.delayedCall(
                500,
                () => {
                    this.coins.add(new Coin(this, tile.pixelX, tile.pixelY));
                }
            )
        }
    }

    blowBrick(blow: Blow, brick: Brick) {
        if (this.player?.mjolnir) this.cameras.main.shake(30);
        this.playAudio("stone_fail");
        this.playAudioRandomly("stone");
        blow.destroy();
        Array(Phaser.Math.Between(4, 6))
            .fill(0)
            .forEach(() => new Debris(this, brick.x, brick.y));
        brick.destroy();
    }

    hitFloor(_player: Player, platform: Platform) {
        if (
            this.player?.jumping &&
            !this.player.falling &&
            this.player.body?.velocity.y === 0
        ) {
            const tile = this.getTile(platform);
            if (this.isBreakable(tile)) {
                this.playAudioRandomly("stone");
                Array(Phaser.Math.Between(4, 6))
                    .fill(0)
                    .forEach(() => new Debris(this, tile.pixelX, tile.pixelY));
                this.platform.removeTileAt(tile.x, tile.y);
            } else if (platform.name === "brick0") {
                this.playAudioRandomly("stone");
                Array(Phaser.Math.Between(4, 6))
                    .fill(0)
                    .forEach(() => new Debris(this, platform.x, platform.y));
                platform.destroy();
            }
        }
    }

    loadAudios() {
        this.audios = {
            build       : this.sound.add('build'),
            coin        : this.sound.add('coin'),
            death       : this.sound.add('death'),
            jump        : this.sound.add('jump'),
            kill        : this.sound.add('kill'),
            land        : this.sound.add('land'),
            lunchbox    : this.sound.add('lunchbox'),
            prize       : this.sound.add('prize'),
            stone_fail: this.sound.add('stone_fail'),
            stone       : this.sound.add('stone'),
            foedeath    : this.sound.add('foedeath'),
            stage       : this.sound.add('stage'),
        };
    }

    playAudio(key: string) {
        this.audios[key].play();
    }

    playAudioRandomly(key: string) {
        const volume = Phaser.Math.Between(0.8, 1);
        const rate = Phaser.Math.Between(0.8, 1);
        this.audios[key].play({ volume, rate });
    }

    playMusic() {
        this.theme = this.sound.add("music" + this.number);
        this.theme.stop();
        this.theme.play({
            mute: false,
            volume: 0.7,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
    }

    override update() {
        this.player?.update();
        if (this.number === 3 && this.player && this.player.y > 1500) this.restartScene();
    }

    finishScene() {
        if (this.theme) this.theme.stop;
        this.scene.start("transition", { name: "STAGE", number: this.number + 1 });
    }

    restartScene() {
        this.time.delayedCall(
            1000,
            () => {
                if (this.theme) this.theme.stop();
                this.scene.start("transition", { name: "STAGE", number: this.number });
            },
            undefined,
            this
        );
    }

    updateCoins() {
        const coins = +this.registry.get("coins") + 1;
        this.registry.set("coins", coins);
        this.scoreCoins.setText("x" + coins);
        this.tweens.add({
            targets: [this.scoreCoins, this.scoreCoinsLogo],
            scale: { from: 1.4, to: 1},
            duration: 50,
            repeat: 10,
        });
    }
}