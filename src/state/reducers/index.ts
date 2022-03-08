import { combineReducers } from "redux";
import authReducer from "./authReducer";
import codeReducer from "./codeReducer";
import nodeReducer from "./nodeReducer";
import profileReducer from "./profileReducer";
import questReducer from "./questReducer";
import searchReducer from "./searchReducer";
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
    tool: toolReducer,
    search: searchReducer,
    quest: questReducer,
    profile: profileReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>