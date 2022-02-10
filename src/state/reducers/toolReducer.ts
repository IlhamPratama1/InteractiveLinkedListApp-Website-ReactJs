import { ToolStateInterface } from "../../interface"
import { ActionType } from "../action-types"
import { ToolAction } from "../actions/toolAction"

const initialState: ToolStateInterface = {
    toolIndex: 0,
    nodeIndex: 0,
    editIndex: 0
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
        default:
            return state;
    }
}

export default toolReducer;