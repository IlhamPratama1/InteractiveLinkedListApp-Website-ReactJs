import { ActionType } from "../action-types";
import { AuthAction } from "../actions"
import { UserInitialStateInterface } from "../interface";

const userToken = localStorage.getItem('access_token');

const initialState: UserInitialStateInterface = {
    loggedIn : userToken ? true : false,
    token : userToken ? userToken : null
}

const authReducer = (state: UserInitialStateInterface = initialState, action: AuthAction) => {
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