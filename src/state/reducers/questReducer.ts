import { QuestStateInterface } from "../../interface";
import { ActionType } from "../action-types";
import { QuestAction } from "../actions";

const questReducer = (state: Array<QuestStateInterface> = [], action: QuestAction) => {
    switch (action.type) {
        case ActionType.SETQUESTDATA:
            return state = action.payload;
        case ActionType.SETQUESTCOMPLETE:
            state.forEach(quest => {
                if (quest.id === action.payload)
                    quest.isComplete = true;
            });
            return state;
        default:
            return state;
    }
}

export default questReducer;