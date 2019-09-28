import {combineReducers} from 'redux';

import playerInfo from './playerInfo';
import moves from './moves';

export default combineReducers({
    playerInfo,
    moves
});