import { ActionType } from '../action-types';

interface SetAnimAction {
    type: ActionType.SETANIMATION,
    payload: {
        index: number,
        type: string,
        callback: Function
    }
}

interface ResetAnimAction {
    type: ActionType.RESETANIMATION,
}

export type AnimAction = SetAnimAction | ResetAnimAction ;