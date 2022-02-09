import { Dispatch } from "react"
import { ActionType } from "../action-types"
import { CodeAction } from "../actions/codeAction"

export const SetCode = (code: string, ) => {
    return (dispatch: Dispatch<CodeAction>) => {
        dispatch({
            type: ActionType.SETCODE,
            payload: code
        });
    };
}

export const SetOperationLog = (operation: Array<string>, log: Array<string>) => {
    return (dispatch: Dispatch<CodeAction>) => {
        dispatch({
            type: ActionType.SETLOGOPERATION,
            payload: {
                operation: operation,
                log: log
            }
        });
    };
}