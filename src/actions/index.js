import {
    JOIN_GAME,
    POPULATE_PLAYER_INFO,
    UPDATE_GAME_STATUS,
    ENABLE_INPUTS,
    SET_STARTING_NUMBER,
    DISCONNECT,
    ADD_MOVE,
    SEND_MOVE
} from '../constants/ActionTypes';

let moveID = 0;

export const joinGame = (playerName) => ({
    type: JOIN_GAME,
    playerName
});

export const populatePlayerInfo = (data) => ({
    type: POPULATE_PLAYER_INFO,
    ...data
});

export const updateGameStatus = (data) => ({
    type: UPDATE_GAME_STATUS,
    ...data
});

export const enableInputs = (enable) => ({
    type: ENABLE_INPUTS,
    enable
});

export const setStartingNumber = (startingNumber) => ({
    type: SET_STARTING_NUMBER,
    startingNumber
});

export const disconnect = () => ({
    type: DISCONNECT
});

export const addMove = (data) => ({
    type: ADD_MOVE,
    id: moveID++,
    ...data
});

export const sendMove = (input) => ({
    type: SEND_MOVE,
    input
});