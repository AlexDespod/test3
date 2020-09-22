const { combineReducers } = require("redux");
const { websocketReducer } = require("../reducers/websocketReducer");

export const rootReduser = combineReducers({
    connection:websocketReducer
})
