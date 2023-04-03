import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { Server } from 'socket.io'
const websocketServer = {
	name: 'sveltekit-socket-io',
	configureServer(server) {
	  const io = new Server(server.httpServer, { path: '/test'});
	  // Socket.IO stuff goes here  
	  io.on('connection', (socket) => {
		// Generate a random username and send it to the client to display it
		let username = `User ${Math.round(Math.random() * 999999)}`;
		socket.emit('name', username);
	  });

	  console.log('SocketIO injected');

	}
  }

export default defineConfig({
	plugins: [sveltekit(), websocketServer]
});
