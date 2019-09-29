import {combineReducers} from 'redux';

import gameStatus from './gameStatus';
import playerInfo from './playerInfo';
import startingNumber from './startingNumber';
import moves from './moves';
import inputsEnabled from './inputsEnabled';

export default combineReducers({
    gameStatus,
    playerInfo,
    startingNumber,
    moves,
    inputsEnabled
});