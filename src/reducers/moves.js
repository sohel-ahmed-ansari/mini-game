import {ADD_MOVE} from '../constants/ActionTypes';

let moveID = 0;

const moves = (state = [], action) => {
    switch (action.type) {
        case ADD_MOVE:
            return state.concat([{
                moveID: moveID++,
                playerID: action.playerID,
                playerName: action.playerName,
                input: action.input,
                equation: action.equation,
                output: action.input
            }]);
        default:
            return state;
    }
};

export default moves;