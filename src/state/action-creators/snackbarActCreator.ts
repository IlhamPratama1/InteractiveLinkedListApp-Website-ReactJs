import { Dispatch } from "react";
import { ActionType } from "../action-types";
import { SnackbarAction } from "../actions";

export const OpenSnackbar = (message: string, type: number) => {
    return (dispatch: Dispatch<SnackbarAction>) => {
        dispatch({
            type: ActionType.OPENSNACKBAR,
            payload: {
                message: message,
                type: type
            }
        });
    };
}