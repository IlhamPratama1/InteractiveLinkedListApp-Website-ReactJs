import { Dispatch } from "react";
import { ListAction } from "../actions";
import { ActionType } from "../action-types";

export const SetProjectType = (projectType: string) => {
    return (dispatch: Dispatch<ListAction>) => {
        dispatch({
            type: ActionType.SETTYPE,
            payload: projectType
        })
    }
}