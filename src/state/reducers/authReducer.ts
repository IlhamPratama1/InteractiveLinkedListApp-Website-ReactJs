import { ActionType } from "../action-types";
import { AuthAction } from "../actions"
import { UserStateInterface } from "../../interface";

const userToken = localStorage.getItem('access_token');

// Create initial state
// Check if token exist
const initialState: UserStateInterface = {
    loggedIn : userToken ? true : false,
    token : userToken ? userToken : null
}

// Create New Reducer
const authReducer = (state: UserStateInterface = initialState, action: AuthAction) => {
    switch (action.type) {
        case ActionType.LOGIN:
            return {
                loggedIn : true,
                token : action.payload
            };
        case ActionType.LOGOUT:
            return {
                loggedIn : false,
                token : null
            };
        default:
            return state;
    }
}

export default authReducer;