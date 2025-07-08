import Phaser from 'https://esm.sh/phaser@4.0.0-rc.4';
import Bootloader from "./scenes/boodloader.ts";
import Game from "./scenes/game.ts";
import Splash from "./scenes/splash.ts";
import Transition from "./scenes/transition.ts";
import Outro from "./scenes/outro.ts";
/*
This is the main configuration file for the game.
*/
const config: Phaser.Types.Core.GameConfig = {
  width: 1000,
  height: 800,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  autoRound: false,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 350 },
      debug: false,
    },
  },
  scene: [ Bootloader, Splash, Transition, Game, Outro ],
};

export const game = new Phaser.Game(config);