import { StructStateInterface } from "../../interface";
import { StructAction } from "../actions/structAction";
import { ActionType } from "../action-types";

const initialState: StructStateInterface = {
    structName: '',
    structData: []
}

const structReducer = (state: StructStateInterface = initialState, action: StructAction) => {
    switch (action.type) {
        case ActionType.SETSTRUCT:
            return state = {
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
        default:
            return state;
    }
}

export default structReducer;