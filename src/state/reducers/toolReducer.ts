import { ToolStateInterface } from "../../interface"
import { ActionType } from "../action-types"
import { ToolAction } from "../actions"

const initialState: ToolStateInterface = {
    toolIndex: -1,
    nodeIndex: -1,
    editIndex: -1
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
                toolIndex: action.payload
            };
        case ActionType.CLOSEDETAILINDEX:
            return state = {
                ...state,
                nodeIndex: -1,
                editIndex: -1
            }
        default:
            return state;
    }
}

export default toolReducer;