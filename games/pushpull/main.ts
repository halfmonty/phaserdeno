import Phaser from 'phaser';
import Bootloader from './scenes/bootloader.ts';
import Outro from './scenes/outro.ts';
import Splash from './scenes/splash.ts';
import Transition from './scenes/transition.ts';
import Game from './scenes/game.ts';

const config: Phaser.Types.Core.GameConfig = {
    width: 608,
    height: 608,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    autoRound: false,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 0},
            debug: false
        },
    },
    plugins: {},
    scene: [Bootloader, Splash, Transition, Game, Outro]
};

export const pushpull = () => new Phaser.Game(config);