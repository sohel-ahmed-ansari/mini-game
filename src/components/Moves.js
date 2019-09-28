import React from 'react';
import Move from './Move';

class Moves extends React.Component {
    render() {
        return (
            <div>
                {moves.map(move => (
                    <Move
                        key={move.id}
                        {...move}
                    />
                ))}
            </div>
        );
    }
}

export default Moves;