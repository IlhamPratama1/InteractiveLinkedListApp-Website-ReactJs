import { ActionType } from '../action-types';

interface LoginAction {
    type: ActionType.LOGIN,
    payload: string | null
}

interface LogoutAction {
    type: ActionType.LOGOUT,
    payload?: string | null
}

export type AuthAction = LoginAction | LogoutAction ;