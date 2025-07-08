import { Hono } from 'hono';
import { upgradeWebSocket } from 'hono/deno';

// Store WebSocket connections for live reload
const reloadConnections = new Set<WebSocket>();

export const reloadWS = new Hono()
	.get(
		'/',
		upgradeWebSocket( ( _c ) => {
			return {
				onOpen: ( _event, ws ) => {
					console.log( '🤝 Live reload client connected' );
					reloadConnections.add( ws.raw! );
				},
				onClose: ( _event, ws ) => {
					console.log( '👋 Live reload client disconnected' );
					reloadConnections.delete( ws.raw! );
				},
				onError: ( event, ws ) => {
					console.log( '🤷‍♂️ Live reload WebSocket error:', event );
					reloadConnections.delete( ws.raw! );
				},
			};
		} ),
	);

export const reloadApi = new Hono()
	.get( '/', ( c ) => {
		console.log(
			'👍 Triggering reload for',
			reloadConnections.size,
			'clients',
		);

		for ( const ws of reloadConnections ) {
			try {
				ws.send( 'reload' );
			} catch ( error ) {
				console.log( '🚩 Error sending reload signal:', error );
				reloadConnections.delete( ws );
			}
		}

		return c.json( { success: true, clients: reloadConnections.size } );
	} );
