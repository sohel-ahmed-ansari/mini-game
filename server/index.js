const express = require('express');
const path = require('path');
const httpModule = require('http');
const socketIO = require('socket.io');
const uuid = require('uuid/v1');

const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const MAIN_JS = path.join(DIST_DIR, 'main.js');

const app = express();
const http = httpModule.createServer(app);
const io = socketIO(http);

const MAX_PLAYERS = 2;
const MAX_STARTING_NUMBER = 100;
const DIVIDE_BY = 3;
let players = [];
let startingNumber;
let lastMoveData;

app.use(express.static(DIST_DIR));
app.get('/', (req, res) => {
    res.sendFile(HTML_FILE);
});

io.on('connection', (socket) => {
    socket.on('JOIN_GAME', (data) => {
        if (players.length >= MAX_PLAYERS) {
            socket.emit('ROOM_FULL');
            return;
        }
        const playerInfo = {
            name: data.playerName,
            id: uuid(), 
            socketID: socket.id
        };
        socket.emit('ENTERED_GAME', {
            name: playerInfo.name,
            id: playerInfo.id
        });
        players.push(playerInfo);
        
        console.log(playerInfo.name + ' has connected to the game');
        console.log('Connected players: ', players.map(player => player.name));
        
        if (players.length === MAX_PLAYERS) {
            startingNumber = 1000;//Math.round((Math.random() * (MAX_STARTING_NUMBER - DIVIDE_BY)) + DIVIDE_BY);
            io.emit('GAME_STARTED', {
                startingNumber,
                startingPlayer: players[0].id
            });
            
            console.log('game has started between: ', players.map(player => player.name));
        }
    });

    socket.on('ADD_MOVE', (data) => {
        //if same player sending move more than once in a row, reject it
        if (lastMoveData && socket.id === lastMoveData.socketID) {
            return;
        }
        const {equation, output, gameLost} = getResult(data.input);
        if (!gameLost) {
            const moveData = {
                playerName: data.playerName,
                playerID: data.playerID,
                input: data.input,
                equation,
                output
            };
            io.emit('ADD_MOVE', moveData);
            lastMoveData = {
                ...moveData,
                socketID: socket.id
            };
            if (output === 1) {
                socket.emit('GAME_WON', {
                    type: 'GOAL_REACHED',
                    message: ''
                });
                socket.broadcast.emit('GAME_LOST', {
                    type: 'OPPONENT_WON',
                    message: `${data.playerName} won the game`
                });
            }
        } else {
            socket.emit('GAME_LOST', gameLost);
            socket.broadcast.emit('GAME_WON', {
                type: 'WRONG_INPUT_BY_OPPONENT',
                message: `${data.playerName} entered a wrong input`
            });
        }
    });

    socket.on('disconnect', () => {
        players = players.filter((player) => {
            return player.socketID !== socket.id;
        });
        lastMoveData = null;
        io.emit('OPPONENT_DISCONNECTED');
        console.log('Disconnected. Remaining players: ', players.map(player => player.name))
    });
});

function getResult (input) {
    const lastOuput = lastMoveData ? lastMoveData.output : startingNumber;
    const output = (input + lastOuput) / 3;
    const equation = `[(${input} + ${lastOuput}) / ${DIVIDE_BY}] = ${output}`;
    let gameLost = null;
    if ((input+lastOuput) % 3 !== 0) {
        gameLost = {
            type: 'WRONG_INPUT',
            message: `${input + lastOuput} is not divisible by ${DIVIDE_BY}`
        };
    }
    return {output, equation, gameLost};
}

http.listen(3000, () => {
    console.log('Listening on port 3000');
});


