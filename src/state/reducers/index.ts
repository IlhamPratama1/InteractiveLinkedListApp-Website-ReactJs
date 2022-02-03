import { combineReducers } from "redux";
import authReducer from "./authReducer";

// To Combine All Reducers
const reducers = combineReducers({
    auth: authReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>