import React from 'react';
import { connect } from 'react-redux';

import Move from './Move';

const Moves = ({ moves, startingNumber }) => (
    <div>
        <div>{startingNumber}</div>
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