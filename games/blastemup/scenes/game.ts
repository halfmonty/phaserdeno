import Player from '../gameobjects/player.ts';
import {
	NEW_PLAYER,
	PLAYER_DISCONNECTED,
	PLAYER_IS_MOVING,
} from '../status.ts';

type PlayerPositionData = { x: number; y: number; rotation: number; key: string; };
type MessageData = Player | PlayerPositionData | string | Player & PlayerPositionData;

export default class Game extends Phaser.Scene {
	id: number | null = null;
	socket?: WebSocket;
	enemies!: Record<string, Player>;
	enemyPlayers!: Phaser.Physics.Arcade.Group;
	player!: Player;
	thrust!: Phaser.GameObjects.Layer;
	audios!: Record<
		string,
		| Phaser.Sound.NoAudioSound
		| Phaser.Sound.HTML5AudioSound
		| Phaser.Sound.WebAudioSound
	>;
	theme!:
		| Phaser.Sound.NoAudioSound
		| Phaser.Sound.HTML5AudioSound
		| Phaser.Sound.WebAudioSound;

	constructor() {
		super({ key: 'game' });
	}

	create() {
		this.id = null;

		this.startSockets();
		this.loadAudios();
		this.playMusic();
		// this.addColliders();
	}

	/*
This is where the connection with the server is established and we set listeners for events that we will receive from that server. Through those listeners, we will be aware of new players, player movement and player destroy events. We need to add that `.bind(this)` to this event callback to make the elements of this class reachable. In this case, we separate the group of enemies in a hash and their physical group with `this.enemyPlayers` to set the collisions. But we could just use the physical group.
	*/
	startSockets() {
		this.socket = new WebSocket('ws://localhost:8000/ws/blastemup');

		this.socket.onopen = () => {
			console.log('Connected to WebSocket server');
			this.addPlayer();
		};

		this.socket.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				this.handleMessage(data.type, data.payload);
			} catch (error) {
				console.error('Error parsing WebSocket message:', error);
			}
		};

		this.socket.onclose = () => {
			console.log('WebSocket connection closed');
			this.destroy();
		};

		this.enemies = {};
		this.enemyPlayers = this.physics.add.group();
	}

	handleMessage(type: string, payload: MessageData) {
		switch (type) {
			case 'newPlayer':
				this.addEnemyPlayers(payload as Player);
				break;

			// case 'currentPlayers':
			// 	Object.keys(payload as object).forEach((key) => {
			// 		if (!this.enemies[key] && key !== this.player.key) {
			// 			this.addEnemyPlayers(payload[key]);
			// 		}
			// 	});
			// 	break;

			case 'playerMoved':
				{
					const positionPayload = payload as Player & PlayerPositionData ;
					const [_name, key] = positionPayload.name.split(':');
					if (this.enemies[key]) {
						this.enemies[key].setRotation(positionPayload.rotation);
						this.enemies[key].setPosition(positionPayload.x, positionPayload.y);
					}
				}
				break;

			case 'playerDisconnected':
				this.enemyPlayers.getChildren().forEach((otherPlayer) => {
					const op = otherPlayer as Player;
					if (payload === op.key) {
						otherPlayer.destroy();
					}
				});
				break;

			default:
				console.log('Unknown message type:', type);
		}
	}

	sendMessage(type:string, payload: MessageData ) {
		console.log(`sending message ${type}`);
		if (this.socket?.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify({ type, payload }));
		} else {
			console.warn('WebSocket is not connected');
		}
	}

	/*
When a new enemy event is received, we'll add this new game object to this player's screen.
	*/
	addEnemyPlayers(enemyPlayer: Player) {
		const [_name, key] = enemyPlayer.name.split(':');
		console.log('Adding enemy player! ', enemyPlayer.name, ' Against ', key);
		const enemy = new Player(
			this,
			enemyPlayer.x,
			enemyPlayer.y,
			enemyPlayer.name,
		);
		this.enemies[enemy.key] = enemy;
		this.enemyPlayers.add(enemy);
		this.addColliders();
	}

	/*
When we add our local player to the game, we must notify the server about it! We are setting a generic game here, but we could add a custom name from a website.
	*/
	addPlayer() {
		this.thrust = this.add.layer();
		const x = 600 + Phaser.Math.Between(-100, 100);
		const y = 500 + Phaser.Math.Between(-100, 100);
		this.player = new Player(this, x, y, 'MyName:' + crypto.randomUUID());
		console.log('Creating player! ', this.player.key);
		this.sendMessage(NEW_PLAYER, this.player);
		this.setCamera();
	}

	setCamera() {
		this.cameras.main.setBackgroundColor(0xcccccc);
		this.cameras.main.startFollow(this.player, true, 0.05, 0.05, 0, 100);
	}

	/*
This is the only collider in this simplified game. If the player hits any other ship, both ships will be destroyed.
	*/
	addColliders() {
		// this.physics.add.collider(this.player, this.enemyPlayers);
		this.physics.add.overlap(
			this.player,
			this.enemyPlayers,
			this.playerCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
			undefined,
			this
		);
	}

	playerCollision(player: Player, foe: Player) {
		this.sendMessage(PLAYER_DISCONNECTED, player.key);
		player.destroy();
		foe.destroy();
	}

	/*
In the game loop, we check if the player position has changed. If it has, we notify the server about it, so other players can reproduce the movement.
	*/
	override update() {
		if (this.player) {
			const currPosition = {
				x: this.player.x,
				y: this.player.y,
				rotation: this.player.rotation,
			};
			if (
				this.player.oldPosition &&
				(currPosition.x !== this.player.oldPosition.x ||
					currPosition.y !== this.player.oldPosition.y ||
					currPosition.rotation !== this.player.oldPosition.rotation)
			) {
				this.sendMessage(PLAYER_IS_MOVING, {
					key: this.player.key,
					...currPosition,
				});
			}

			this.player.oldPosition = currPosition;
		}
	}

	/*
The rest of the game is same as usual.
	*/
	loadAudios() {
		this.audios = {
			pick: this.sound.add('pick'),
			shot: this.sound.add('shot'),
			foeshot: this.sound.add('foeshot'),
			explosion: this.sound.add('explosion'),
			asteroid: this.sound.add('asteroid'),
		};
	}

	playAudio(key: string) {
		this.audios[key].play({ volume: 0.2 });
	}

	playMusic(theme?: string) {
		const selectedMusic = theme ?? `muzik${Phaser.Math.Between(0, 5)}`;
		this.theme = this.sound.add(selectedMusic);
		this.theme.stop();
		this.theme.play({
			mute: false,
			volume: 1,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0,
		});
	}

	startGame() {
		if (this.theme) this.theme.stop();
		this.scene.start('game');
	}

    
	destroy() {
		console.log("destroying");
		if (this.player) this.sendMessage(PLAYER_DISCONNECTED, this.player.key);
		// super.destroy();
	}
}
