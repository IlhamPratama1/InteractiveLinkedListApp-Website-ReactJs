import { CodeStateInterface } from "../../interface";
import { ActionType } from "../action-types";

interface SetCodeLogOperation {
    type: ActionType.SETCODELOGOPERATION,
    payload: CodeStateInterface
}

interface SetLastOperation {
    type: ActionType.SETLASTOPERATION,
    payload: string
}

interface SetSearchLog {
    type: ActionType.SETSEARCHLOG,
    payload: Array<string>
}

interface ResetCodeAction {
    type: ActionType.RESETCODE
}

export type CodeAction = SetCodeLogOperation | SetLastOperation | SetSearchLog | ResetCodeAction;