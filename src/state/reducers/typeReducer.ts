import { ActionType } from "../action-types";
import { ListAction } from "../actions";

const typeReducer = (state: string = '', action: ListAction) => {
    switch (action.type) {
        case ActionType.SETTYPE:
            return state = action.payload;
        default:
            return state;
    }
}

export default typeReducer;