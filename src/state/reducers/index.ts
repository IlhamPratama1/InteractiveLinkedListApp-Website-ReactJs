import { combineReducers } from "redux";
import authReducer from "./authReducer";
import codeReducer from "./codeReducer";
import structReducer from "./structReducer";
import typeReducer from "./typeReducer";

// To Combine All Reducers
const reducers = combineReducers({
    auth: authReducer,
    struct: structReducer,
    projectType: typeReducer,
    code: codeReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>