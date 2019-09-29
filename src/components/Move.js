import React from 'react';
import {connect} from 'react-redux';

import PlayerPhoto from './PlayerPhoto';

const Move = ({ input, equation, output, playerID, currentPlayerID }) => (
    <div className={`move ${playerID !== currentPlayerID ? 'opponent-move' : ''}`}>
        <PlayerPhoto />
        <div className="move-info">
            <div className="game-number">{input}</div>
            <div className="equation">{equation}</div>
            <div className="equation">{output}</div>
        </div>
    </div>
);

const mapStateToProps = state => ({
    currentPlayerID: state.playerInfo.id,
});

export default connect(mapStateToProps, {})(Move);