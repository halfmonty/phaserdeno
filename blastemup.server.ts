const players: Record<string, any> = {};
const clients = new Set<WebSocket>();

const socketToPlayerKey = new Map<WebSocket, string>();
const playerKeyToSocket = new Map<string, WebSocket>();

export function handleBlastemUPWebSocket(request: Request): Response {
	if (request.headers.get('upgrade') !== 'websocket') {
		return new Response(null, { status: 501 });
	}

	const { socket, response } = Deno.upgradeWebSocket(request);

	socket.onopen = () => {
		console.log('🤝 New client connected');
		clients.add(socket);
	};

	socket.onmessage = (event) => {
		try {
			const data = JSON.parse(event.data.toString());
			const { type, payload } = data;

			switch (type) {
				case 'newPlayer':
					handleNewPlayer(payload, socket);
					break;
				case 'playerDisconnected':
					console.log('⚠️ player disconnected');
					handlePlayerDisconnected(payload, socket);
					break;
				case 'playerIsMoving':
					handlePlayerMoving(payload, socket);
					break;
				default:
					console.log('unknown meessage type:', type);
			}
		} catch (error) {
			console.error('Error parsing message:', error);
		}
	};

	socket.onclose = () => {
		console.log('👋 client disconnected');
		clients.delete(socket);
		handleDisconnection(socket);
	};

	socket.onerror = (error) => {
		console.log('🤷‍♂️ WebSocket error:', error);
		clients.delete(socket);
		handleDisconnection(socket);
	};

	return response;
}

function sendToClient(ws: WebSocket, type: string, payload: any) {
	if (ws.readyState === WebSocket.OPEN) {
		ws.send(JSON.stringify({ type, payload }));
	}
}

function broadcast(senderWs: WebSocket, type: string, payload: any) {
	const message = JSON.stringify({ type, payload });

	clients.forEach((client) => {
		if (client !== senderWs && client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
}

function broadcastToAll(type: string, payload: any) {
	const message = JSON.stringify({ type, payload });

	clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
}

function handleNewPlayer(newPlayer: any, ws: WebSocket) {
	console.log('New player joined with state:', newPlayer);
	const [_name, key] = newPlayer.name.split(':');
	players[key] = newPlayer;

	socketToPlayerKey.set(ws, key);
	playerKeyToSocket.set(key, ws);

	// Send current players to the new player
	sendToClient(ws, 'currentPlayers', players);

	// Broadcast new player to all other clients
	broadcast(ws, 'newPlayer', newPlayer);
}

function handlePlayerDisconnected(key: string, ws: WebSocket) {
	delete players[key];
	console.log('Server > player destroyed: ', key);

	socketToPlayerKey.delete(ws);
	playerKeyToSocket.delete(key);

	// Broadcast player disconnection to all other clients
	broadcast(ws, 'playerDisconnected', key);
}

function handlePlayerMoving(positionData: any, ws: WebSocket) {
	// console.log('Server> playerMoved> Player moved to ', positionData);
	const key = positionData?.key;

	if (players[key] == undefined) return;

	players[key].x = positionData.x;
	players[key].y = positionData.y;
	players[key].rotation = positionData.rotation;

	// Broadcast player movement to all other clients
	broadcast(ws, 'playerMoved', players[key]);
}

function handleDisconnection(ws: WebSocket) {
	// Clean up player associated with this connection
	const playerKey = socketToPlayerKey.get(ws);
	if (playerKey) {
		console.log(`Auto-removing player ${playerKey} due to disconnect`);
		delete players[playerKey];
		socketToPlayerKey.delete(ws);
		playerKeyToSocket.delete(playerKey);

		// Broadcast player disconnection to all remaining clients
		broadcastToAll('playerDisconnected', playerKey);
	}
}
