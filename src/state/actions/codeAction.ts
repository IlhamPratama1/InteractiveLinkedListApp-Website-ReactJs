import { CodeStateInterface } from "../../interface";
import { ActionType } from "../action-types";

interface OperationLog {
    operation: Array<string>
    log: Array<string>
}

interface SetCodeLogOperation {
    type: ActionType.SETCODELOGOPERATION,
    payload: CodeStateInterface
}

interface SetCodeAction {
    type: ActionType.SETCODE,
    payload: string
}

interface SetLogAction {
    type: ActionType.SETLOG,
    payload: Array<string>
}

interface SetOperationAction {
    type: ActionType.SETOPERATION,
    payload: Array<string>
}

interface SetLogOperationAction {
    type: ActionType.SETLOGOPERATION,
    payload: OperationLog
}

export type CodeAction = SetCodeLogOperation | SetCodeAction | SetLogOperationAction | SetOperationAction | SetLogAction ;