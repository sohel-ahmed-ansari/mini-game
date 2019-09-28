import React from 'react';
import {sendMove} from '../actions'

const Inputs = ({dispatch}) => (
    <div>
        <button onClick={dispatch(-1)}>-1</button>
        <button onClick={dispatch(0)}>0</button>
        <button onClick={dispatch(1)}>1</button>
    </div>
);

const mapDispatchToProps = (dispatch, getState) => ({
    dispatch: (input) => dispatch(sendMove(input, getState().playerInfo.id))
});

export default connect(
    () => {},
    mapDispatchToProps
)(Inputs);