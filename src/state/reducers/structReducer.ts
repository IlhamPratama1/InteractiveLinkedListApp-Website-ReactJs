import { StructStateInterface } from "../../interface";
import { StructAction } from "../actions";
import { ActionType } from "../action-types";

const initialState: StructStateInterface = {
    listId: 0,
    structName: '',
    structData: []
}

const structReducer = (state: StructStateInterface = initialState, action: StructAction) => {
    switch (action.type) {
        case ActionType.SETSTRUCT:
            return state = {
                listId: action.payload.listId,
                structName: action.payload.structName,
                structData: action.payload.structData
            };
        case ActionType.SETSTRUCTDATA:
            return state = {
                ...state,
                structData: action.payload
            };
        case ActionType.SETSTRUCTNAME:
            return state = {
                ...state,
                structName: action.payload
            };
        case ActionType.RESETSTRUCTDATA:
            return state = initialState;
        default:
            return state;
    }
}

export default structReducer;