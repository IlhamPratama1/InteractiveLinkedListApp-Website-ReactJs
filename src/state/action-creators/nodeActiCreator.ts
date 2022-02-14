import { Dispatch } from "react";
import { ActionType } from "../action-types";
import { NodeAction } from "../actions";

export const SetNodeData = (nodeData: Array<any>) => {
    return (dispatch: Dispatch<NodeAction>) => {
        dispatch({
            type: ActionType.SETNODE,
            payload: nodeData
        });
    };
}

export const ResetNode = () => {
    return (dispatch: Dispatch<NodeAction>) => {
        dispatch({
            type: ActionType.RESETNODE
        });
    }
}