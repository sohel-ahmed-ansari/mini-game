import * as actionTypes from '../constants/ActionTypes'

export const sendMove = (input, playerID) => ({
	type: actionTypes.SEND_MOVE,
	input,
	playerID
})
