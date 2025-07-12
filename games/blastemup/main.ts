import Phaser from 'phaser';
import Bootloader from './scenes/bootloader.ts';
import Game from './scenes/game.ts';

const config: Phaser.Types.Core.GameConfig = {
	width: 868,
	height: 800,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	parent: 'game-container',
	autoRound: false,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { x: 0, y: 0 },
			debug: false,
		},
	},
	plugins: {},
	scene: [Bootloader, Game],
	...{useTicker: true}
};

export const Blastemup = () => new Phaser.Game(config);
