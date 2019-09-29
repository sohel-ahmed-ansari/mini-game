import React from 'react';
import { connect } from 'react-redux';

import {
    GAME_ENTER_NAME,
    GAME_WON,
    GAME_LOST,
    GAME_WAITING,
    GAME_ROOM_FULL
} from '../constants/GameStatus';
import { joinGame } from '../actions';

class GameStatus extends React.Component {
    render() {
        let input;
        switch (this.props.name) {
            case GAME_ENTER_NAME:
                return (
                    <div className="game-status">
                        <div className="enter-name">Enter your name</div>
                        <input maxLength="15" ref={(node) => {
                            input = node;
                        }}></input>
                        <button onClick={() => this.props.joinGame(input.value)}>Start</button>
                    </div>
                );
            case GAME_WAITING:
                return (
                    <div className="game-status">
                        <div className="please-wait">Waiting for one more player to join</div>
                    </div>
                );
            case GAME_WON:
                return (
                    <div className="game-status">YOU WIN!!!</div>
                );
            case GAME_LOST:
                return (
                    <div className="game-status">OOPS!! YOU LOST</div>
                );
            case GAME_ROOM_FULL:
                return (
                    <div className="game-status">Room is full. Please try again later</div>
                );
            default:
                return (
                    <div className="game-status">Some error occured</div>
                );
        }
    }
}

const mapStateToProps = (state) => ({
    name: state.gameStatus.name,
    result: state.gameStatus.result
});

const mapDispatchToProps = (dispatch) => ({
    joinGame: (playerName) => dispatch(joinGame(playerName))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameStatus);