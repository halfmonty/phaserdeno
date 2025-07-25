export default class Utils {
    scene: Phaser.Scene;
    typeAudio?: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

	constructor(scene: Phaser.Scene) {
		this.scene = scene;
	}

	/*
This is the typeText method. It will create a bitmap text for each character in the string, and will animate them in a timeline. The text will be typed in the screen, with a typewriter effect.
  */
	typeText(text: string, font: string, x: number, y = 150, tint = 0x06e18a, size = 40) {
		const characters: Array<Phaser.GameObjects.BitmapText | Phaser.GameObjects.Rectangle> = [];
		let jump = 0;
		let line = 0;
		text.split('').forEach((character, _i) => {
			if (character === '\n') {
				jump += 2;
				line = 0;
			}
			characters.push(
				this.scene.add
					.bitmapText(
						x - 350 + line++ * 25,
						y + jump * size,
						font,
						character,
						size,
					)
					.setTint(tint)
					.setAlpha(0),
			);
		});
		const ending = this.scene.add
			.rectangle(x - 335 + line * 25, y + 25 + jump * size, 25, 5, tint)
			.setOrigin(0.5)
			.setAlpha(0);
		const timeline = this.scene.add.timeline({});
		this.typeAudio = this.scene.sound.add('type');

		characters.forEach((character, _i) => {
			timeline.add({
				at: 0,
				tween: {
					targets: character,
					alpha: { from: 0, to: 0.5 },
					duration: 100,
				},
			});
		});

		timeline.add({
			at: 100,
			tween: {
				targets: ending,
				alpha: { from: 0, to: 0.8 },
				duration: 100,
				repeat: 5,
				yoyo: true,
				onStart: () => {
					this.typeAudio?.stop();
				},
			},
		});

		this.typeAudio.play({
			mute: false,
			volume: 1,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0,
		});
		timeline.play();
		characters.push(ending);
		return characters;
	}

	/*
This removes the typed text from the screen.
  */
	removeTyped(texts: (Phaser.GameObjects.BitmapText | Phaser.GameObjects.Rectangle)[][]) {
		texts.flat().forEach((char) => char.destroy());
	}
}
