import React from 'react';

const Move = ({playerName, value}) => (
    <div>
        <div>{playerName}</div>
        <div>
            <div>{input}</div>
            <div>{equation}</div>
            <div>{output}</div>
        </div>
    </div>
);

export default Move;