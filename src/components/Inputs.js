import React from 'react';
import {connect} from 'react-redux';

import {sendMove} from '../actions'

const Inputs = ({disabled, sendMove}) => {
    return (<div>
        <button disabled={disabled} onClick={() => sendMove(-1)}>-1</button>
        <button disabled={disabled} onClick={() => sendMove(0)}>0</button>
        <button disabled={disabled} onClick={() => sendMove(1)}>1</button>
    </div>);
};

const mapStateToProps = (state) => ({
    disabled: !state.inputsEnabled
});

const mapDispatchToProps = (dispatch) => ({
    sendMove: (input) => dispatch(sendMove(input))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Inputs);