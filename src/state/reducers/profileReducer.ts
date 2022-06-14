import { ActionType } from "../action-types";
import { ProfileStateInterface } from "../../interface";
import { ProfileAction } from "../actions";

const initialState: ProfileStateInterface = {
    username: '',
    email: ''
}

const profileReducer = (state: ProfileStateInterface = initialState, action: ProfileAction) => {
    switch (action.type) {
        case ActionType.SETPROFILE:
            return state = action.payload;
        default:
            return state;
    }
}

export default profileReducer;