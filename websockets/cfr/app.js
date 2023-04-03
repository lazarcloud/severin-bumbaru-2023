import express from "express";
import http from 'http'
const app = express();

app.get("/", (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.sendFile('./index.html');
});
// Send index.html to all requests
const httpServer = http.createServer(app);
// Socket.io server listens to our app
import { Server } from "socket.io";
const io = new Server(httpServer);

// Send current time to all connected clients
function sendTime() {
    io.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 10000);

// Emit welcome message on connection
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });

    socket.on('i am client', console.log);
});

app.listen(3000);