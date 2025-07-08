import BlockGroup from '../gameobjects/block_group.ts';
import Exit from '../gameobjects/exit.ts';

export default class Game extends Phaser.Scene {
	player: BlockGroup | null;
	score: number;
	scoreText: string | null;
	name!: string;
	number!: number;
	limitedTime!: number;
	width!: number;
	height!: number;
	center_width!: number;
	center_height!: number;
	solved!: boolean;
	R!: Phaser.Input.Keyboard.Key;
	movesText!: Phaser.GameObjects.BitmapText;
	totalMoves!: number;
	tileMap!: Phaser.Tilemaps.Tilemap;
	tileSetBg: Phaser.Tilemaps.Tileset | null = null;
	tileSet: Phaser.Tilemaps.Tileset | null = null;
	platform!: Phaser.Tilemaps.TilemapLayer;
	objectsLayer: Phaser.Tilemaps.ObjectLayer | null = null;
	exits!: Phaser.GameObjects.Group;
	blocks!: Phaser.GameObjects.Group;
	texts!: string[];
	activeBlock!: BlockGroup;
	pointer!: Phaser.Input.Pointer;
	audios!: Record<
		string,
		| Phaser.Sound.NoAudioSound
		| Phaser.Sound.HTML5AudioSound
		| Phaser.Sound.WebAudioSound
	>;
	winText!: Phaser.GameObjects.BitmapText;
    timerText!: Phaser.GameObjects.BitmapText;

	constructor() {
		super({ key: 'game' });
		this.player = null;
		this.score = 0;
		this.scoreText = null;
	}

	init(data: { name: string; number?: number; limitedTime?: number }) {
		this.name = data.name;
		this.number = data.number ?? 0;
		this.limitedTime = data.limitedTime ?? 10;
	}

	preload() {}

	create() {
		this.width = +this.sys.game.config.width;
		this.height = +this.sys.game.config.height;
		this.center_width = this.width / 2;
		this.center_height = this.height / 2;
		this.cameras.main.setBackgroundColor(0x000000);
		this.input.mouse?.disableContextMenu();
		this.addPointer();

		this.addMap();
		this.addMoves();
		this.addRetry();

		this.loadAudios();
		this.showTexts();
		this.solved = false;
	}

	addRetry() {
        if(!this.input.keyboard) throw("Failed to get keyboard input");
		this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
	}

	addMoves() {
		this.movesText = this.add
			.bitmapText(this.center_width, 32, 'mario', '0', 30)
			.setOrigin(0.5)
			.setTint(0xffe066)
			.setDropShadow(3, 4, 0x75b947, 0.7);
		this.totalMoves = 0;
	}

	addMap() {
		this.tileMap = this.make.tilemap({
			key: `scene${this.number}`,
			tileWidth: 32,
			tileHeight: 32,
		});
		this.tileSetBg = this.tileMap.addTilesetImage('tileset_fg');
		if (!this.tileSetBg) throw ('Failed to create Tile Set Bg');
		this.tileMap.createLayer('background', this.tileSetBg);
		this.tileSet = this.tileMap.addTilesetImage('tileset_fg');
		if (!this.tileSet) throw ('Failed to create Tile Set');
		this.platform = this.tileMap.createLayer(
			`scene${this.number}`,
			this.tileSet,
		) as Phaser.Tilemaps.TilemapLayer;
		this.objectsLayer = this.tileMap.getObjectLayer('objects');
		this.platform.setCollisionByExclusion([-1]);
		this.physics.world.setBounds(0, 0, this.width, this.height);
		this.exits = this.add.group();
		this.blocks = this.add.group();
		this.texts = [];
		this.addObjects();
	}

	addObjects() {
		this.objectsLayer?.objects.forEach((object) => {
			if (!object.x || !object.y) throw ('Object missing properties');
			if (object.name.startsWith('block')) {
				const [_name, width, height, color] = object.name.split('_');
				this.activeBlock = new BlockGroup(
					this,
					object.x,
					object.y,
					+width,
					+height,
					color,
				);
				this.blocks.add(this.activeBlock);
				if (object.name.startsWith('block_1_1')) {
					this.addPlayer(this.activeBlock);
				}
			}
			if (object.name.startsWith('exit')) {
				this.exits.add(new Exit(this, object.x - 16, object.y));
			}
		});
	}

	showTexts() {
		if (this.number > 0) return;
		const texts = [
			'Select cubes',
			'Pull/push them with WASD/Arrows',
			'MOVE the red to exit',
		];
		texts.forEach((text, i) => {
			this.add
				.bitmapText(this.center_width, 425 + 35 * i, 'mario', text, 15)
				.setOrigin(0.5)
				.setTint(0xffe066)
				.setDropShadow(1, 2, 0xbf2522, 0.7);
		});
	}

	addPlayer(block: BlockGroup) {
		this.player = block;
		this.physics.add.overlap(
			this.player as any,
			this.exits,
			this.hitExit as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
			() => {
				return true;
			},
			this,
		);
	}

	hitExit(player: BlockGroup, exit: Exit) {
        player.active = false;
		exit.destroy();
		this.finishScene();
	}

	addPointer() {
		this.pointer = this.input.activePointer;
		this.input.mouse?.disableContextMenu();
	}

	loadAudios() {
		this.audios = {
			bump: this.sound.add('bump'),
			hover: this.sound.add('hover'),
			select: this.sound.add('select'),
			move: this.sound.add('move'),
			win: this.sound.add('win'),
		};
	}

	playAudio(key: string) {
		this.audios[key].play();
	}

	playRandom(key: string, volume = 1) {
		this.audios[key].play({
			rate: Phaser.Math.Between(1, 1.5),
			detune: Phaser.Math.Between(-1000, 1000),
			delay: 0,
			volume,
		});
	}

	override update() {
		if (Phaser.Input.Keyboard.JustDown(this.R)) {
			this.restartScene();
		}
	}

	finishScene() {
		if (this.solved) return;

		this.playAudio('win');
		this.solved = true;
		const totalMoves = +this.registry.get('moves') + this.totalMoves;
		this.registry.set('moves', totalMoves);

		this.winText = this.add
			.bitmapText(this.center_width, -100, 'mario', 'STAGE CLEARED!', 30)
			.setOrigin(0.5)
			.setTint(0xffe066)
			.setDropShadow(2, 3, 0x75b947, 0.7);
		this.tweens.add({
			targets: this.winText,
			duration: 500,
			y: { from: this.winText.y, to: this.center_height },
		});
		this.tweens.add({
			targets: [this.winText, this.movesText],
			duration: 100,
			scale: { from: 1, to: 1.1 },
			repeat: -1,
			yoyo: true,
		});
		this.time.delayedCall(
			2000,
			() => {
				this.scene.start('transition', {
					next: 'underwater',
					name: 'STAGE',
					number: this.number + 1,
				});
			},
			undefined,
			this,
		);
	}

	restartScene() {
		this.scene.start('game', {
			next: 'underwater',
			name: 'STAGE',
			number: this.number,
		});
	}

	updateMoves() {
		this.totalMoves++;
		this.movesText.setText(this.totalMoves.toString());
		this.tweens.add({
			targets: [this.timerText],
			duration: 200,
			alpha: { from: 0.6, to: 1 },
			repeat: -1,
		});
	}
}
