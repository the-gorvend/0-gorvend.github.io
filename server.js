const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('Usuário conectado');

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor está ouvindo na porta ${PORT}`);
});
