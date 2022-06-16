import { Dispatch } from "react";
import { StructAction } from "../actions";
import { ActionType } from "../action-types";
import { StructFormInterface } from "../../interface";

export const SetStructName = (structName: string) => {
    return (dispatch: Dispatch<StructAction>) => {
        dispatch({
            type: ActionType.SETSTRUCTNAME,
            payload: structName
        });
    };
}

export const SetStructData = (structData: Array<StructFormInterface>) => {
    return (dispatch: Dispatch<StructAction>) => {
        dispatch({
            type: ActionType.SETSTRUCTDATA,
            payload: structData
        });
    };
}

export const ResetStructData = () => {
    return (dispatch: Dispatch<StructAction>) => {
        dispatch({
            type: ActionType.RESETSTRUCTDATA
        });
    };
}