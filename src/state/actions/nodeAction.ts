import { ActionType } from "../action-types";

interface SetNodeAction {
    type: ActionType.SETNODE,
    payload: Array<any>
}

export type NodeAction = SetNodeAction