import Game from '../scenes/game.ts';

export default class Lightning {
	scene: Game;

	constructor(scene: Phaser.Scene) {
		this.scene = scene as Game;
	}

	/*
In this method, we create a timeline to show the lightning effect. We use the `lightningEffect` rectangle to show the lightning and the `lightsOut` rectangle to darken the screen.
  */
	lightning() {
		if (Phaser.Math.Between(1, 11) < 10) return;

		const tweens: Array<Phaser.Types.Time.TimelineEventConfig> = [];
		tweens.push({
			tween: {
				targets: this.scene.lightningEffect,
				alpha: { from: 0, to: 1 },
				duration: 100,
				repeat: 3,
			},
		});
		if (this.scene.lights.active) {
			tweens.push({
				tween: {
					targets: this.scene.lightsOut,
					alpha: { from: 1, to: 0.5 },
					duration: 500,
				},
			});
		} 
		tweens.push({
			tween: {
				targets: this.scene.lightningEffect,
				alpha: { from: 1, to: 0 },
				duration: 2000,
			},
		});
		if (this.scene.lights.active) {
			tweens.push({
				tween: {
					targets: this.scene.lightsOut,
					alpha: { from: 0.5, to: 1 },
					duration: 500,
				},
			});
		}
		const timeline = this.scene.add.timeline(tweens);

		timeline.play();
		this.scene.playRandom('thunder' + Phaser.Math.Between(0, 3));
	}
}
