import {JOIN_GAME, DISCONNECT, ADD_MOVE, SEND_MOVE, PLAYER_JOINED} from '../constants/ActionTypes';

const socketMiddleware = () => {
    let socket = null;
    return store => next => action => {
        const dispatch = store.dispatch;
        switch (action.type) {
            case JOIN_GAME:
                if (socket !== null) {
                    socket.close();
                }
                socket = new WebSocket('ws://localhost:8989');
                socket.onopen = () => {
                    socket.send(JSON.stringify({
                        type: JOIN_GAME,
                        name: action.playerName
                    }));
                };
                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    switch (data.type) {
                        case ADD_MOVE:
                            dispatch();
                            break;
                        case PLAYER_JOINED:
                            dispatch();
                            break;
                        default:
                            break;
                    }
                }
                break;
            case SEND_MOVE:
                socket.send(JSON.stringify({ type: ADD_MOVE, ...action}));
                break;
            case DISCONNECT:
                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                break;
            default:
                return next(action);
        }
    };
};

export default socketMiddleware();