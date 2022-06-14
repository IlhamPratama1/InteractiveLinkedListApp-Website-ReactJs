import { AnimStateInterface } from "../../interface";
import { ActionType } from "../action-types";
import { AnimAction } from "../actions";

const initialState: AnimStateInterface = {
    index: -1,
    type: '',
    callback: () => {}
};

// Create New Reducer
const animReducer = (state: AnimStateInterface = initialState, action: AnimAction) => {
    switch (action.type) {
        case ActionType.SETANIMATION:
            return state = {
                index : action.payload.index,
                type: action.payload.type,
                callback: action.payload.callback
            };
        case ActionType.RESETANIMATION:
            return state = initialState
        default:
            return state;
    }
}

export default animReducer;