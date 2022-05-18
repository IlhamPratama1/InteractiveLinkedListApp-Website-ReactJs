import { ActionType } from "../action-types";

interface SetTypeList {
    type: ActionType.SETTYPE,
    payload: string
}

export type ListAction  = SetTypeList;