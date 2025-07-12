import Phaser from 'phaser';
import { Canvas, enable3d } from '@enable3d/phaser-extension';
import Bootloader from "./scenes/bootloader.ts";
import Outro from "./scenes/outro.ts";
import GameOver from "./scenes/game_over.ts";
import Splash from "./scenes/splash.ts";
import Story from "./scenes/story.ts";
import Game from "./scenes/game.ts";

export const Fate = () => {
	globalThis.addEventListener('load', () => {
		enable3d(() =>
			new Phaser.Game({
				type: Phaser.WEBGL,
				transparent: true,
				width: 1280,
				height: 720,
        parent: 'game-container',
				scale: {
					mode: Phaser.Scale.FIT,
					autoCenter: Phaser.Scale.CENTER_BOTH,
				},
				scene: [ Bootloader, Story, Splash,  Game, Outro, GameOver ],
				...Canvas()
			})
		).withPhysics('./assets/fate/ammo');
	});
};
