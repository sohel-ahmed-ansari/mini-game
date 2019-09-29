import React from 'react';
import { connect } from 'react-redux';

import TopBar from './PlayerInfo';
import Moves from './Moves';
import Inputs from './Inputs';
import GameStatus from './GameStatus';
import { joinGame } from '../actions';
import { GAME_STARTED } from '../constants/GameStatus';

class App extends React.Component {
    render() {
        if (!this.props.hasGameStarted) {
            return (
                <div className="App">
                    <GameStatus />
                </div>
            );
        } else {
            return (
                <div className="App">
                    <TopBar />
                    <Moves />
                    <Inputs />
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    hasGameStarted: state.gameStatus.name === GAME_STARTED
});

export default connect(mapStateToProps, {})(App);