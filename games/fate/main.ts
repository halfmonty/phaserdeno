import Phaser from 'https://esm.sh/phaser@3.52.0';
import { enable3d, Canvas } from 'https://esm.sh/@enable3d/phaser-extension@0.25.4';
import Bootloader from "./scenes/bootloader.ts";
// import Outro from "./scenes/outro.ts";
// import GameOver from "./scenes/game_over.ts";
// import Splash from "./scenes/splash.ts";
// import Story from "./scenes/story.ts";
// import Game from "./scenes/game.ts";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    transparent: true,
    width: 600,
    height: 300,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: 'game-container',
    scene: [Bootloader],
    // scene: [Bootloader, Story, Splash, Game, Outro, GameOver],
    ...Canvas(),
};

window.addEventListener("load", () => {
  enable3d(() => new Phaser.Game(config)).withPhysics("./assets/fate/ammo");
});