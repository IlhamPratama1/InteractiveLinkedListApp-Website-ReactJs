import { StructFormInterface, StructStateInterface } from "../../interface";
import { ActionType } from "../action-types";

interface SetStructAction {
    type: ActionType.SETSTRUCT,
    payload: StructStateInterface
}

interface StructNameAction {
    type: ActionType.SETSTRUCTNAME,
    payload: string
}

interface StructDataAction {
    type: ActionType.SETSTRUCTDATA,
    payload: Array<StructFormInterface>
}

export type StructAction = SetStructAction | StructNameAction | StructDataAction;