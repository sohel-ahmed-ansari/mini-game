import ADD_MOVE from '../constants/ActionTypes'

const moves = (state = [], action) => {
    switch (action.type) {
        case ADD_MOVE:
            return state.concat([{
                playerID: action.playerID,
                playerName: action.playerName,
                value: action.value
            }]);
        default:
            return state;
    }
};

export default moves;