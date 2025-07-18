import { Scene3D } from '@enable3d/phaser-extension';

export default class Bootloader extends Scene3D {
    progressBar!: Phaser.GameObjects.Graphics;
    loadBar!: Phaser.GameObjects.Graphics;

	constructor() {
		super({ key: 'bootloader' });
	}

	/*
    We use the preload method to call the methods to load all our assets.
    */
	preload() {
		this.createBars();
		this.setLoadEvents();
		this.loadFonts();
		this.loadImages();
		this.loadAudios();
		this.loadVideos();
		this.setRegistry();
	}

	/*
    This is a method to set the events that will be triggered when the loading is progressing and when it is complete.
    */
	setLoadEvents() {
		this.load.on(
			'progress',
			(value: number) => {
				this.progressBar.clear();
				this.progressBar.fillStyle(0x03a062, 1);
				this.progressBar.fillRect(
					this.cameras.main.width / 4,
					this.cameras.main.height / 2 - 16,
					(this.cameras.main.width / 2) * value,
					16,
				);
			},
			this,
		);
		this.load.on(
			'complete',
			() => {
				this.scene.start('story');
			},
			this,
		);
	}

	/*
    This is a method to load the fonts.
    */
	loadFonts() {
		this.load.bitmapFont(
			'pixelFont',
			'assets/fate/fonts/mario.png',
			'assets/fate/fonts/mario.xml',
		);
		this.load.bitmapFont(
			'computer',
			'assets/fate/fonts/computer.png',
			'assets/fate/fonts/computer.xml',
		);
	}

	/*
    We load this logo that looks old to match the style of the splash.
    */
	loadImages() {
		this.load.image('pello_logo_old', 'assets/fate/images/pello_logo_old.png');
	}

	/*
    We need to keep track of the deviation -hits- and the number of probes.
    */
	setRegistry() {
		this.registry.set('deviation', '0');
		this.registry.set('probes', '20');
	}

	/*
    We load the sounds and the music.
    */
	loadAudios() {
		Array(4)
			.fill(0)
			.forEach((_e, i) => {
				this.load.audio(`thunder${i}`, `./assets/fate/sounds/thunder${i}.mp3`);
			});
		Array(2)
			.fill(0)
			.forEach((_e, i) => {
				this.load.audio(`passby${i}`, `./assets/fate/sounds/passby${i}.mp3`);
			});
		Array(4)
			.fill(0)
			.forEach((_, i) => {
				this.load.audio(`hit${i + 1}`, `assets/fate/sounds/hit${i + 1}.mp3`);
			});
		this.load.image('logo', 'assets/fate/images/logo.png');
		this.load.audio('hymn', 'assets/fate/sounds/hymn.mp3');
		this.load.audio('music', 'assets/fate/sounds/music.mp3');
		this.load.audio('type', 'assets/fate/sounds/type.mp3');
		this.load.audio('shot', 'assets/fate/sounds/shot.mp3');
		this.load.audio('voice_start', 'assets/fate/sounds/voice_start.mp3');
		this.load.audio('voice_drop', 'assets/fate/sounds/voice_drop.mp3');
		this.load.audio('voice_hit', 'assets/fate/sounds/voice_hit.mp3');
	}

	/*
    In this game, we are using videos! They will be player in the presentation scene that comes before the Splash.
    */
	loadVideos() {
		Array(4)
			.fill(0)
			.forEach((_e, i) => {
				this.load.video(
					`video${i}`,
					`./assets/fate/videos/video${i}.mp4`,
					false
				);
			});
	}

	/*
    As you may already now, this is a method to create the loading bars.
    */
	createBars() {
		this.loadBar = this.add.graphics();
		this.loadBar.fillStyle(0x06e18a, 1);
		this.loadBar.fillRect(
			this.cameras.main.width / 4 - 2,
			this.cameras.main.height / 2 - 18,
			this.cameras.main.width / 2 + 4,
			20,
		);
		this.progressBar = this.add.graphics();
	}
}
