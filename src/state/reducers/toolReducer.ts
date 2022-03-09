import { ToolStateInterface } from "../../interface"
import { ActionType } from "../action-types"
import { ToolAction } from "../actions"

const initialState: ToolStateInterface = {
    toolIndex: -1,
    nodeIndex: -1,
    editIndex: -1,
    disabledPinch: false
}

const toolReducer = (state: ToolStateInterface = initialState, action: ToolAction) => {
    switch (action.type) {
        case ActionType.OPENNODEINDEX:
            return state = {
                ...state,
                nodeIndex: action.payload
            };
        case ActionType.OPENTOOLINDEX:
            return state = {
                ...state,
                toolIndex: action.payload
            };
        case ActionType.EDITNODEINDEX:
            return state = {
                ...state,
                nodeIndex: action.payload,
                editIndex: action.payload
            };
        case ActionType.CLOSEDETAILINDEX:
            return state = {
                ...state,
                nodeIndex: -1,
                editIndex: -1
            };
        case ActionType.SETDISABLEDPINCH:
            return state = {
                ...state,
                disabledPinch: action.payload
            };
        default:
            return state;
    }
}

export default toolReducer;