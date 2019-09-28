import POPULATE_PLAYER_INFO from '../constants/ActionTypes';

const playerInfo = (state = {}, action) => {
    switch (action.type) {
        case POPULATE_PLAYER_INFO:
            return {
                name: action.name,
                id: action.id
            };
        default:
            return state;
    }
};

export default playerInfo;