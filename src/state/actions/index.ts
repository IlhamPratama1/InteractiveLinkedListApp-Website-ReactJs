import { ActionType } from '../action-types';

interface LoginAction {
    type: ActionType.LOGIN,
    payload: string
}

interface LogoutAction {
    type: ActionType.LOGOUT,
    payload: string
}

export type AuthAction = LoginAction | LogoutAction ;