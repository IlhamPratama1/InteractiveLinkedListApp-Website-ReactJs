import { ActionType } from "../action-types"
import { Dispatch } from "redux";
import { AuthAction } from "../actions";

export const LoginUser = (token: string) => {
    return (dispatch: Dispatch<AuthAction>) => {
        dispatch({
            type : ActionType.LOGIN,
            payload : token
        });
    };
}

export const LogoutUser = (token: string) => {
    return (dispatch: Dispatch<AuthAction>) => {
        dispatch({
            type: ActionType.LOGOUT,
            payload: token
        });
    };
}