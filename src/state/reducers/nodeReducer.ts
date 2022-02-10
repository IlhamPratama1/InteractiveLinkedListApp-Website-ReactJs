import { ActionType } from "../action-types";
import { NodeAction } from "../actions";

const nodeReducer = (state: Array<any> = [], action: NodeAction) => {
    switch (action.type) {
        case ActionType.SETNODE:
            return state = action.payload;
        default:
            return state;
    };
}

export default nodeReducer;