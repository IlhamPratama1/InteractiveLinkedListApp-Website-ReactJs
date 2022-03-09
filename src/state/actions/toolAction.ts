import { ActionType } from "../action-types";

interface OpenNodeAction {
    type: ActionType.OPENNODEINDEX,
    payload: number
}

interface EditNodeAction {
    type: ActionType.EDITNODEINDEX,
    payload: number
}

interface OpenToolAction {
    type: ActionType.OPENTOOLINDEX,
    payload: number
}

interface CloseDetailNode {
    type: ActionType.CLOSEDETAILINDEX
}

interface SetDisabledPinch {
    type: ActionType.SETDISABLEDPINCH,
    payload: boolean
}

export type ToolAction = OpenNodeAction | EditNodeAction | OpenToolAction | CloseDetailNode | SetDisabledPinch;