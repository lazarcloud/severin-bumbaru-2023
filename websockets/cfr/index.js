import express from "express";
import { createServer } from 'http';
import os from "os";
import path from 'path';
import {fileURLToPath} from 'url';
import { chart_driveROUTE } from "../../unit_testing/ROUTING/DRIVE.js";
const __filename = fileURLToPath(import.meta.url);

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
const translator = {
  'Galați': 0,
  'Alba Iulia': 1,
  'București': 2,
  'Iași': 3,
  'Timișoara': 4
}

io.on('connection', function(socket) {
  console.log(socket.handshake.query.chatId)
  let chatId = socket.handshake.query.chatId;
  socket.join(chatId);
  //emit to all
  io.to(chatId).emit('welcome', { message: 'Welcome!', id: socket.id });
  // models.py
//   const sms = {
//     id: data.id,
//     departure: $forms.departure,
//     cities: $cities,
//     method: selectedVehicle,
//     departureTime: $forms.departureTime
// }
  socket.on('request', (data) => {
    console.log(socket.id)
    console.log(data)
    const epoch = Date.parse(data.departureDate) / 1000
    let ans
    if(data.method == 'car'){
      ans = chart_driveROUTE(translator[data.departure], epoch, data.cities.map(e => [translator[e], 2]))
    }
    socket.emit('response', { message: 'Response!', id: socket.id, ans:ans });
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