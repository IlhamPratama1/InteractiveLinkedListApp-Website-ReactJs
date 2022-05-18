import { Dispatch } from "react";
import { State } from "..";
import { UpdateQuest } from "../../api/questRequest";
import { QuestStateInterface } from "../../interface";
import { ActionType } from "../action-types";
import { QuestAction } from "../actions";

export const SetQuestData = (questData: Array<QuestStateInterface>) => {
    return (dispatch: Dispatch<QuestAction>) => {
        dispatch({
            type: ActionType.SETQUESTDATA,
            payload: questData
        });
    };
}

export const SetQuestComplete = (tool: string, type: string) => {
    return (dispatch: Dispatch<QuestAction>, getState: () => State) => {
        const quests: Array<QuestStateInterface> = getState().quest;
        quests.forEach(data => {
            if (!data.isComplete && data.quest.tool === tool && data.quest.type === type) {
                dispatch({
                    type: ActionType.SETQUESTCOMPLETE,
                    payload: data.id
                });
                UpdateQuest(data.id, true);
            }
        });
    };
}