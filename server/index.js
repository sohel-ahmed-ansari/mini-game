const express = require('express');
const path = require('path');
const httpModule = require('http');
const socketIO = require('socket.io');
const GameEngine = require('./GameEngine');

const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const app = express();
const http = httpModule.createServer(app);
const io = socketIO(http);

app.use(express.static(DIST_DIR));
app.get('/', (req, res) => {
    res.sendFile(HTML_FILE);
});

const gameEngine = new GameEngine({io});
gameEngine.start();

http.listen(3000, () => {
    console.log('Listening on port 3000');
});


