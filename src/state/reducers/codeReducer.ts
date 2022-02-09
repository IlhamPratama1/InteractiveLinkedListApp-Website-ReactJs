import { ActionType } from "../action-types";
import { CodeStateInterface } from "../../interface";
import { CodeAction } from "../actions/codeAction";

const initialState: CodeStateInterface = {
    id: 0,
    code: '',
    operation: [],
    log: []
}

const codeReducer = (state: CodeStateInterface = initialState, action: CodeAction) => {
    switch (action.type) {
        case ActionType.SETCODELOGOPERATION:
            return state = action.payload;
        case ActionType.SETCODE:
            return state = {
                ...state,
                code: action.payload
            };
        case ActionType.SETLOGOPERATION:
            return state = {
                ...state,
                operation: action.payload.operation,
                log: action.payload.log
            };
        case ActionType.SETLOG:
            return state = {
                ...state,
                log: action.payload
            };
        case ActionType.SETOPERATION:
            return state = {
                ...state,
                log: action.payload
            };
        default:
            return state;
    }
}

export default codeReducer;