import React from 'react';
import {connect} from 'react-redux';

const PlayerInfo = ({playerInfo}) => (
    <div>{playerInfo.name}</div>
);

const mapStateToProps = state => ({
    playerInfo: state.playerInfo
});

export default connect(mapStateToProps, {})(PlayerInfo);