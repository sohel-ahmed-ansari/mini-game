import {UPDATE_GAME_STATUS} from '../constants/ActionTypes';
import {GAME_ENTER_NAME} from '../constants/GameStatus';

const defaultStatus = {
    name: GAME_ENTER_NAME,
    result: {}
};

const playerInfo = (state = defaultStatus, action) => {
    switch (action.type) {
        case UPDATE_GAME_STATUS:
            return {
                name: action.name,
                result: {...action.result}
            };
        default:
            return state;
    }
};

export default playerInfo;