const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <form method="POST" action="/send-message">
          <button type="submit">Send Message</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/send-message', (req, res) => {
  // Send the message to all connected clients using Socket.IO
  io.emit('message', 'This is a message from the server');
  res.redirect('/');
});

io.on('connection', (socket) => {
  console.log('A client connected');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
