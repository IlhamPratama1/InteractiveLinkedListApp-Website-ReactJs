import { combineReducers } from "redux";
import authReducer from "./authReducer";
import codeReducer from "./codeReducer";
import nodeReducer from "./nodeReducer";
import structReducer from "./structReducer";
import toolReducer from "./toolReducer";
import typeReducer from "./typeReducer";

// To Combine All Reducers
const reducers = combineReducers({
    auth: authReducer,
    struct: structReducer,
    projectType: typeReducer,
    code: codeReducer,
    node: nodeReducer,
    tool: toolReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>