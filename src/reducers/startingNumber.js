import {SET_STARTING_NUMBER} from '../constants/ActionTypes';

const playerInfo = (state = '', action) => {
    switch (action.type) {
        case SET_STARTING_NUMBER:
            return action.startingNumber;
        default:
            return state;
    }
};

export default playerInfo;