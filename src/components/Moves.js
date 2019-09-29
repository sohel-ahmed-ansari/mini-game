import React from 'react';
import { connect } from 'react-redux';

import Move from './Move';

const Moves = ({ moves, startingNumber }) => (
    <div className="moves">
        <div className="starting-number">
            <div className="game-number">{startingNumber}</div>
        </div>
        {moves.map(move => (
            <Move
                key={move.id}
                {...move}
            />
        ))}
    </div>
);

const mapStateToProps = state => ({
    moves: state.moves,
    startingNumber: state.startingNumber
});

export default connect(mapStateToProps, {})(Moves);