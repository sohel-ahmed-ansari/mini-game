import React from 'react';
import { connect } from 'react-redux';

import {
    GAME_ENTER_NAME,
    GAME_WON,
    GAME_LOST,
    GAME_WAITING
} from '../constants/GameStatus';
import { joinGame } from '../actions';

class GameStatus extends React.Component {
    render() {
        let input;
        switch (this.props.name) {
            case GAME_ENTER_NAME:
                return (
                    <div>
                        <div>Enter your name:</div>
                        <input maxLength="15" ref={(node) => {
                            input = node;
                        }}></input>
                        <button onClick={() => this.props.joinGame(input.value)}>Play</button>
                    </div>
                );
            case GAME_WAITING:
                return (
                    <div>Please for someone to join.</div>
                );
            case GAME_WON:
                return (
                    <div>YOU WIN!!!</div>
                );
            case GAME_LOST:
                return (
                    <div>OOPS!! YOU LOST</div>
                );
            default:
                return (
                    <div>Error: Incorrect game status</div>
                );
        }
    }
}

const mapStateToProps = (state) => ({
    name: state.gameStatus.name,
    result: state.gameStatus.result
});

const mapDispatchToProps = (dispatch) => ({
    joinGame: (playerName) => {
        console.log(playerName);
        return dispatch(joinGame(playerName));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameStatus);