import {ADD_MOVE, UPDATE_GAME_STATUS} from '../constants/ActionTypes';
import {GAME_STARTED, GAME_WAITING} from '../constants/GameStatus';

const moves = (state = [], action) => {
    switch (action.type) {
        case ADD_MOVE:
            return state.concat([{
                id: action.id,
                playerID: action.playerID,
                playerName: action.playerName,
                input: action.input,
                equation: action.equation,
                output: action.output
            }]);
        case UPDATE_GAME_STATUS:
            if ([GAME_STARTED, GAME_WAITING].includes(action.name)) {
                return [];
            }
            return state;
        default:
            return state;
    }
};

export default moves;