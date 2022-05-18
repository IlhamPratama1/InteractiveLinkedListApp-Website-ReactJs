import { ActionType } from "../action-types"
import { Dispatch } from "redux";
import { AnimAction } from "../actions";

export const SetAnimation = (index: number, animationType: string, callback: Function) => {
    return (dispatch: Dispatch<AnimAction>) => {
        dispatch({
            type : ActionType.SETANIMATION,
            payload : {
                index: index,
                type: animationType,
                callback: callback
            }
        });
    };
}

export const ResetAnimation = () => {
    return (dispatch: Dispatch<AnimAction>) => {
        dispatch({
            type: ActionType.RESETANIMATION
        });
    };
}