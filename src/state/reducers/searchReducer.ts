import { ActionType } from "../action-types";
import { SearchAction } from "../actions";
const searchReducer = (state: number = -1, action: SearchAction) => {
    switch (action.type) {
        case ActionType.SETSEARCHRESULT:
            return state = action.payload;
        case ActionType.RESETSEARCHRESULT:
            return state = -1;
        default:
            return state;
    };
}

export default searchReducer;