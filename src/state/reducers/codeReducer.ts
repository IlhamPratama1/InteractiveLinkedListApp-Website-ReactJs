import { ActionType } from "../action-types";
import { CodeStateInterface } from "../../interface";
import { CodeAction } from "../actions";

const initialState: CodeStateInterface = {
    id: 0,
    code: '',
    operation: [],
    log: [],
    lastOperation: '',
    searchLog: []
}

const codeReducer = (state: CodeStateInterface = initialState, action: CodeAction) => {
    switch (action.type) {
        case ActionType.SETCODELOGOPERATION:
            return state = action.payload;
        case ActionType.SETSEARCHLOG:
            return state = {
                ...state,
                searchLog: action.payload
            };
        case ActionType.SETLASTOPERATION:
            return state = {
                ...state,
                lastOperation: action.payload
            };
        case ActionType.RESETCODE:
            return state = initialState;
        default:
            return state;
    }
}

export default codeReducer;