import Phaser from 'phaser';
import Game from "./scenes/game.ts";

const config: Phaser.Types.Core.GameConfig = {
    width: 800, 
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    autoRound: false,
    parent: "game-container",
    physics: {
			default: 'arcade',
			arcade: {
				gravity: { x: 0, y: 350 },
				debug: false,
			},
		},
    scene: [Game],
};

const Basic = () => new Phaser.Game(config);

export { Basic };