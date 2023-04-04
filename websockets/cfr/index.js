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
const io = new Server(httpServer, { cors: { origin: '*' }, path: '/main' });

function sendTime() {
  io.emit('time', { time: new Date().toJSON() });
}
setInterval(sendTime, 10000);

// Emit welcome message on connection
io.on('connection', function(socket) {
  console.log(socket.handshake.query.chatId)
  let chatId = socket.handshake.query.chatId;
  socket.join(chatId);
  //emit to all
  io.to(chatId).emit('welcome', { message: 'Welcome!', id: socket.id });
  socket.on('request', (data) => {
    console.log(socket.id)
    console.log(data)
    socket.emit('response', { message: 'Response!', id: socket.id });
  })
});


app.get("/", (req, res) => {
  const helloMessage = `Hello from ${os.hostname()}!`;
  console.log(helloMessage);
  res.send(helloMessage);
});

// app.get('/home', (req, res) => {
//   res.sendFile('index.html', { root: __dirname });
// });

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});