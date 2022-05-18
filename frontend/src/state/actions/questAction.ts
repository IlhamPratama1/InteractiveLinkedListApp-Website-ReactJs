import { QuestStateInterface } from "../../interface";
import { ActionType } from "../action-types";

interface SetQuestData {
    type: ActionType.SETQUESTDATA,
    payload: Array<QuestStateInterface>
}

interface SetQuestComplete {
    type: ActionType.SETQUESTCOMPLETE,
    payload: number
}

export type QuestAction = SetQuestData | SetQuestComplete;