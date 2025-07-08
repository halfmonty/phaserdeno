import Phaser from 'https://esm.sh/phaser@4.0.0-rc.4';
import Bootloader from './scenes/bootloader.ts';
import Game from './scenes/game.ts';

const config: Phaser.Types.Core.GameConfig = {
	useTicker: true,
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
};

const game = new Phaser.Game(config);
