import Game from '../scenes/game.ts';
import Block from './block.ts';

export default class BlockGroup extends Phaser.GameObjects.Container {
	declare scene: Game;
	declare body: Phaser.Physics.Arcade.Body;
	override w: number;
	h: number;
	id: number;
	defaultVelocity: number;
	allowChangeDirection: boolean;
	cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
	W!: Phaser.Input.Keyboard.Key;
	A!: Phaser.Input.Keyboard.Key;
	S!: Phaser.Input.Keyboard.Key;
	D!: Phaser.Input.Keyboard.Key;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		w = 2,
		h = 3,
		color = 'blue',
		defaultVelocity = 100,
	) {
		super(scene, x, y);
		this.w = +w;
		this.h = +h;
		this.id = Math.random();
		this.name = 'block_' + color;
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.body.immovable = true;
		this.active = false;
		153;
		this.setKeys();
		this.defaultVelocity = defaultVelocity;
		this.createBlock();
		this.allowChangeDirection = true;
		this.scene.events.on('update', this.update, this);
		this.setListeners();
	}

	createBlock() {
		this.body.setSize(this.w * 32, this.h * 32);

		for (let i = 0; i < this.w; i++) {
			for (let j = 0; j < this.h; j++) {
				this.add(new Block(this.scene, i * 32, j * 32, this.name));
			}
		}
	}

	setKeys() {
		if (!this.scene.input.keyboard) throw ('No Keyboard input found');
		this.cursor = this.scene.input.keyboard.createCursorKeys();
		this.W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.scene.events.on('update', this.update, this);
	}

	setListeners() {
		this.setInteractive(
			new Phaser.Geom.Rectangle(0, 0, 64, 96),
			Phaser.Geom.Rectangle.Contains,
		);
		this.on('pointerdown', () => {
			this.scene.playAudio('select');
			this.iterate((block: Block) => block.setTint(0x306070));
			this.activate();
		});
		this.on('pointerover', () => {
			this.scene.playAudio('hover');
			this.iterate((block: Block) => block.setTint(0x306070));
		});
		this.on('pointerout', () => {
			this.iterate((block: Block) => block.clearTint());
		});
	}

	activate() {
		if (this.scene.activeBlock) this.scene.activeBlock.deactivate();
		this.active = true;
		this.scene.activeBlock = this;
	}

	deactivate() {
		this.active = false;
	}

	override update() {
		if (!this.active) return;
		if (
			(Phaser.Input.Keyboard.JustUp(this.S) ||
				Phaser.Input.Keyboard.JustUp(this.cursor.down)) &&
			this.canMoveDown()
		) {
			this.leaveTrail(this.w * 32, 32);
			this.y += 32;
			this.scene.updateMoves();
		} else if (
			(Phaser.Input.Keyboard.JustUp(this.W) ||
				Phaser.Input.Keyboard.JustUp(this.cursor.up)) &&
			this.canMoveUp()
		) {
			this.leaveTrail(this.w * 32, 32, 0, (this.h - 1) * 32);
			this.y -= 32;
			this.scene.updateMoves();
		} else if (
			(Phaser.Input.Keyboard.JustUp(this.D) ||
				Phaser.Input.Keyboard.JustUp(this.cursor.right)) &&
			this.canMoveRight()
		) {
			this.leaveTrail(32, this.h * 32);
			this.x += 32;
			this.scene.updateMoves();
		} else if (
			(Phaser.Input.Keyboard.JustUp(this.A) ||
				Phaser.Input.Keyboard.JustUp(this.cursor.left)) &&
			this.canMoveLeft()
		) {
			this.leaveTrail(32, this.h * 32, (this.w - 1) * 32);
			this.x -= 32;
			this.scene.updateMoves();
		}
	}

	leaveTrail(w: number, h: number, offsetX = 0, offsetY = 0) {
		this.scene.playAudio('move');
		const trail = this.scene.add
			.rectangle(this.x + offsetX, this.y + offsetY, w, h, 0xcccccc)
			.setOrigin(0);
		this.scene.tweens.add({
			targets: [trail],
			duration: 300,
			alpha: { from: 1, to: 0 },
			onComplete: () => {
				trail.destroy();
			},
		});
	}

	isOverlap(x = 0, y = 0) {
		const overlaps = [...this.scene.blocks.children].map((object) => {
            const block = object as unknown as Block;
			if (block.id === this.id) return false;
			const myBounds = this.getBounds();
			const otherBounds = block.getBounds();
			myBounds.x += 1;
			myBounds.y += 1;
			myBounds.width = this.w * 32 - 2;
			myBounds.height = this.h * 32 - 2;
			myBounds.x += x;
			myBounds.y += y;
			const intersect = Phaser.Geom.Intersects.RectangleToRectangle(
				myBounds,
				otherBounds,
			);
			return intersect;
		});
		return !overlaps.every((block) => !block);
	}

	canMoveDown(distance = 32) {
		if (this.isOverlap(0, 1)) {
			this.scene.playAudio('bump');
			return false;
		}
		distance = this.h * 32;
		const blocks = Array(this.w)
			.fill(0)
			.map((_, i) => {
				return this.scene.platform.getTileAtWorldXY(
					this.x + i * 32,
					this.y + distance,
				);
			});
		const canMove = blocks.every((block) => !block);
		if (!canMove) {
			this.scene.playAudio('bump');
		}
		return canMove;
	}

	canMoveUp(_distance = 32) {
		if (this.isOverlap(0, -1)) {
			this.scene.playAudio('bump');
			return false;
		}
		const blocks = Array(this.w)
			.fill(0)
			.map((_, i) => {
				return this.scene.platform.getTileAtWorldXY(
					this.x + i * 32,
					this.y - 1,
				);
			});
		const canMove = blocks.every((block) => !block);
		if (!canMove) {
			this.scene.playAudio('bump');
		}
		return canMove;
	}

	canMoveLeft(distance = 32) {
		if (this.isOverlap(-1, 0)) {
			this.scene.playAudio('bump');
			return false;
		}
		const blocks = Array(this.h)
			.fill(0)
			.map((_, i) => {
				return this.scene.platform.getTileAtWorldXY(
					this.x - distance,
					this.y + i * 32,
				);
			});
		const canMove = blocks.every((block) => !block);
		if (!canMove) {
			this.scene.playAudio('bump');
		}
		return canMove;
	}

	canMoveRight(distance = 32) {
		if (this.isOverlap(1, 0)) {
			this.scene.playAudio('bump');
			return false;
		}
		distance = this.w * 32;
		const blocks = Array(this.h)
			.fill(0)
			.map((_, i) => {
				return this.scene.platform.getTileAtWorldXY(
					this.x + distance,
					this.y + i * 32,
				);
			});
		const canMove = blocks.every((block) => !block);
		if (!canMove) {
			this.scene.playAudio('bump');
		}
		return canMove;
	}
}
