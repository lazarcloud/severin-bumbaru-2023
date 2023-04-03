import express from "express";
import { createServer } from 'http';
import os from "os";
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 8600;

import { Server } from "socket.io";
const io = new Server(httpServer, { cors: { origin: '*' }, path: '/chat' });
// import { start_mongo } from "../../.shared/db/messages/mongo";
// start_mongo().then(() => {
//   console.log('MongoDB connected');
// });
// Send current time to all connected clients
function sendTime() {
  io.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 10000);

// Emit welcome message on connection
io.on('connection', function(socket) {
  console.log(socket.handshake.query.chatId)
  let chatId = socket.handshake.query.chatId;
  socket.join(chatId);
  //emit to all
  io.to(chatId).emit('welcome', { message: 'Welcome!', id: socket.id });
  socket.on('message', (data) => {
    console.log(data)
    socket.to(chatId).emit('message', data);
  })
  //socket.emit('welcome', { message: 'Welcome!', id: socket.id });
  // Use socket to communicate with this particular client only, sending it it's own id
  

  //socket.on('i am client', console.log);
});


app.get("/", (req, res) => {
  const helloMessage = `Hello from ${os.hostname()}!`;
  console.log(helloMessage);
  res.send(helloMessage);
});

app.get('/home', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});