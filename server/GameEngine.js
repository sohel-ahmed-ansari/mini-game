const uuid = require('uuid/v1');

class GameEngine {
    constructor ({io, maxPlayers = 2, maxStartingNumber = 100, divideBy = 3}) {
        this.io = io;
        this.maxPlayers = maxPlayers;
        this.maxStartingNumber = maxStartingNumber;
        this.divideBy = divideBy;
        this.players = [];
        this.startingNumber = null;
        this.lastMoveData = null;
    }

    start () {
        this.io.on('connection', (socket) => {
            socket.on('JOIN_GAME', (data) => {
                this.onJoinGame(socket, data)
            });
            socket.on('ADD_MOVE', (data) => {
                this.onAddGame(socket, data);
            });
            socket.on('disconnect', () => {
                this.onDisconnect(socket);
            });
        });
    }

    onJoinGame(socket, data) {
        if (this.players.length >= this.maxPlayers) {
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
        this.players.push(playerInfo);

        console.log(playerInfo.name + ' has connected to the game');
        console.log('Connected players: ', this.players.map(player => player.name));

        if (this.players.length === this.maxPlayers) {
            this.startingNumber = this.generateStartingNumber();
            this.io.emit('GAME_STARTED', {
                startingNumber: this.startingNumber,
                startingPlayer: this.players[0].id
            });

            console.log('game has started between: ', this.players.map(player => player.name));
        }
    }

    onAddGame(socket, data) {
        //if same player sending move more than once in a row, reject it
        if (this.lastMoveData && socket.id === this.lastMoveData.socketID) {
            return;
        }
        const {equation, output, gameLost} = this.getResult(data.input);
        if (!gameLost) {
            const moveData = {
                playerName: data.playerName,
                playerID: data.playerID,
                input: data.input,
                equation,
                output
            };
            this.io.emit('ADD_MOVE', moveData);
            this.lastMoveData = {
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
    }

    onDisconnect(socket) {
        const index = this.players.findIndex((player) => {
            return player.socketID === socket.id;
        });
        if (index === -1) {
            return;
        }
        this.players.splice(index, 1);
        this.lastMoveData = null;
        this.io.emit('OPPONENT_DISCONNECTED');
        console.log('Disconnected. Remaining players: ', this.players.map(player => player.name));
    }

    generateStartingNumber() {
        return Math.round((Math.random() * (this.maxStartingNumber - this.divideBy)) + this.divideBy);
    }

    getResult(input) {
        const lastOuput = this.lastMoveData ? this.lastMoveData.output : this.startingNumber;
        const output = (input + lastOuput) / 3;
        const equation = `[(${input} + ${lastOuput}) / ${this.divideBy}] = ${output}`;
        let gameLost = null;
        if ((input+lastOuput) % 3 !== 0) {
            gameLost = {
                type: 'WRONG_INPUT',
                message: `${input + lastOuput} is not divisible by ${this.divideBy}`
            };
        }
        return {output, equation, gameLost};
    }
}

module.exports = GameEngine;