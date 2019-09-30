import io from 'socket.io-client';

import * as actionTypes from '../constants/ActionTypes';
import {
    addMove,
    populatePlayerInfo,
    disconnect,
    enableInputs,
    updateGameStatus,
    setStartingNumber
} from '../actions';
import {
    GAME_WAITING,
    GAME_STARTED,
    GAME_ROOM_FULL,
    GAME_LOST,
    GAME_WON,
    GAME_ENTER_NAME
} from '../constants/GameStatus';

const socketMiddleware = () => {
    let socket = null;
    return store => next => action => {
        const dispatch = store.dispatch;
        switch (action.type) {
            case actionTypes.JOIN_GAME:
                if (socket) {
                    socket.close();
                }
                socket = new io();

                socket.on('ENTERED_GAME', (data) => {
                    dispatch(populatePlayerInfo(data));
                    dispatch(updateGameStatus({
                        name: GAME_WAITING
                    }));
                });
                socket.on('ROOM_FULL', (data) => {
                    dispatch(updateGameStatus({
                        name: GAME_ROOM_FULL
                    }));
                });
                socket.on('GAME_STARTED', (data) => {
                    dispatch(updateGameStatus({
                        name: GAME_STARTED
                    }));
                    dispatch(setStartingNumber(data.startingNumber));
                    const playerID = store.getState().playerInfo.id;
                    dispatch(enableInputs(playerID === data.startingPlayer));
                });
                socket.on('ADD_MOVE', (data) => {
                    dispatch(addMove(data));
                    const playerID = store.getState().playerInfo.id;
                    dispatch(enableInputs(playerID !== data.playerID));
                });
                socket.on('GAME_LOST', (data) => {
                    dispatch(updateGameStatus({
                        name: GAME_LOST,
                        result: {...data}
                    }));
                });
                socket.on('GAME_WON', (data) => {
                    dispatch(updateGameStatus({
                        name: GAME_WON,
                        result: {...data}
                    }));
                });
                socket.on('OPPONENT_DISCONNECTED', (data) => {
                    const currentStatus = store.getState().gameStatus.name;
                    if (![GAME_LOST, GAME_WON].includes(currentStatus)) {
                        dispatch(updateGameStatus({
                            name: GAME_WAITING,
                        }));
                    }
                });
                socket.on('disconnect', (data) => {
                    const currentStatus = store.getState().gameStatus.name;
                    if (![GAME_LOST, GAME_WON].includes(currentStatus)) {
                        dispatch(updateGameStatus({
                            name: GAME_ENTER_NAME,
                        }));
                    }
                });
                //request server to join game
                socket.emit(actionTypes.JOIN_GAME, {playerName: action.playerName});
                break;

            case actionTypes.SEND_MOVE:
                if (socket) {
                    const {id: playerID, name: playerName} = store.getState().playerInfo;
                    socket.emit(actionTypes.ADD_MOVE, {
                        input: action.input,
                        playerID: playerID,
                        playerName: playerName
                    });
                }
                break;

            case actionTypes.START_NEW_GAME:
                    if (socket) {
                        socket.close();
                    }
                    socket = null;
                    dispatch(updateGameStatus({
                        name: GAME_ENTER_NAME
                    }));
                    break;

            case actionTypes.DISCONNECT:
                if (socket) {
                    socket.close();
                }
                socket = null;
                break;

            default:
                return next(action);
        }
    };
};

export default socketMiddleware();