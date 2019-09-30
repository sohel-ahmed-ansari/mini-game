import {POPULATE_PLAYER_INFO, UPDATE_GAME_STATUS} from '../constants/ActionTypes';
import {GAME_ENTER_NAME} from '../constants/GameStatus';

const playerInfo = (state = {}, action) => {
    switch (action.type) {
        case POPULATE_PLAYER_INFO:
            return {
                name: action.name,
                id: action.id
            };
        case UPDATE_GAME_STATUS:
            if (action.name === GAME_ENTER_NAME) {
                return {};
            }
            return state;
        default:
            return state;
    }
};

export default playerInfo;