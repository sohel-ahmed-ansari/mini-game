import React from 'react';
import { connect } from 'react-redux';

import Move from './Move';

class Moves extends React.Component {
    render() {
        return (
            <div className="moves" ref={(c) => this.component = c}>
                <div className="starting-number">
                    <div className="game-number">{this.props.startingNumber}</div>
                </div>
                {this.props.moves.map(move => (
                    <Move
                        key={move.id}
                        {...move}
                    />
                ))}
            </div>
        );
    }

    componentDidUpdate() {
        this.component.scrollTop = this.component.scrollHeight; 
    }
}

const mapStateToProps = state => ({
    moves: state.moves,
    startingNumber: state.startingNumber
});

export default connect(mapStateToProps, {})(Moves);