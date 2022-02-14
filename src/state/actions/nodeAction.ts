import { ActionType } from "../action-types";

interface SetNodeAction {
    type: ActionType.SETNODE,
    payload: Array<any>
}

interface ResetNodeAction {
    type: ActionType.RESETNODE
}

export type NodeAction = SetNodeAction | ResetNodeAction;