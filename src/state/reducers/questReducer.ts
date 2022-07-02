import { QuestStateInterface } from "../../interface";
import { ActionType } from "../action-types";
import { QuestAction } from "../actions";

const questReducer = (state: Array<QuestStateInterface> = [], action: QuestAction) => {
    switch (action.type) {
        case ActionType.SETQUESTDATA:
            return state = action.payload;
        case ActionType.SETQUESTCOMPLETE:
            const result = state.map((data) => data.id === action.payload ? {...data, isComplete: true } : data);
            return state = result;
        default:
            return state;
    }
}

export default questReducer;