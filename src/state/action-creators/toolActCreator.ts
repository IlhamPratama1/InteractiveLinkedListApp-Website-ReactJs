import { Dispatch } from "react"
import { ActionType } from "../action-types"
import { ToolAction } from "../actions"

export const OpenToolIndex = (index: number) => {
    return (dispatch: Dispatch<ToolAction>) => {
        dispatch({
            type: ActionType.OPENTOOLINDEX,
            payload: index
        });
    }
}

export const OpenEditNodeIndex = (index: number) => {
    return (dispatch: Dispatch<ToolAction>) => {
        dispatch({
            type: ActionType.EDITNODEINDEX,
            payload: index
        });
    }
}

export const OpenNodeIndex = (index: number) => {
    return (dispatch: Dispatch<ToolAction>) => {
        dispatch({
            type: ActionType.OPENNODEINDEX,
            payload: index
        });
    }
}

export const CloseNode = () => {
    return (dispatch: Dispatch<ToolAction>) => {
        dispatch({
            type: ActionType.OPENNODEINDEX,
            payload: -1
        });
    }
}

export const CloseDetailNode = () => {
    return (dispatch: Dispatch<ToolAction>) => {
        dispatch({
            type: ActionType.CLOSEDETAILINDEX
        });
    }
}

export const CloseTool = () => {
    return (dispatch: Dispatch<ToolAction>) => {
        dispatch({
            type: ActionType.OPENTOOLINDEX,
            payload: -1
        });
    }
}

export const SetDisabledPinch = (value: boolean) => {
    return (dispatch: Dispatch<ToolAction>) => {
        dispatch({
            type: ActionType.SETDISABLEDPINCH,
            payload: value
        });
    }
}