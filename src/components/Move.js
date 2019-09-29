import React from 'react';

const Move = ({playerName, input, equation, output}) => (
    <div>
        <div>{playerName}</div>
        <div>
            <div>Input: {input}</div>
            <div>Equation: {equation}</div>
            <div>Output: {output}</div>
        </div>
        <br/>
    </div>
);

export default Move;