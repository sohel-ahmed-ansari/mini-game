import {SET_STARTING_NUMBER, UPDATE_GAME_STATUS} from '../constants/ActionTypes';
import {GAME_ENTER_NAME} from '../constants/GameStatus';

const playerInfo = (state = '', action) => {
    switch (action.type) {
        case SET_STARTING_NUMBER:
            return action.startingNumber;
        case UPDATE_GAME_STATUS:
            if (action.name === GAME_ENTER_NAME) {
                return '';
            }
            return state;
        default:
            return state;
    }
};

export default playerInfo;