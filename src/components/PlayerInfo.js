import React from 'react';
import { connect } from 'react-redux';

import PlayerPhoto from './PlayerPhoto';

const PlayerInfo = ({ playerInfo }) => {
    if (!playerInfo.name) {
        return (<div className="player-info"></div>)
    } else {
        return (
            <div className="player-info">
                <PlayerPhoto />
                <div className="info">
                    <div className="name">{playerInfo.name}</div>
                    <div className="sub-title">Win the game or win the job</div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => ({
    playerInfo: state.playerInfo
});

export default connect(mapStateToProps, {})(PlayerInfo);