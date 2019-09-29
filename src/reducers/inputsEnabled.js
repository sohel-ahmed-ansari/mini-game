import {ENABLE_INPUTS} from '../constants/ActionTypes';

const inputsEnabled = (state = false, action) => {
    switch (action.type) {
        case ENABLE_INPUTS:
            return action.enable;
        default:
            return state;
    }
};

export default inputsEnabled;