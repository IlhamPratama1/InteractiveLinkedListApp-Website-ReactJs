import { ProfileStateInterface } from "../../interface";
import { ActionType } from "../action-types";

interface SetProfileAction {
    type: ActionType.SETPROFILE,
    payload: ProfileStateInterface
}

export type ProfileAction = SetProfileAction;