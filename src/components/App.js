import React from 'react';
import { connect } from 'react-redux';

import PlayerInfo from './PlayerInfo';
import Gameplay from './Gameplay';
import GameStatus from './GameStatus';
import { GAME_STARTED } from '../constants/GameStatus';

const App = ({ hasGameStarted }) => (
    <div className="app">
        <PlayerInfo />
        {hasGameStarted ? (<Gameplay />) : (<GameStatus />
        )}
    </div>
);

const mapStateToProps = (state) => ({
    hasGameStarted: state.gameStatus.name === GAME_STARTED
});

export default connect(mapStateToProps, {})(App);