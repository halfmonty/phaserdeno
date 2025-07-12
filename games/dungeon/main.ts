import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import Bootloader from './scenes/bootloader.ts';
import Outro from './scenes/outro.ts';
import Splash from './scenes/splash.ts';
import Transition from './scenes/transition.ts';
import Game from './scenes/game.ts';

const pluginConfig = {
  // The plugin class:
  plugin: PhaserMatterCollisionPlugin.PhaserMatterCollisionPlugin,
  // Where to store in Scene.Systems, e.g. scene.sys.matterCollision:
  key: "matterCollision" as const,
  // Where to store in the Scene, e.g. scene.matterCollision:
  mapping: "matterCollision" as const
};

declare module "phaser" {
  interface Scene {
    [pluginConfig.mapping]: PhaserMatterCollisionPlugin.PhaserMatterCollisionPlugin;
  }
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace Scenes {
    interface Systems {
      [pluginConfig.key]: PhaserMatterCollisionPlugin.PhaserMatterCollisionPlugin;
    }
  }
}

const config: Phaser.Types.Core.GameConfig = {
	width: 600,
	height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
	autoRound: false,
	parent: 'game-container',
	physics: {
		default: 'matter',
		matter: {
            debug: false
        }
	},
	plugins: {
        scene: [
			{
				plugin: PhaserMatterCollisionPlugin,
				key: "matterCollision",
				mapping: "matterCollision",
			}
		]
    },
	scene: [Bootloader, Splash, Transition, Game, Outro],
};

export const Dungeon = () => new Phaser.Game(config);