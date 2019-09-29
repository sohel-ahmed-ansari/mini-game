import React from 'react';
import { connect } from 'react-redux';

import { sendMove } from '../actions'

const Inputs = ({ disabled, sendMove }) => {
    return (
        <div className="inputs">
            <div className={`game-number ${disabled ? 'disabled' : ''}`} onClick={() => sendMove(-1)}>-1</div>
            <div className={`game-number ${disabled ? 'disabled' : ''}`} onClick={() => sendMove(0)}>0</div>
            <div className={`game-number ${disabled ? 'disabled' : ''}`} onClick={() => sendMove(1)}>1</div>
        </div>
    );
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