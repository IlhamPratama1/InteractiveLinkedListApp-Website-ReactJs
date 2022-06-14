import { ActionType } from "../action-types";
import { NodeAction } from "../actions";

const nodeReducer = (state: Array<any> = [], action: NodeAction) => {
    switch (action.type) {
        case ActionType.SETNODE:
            return state = action.payload;
        case ActionType.RESETNODE:
            return state = [];
        default:
            return state;
    };
}

export default nodeReducer;