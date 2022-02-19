import { ActionType } from "../action-types";

interface SetSearchResult {
    type: ActionType.SETSEARCHRESULT,
    payload: number
}

interface ResetSearchResult {
    type: ActionType.RESETSEARCHRESULT
}

export type SearchAction = SetSearchResult | ResetSearchResult;