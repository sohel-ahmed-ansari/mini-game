import React from 'react';
import TopBar from './PlayerInfo';
import Moves from './Moves';
import Inputs from './Inputs';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <TopBar/>
                <Moves/>
                <Inputs/>
            </div>
        );
    }
}

export default App;