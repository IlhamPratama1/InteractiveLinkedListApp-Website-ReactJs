import { Dispatch } from "react";
import { ActionType } from "../action-types";
import { SearchAction } from "../actions";

export const SetSearchResult = (resultIndex: number) => {
    return (dispatch: Dispatch<SearchAction>) => {
        dispatch({
            type : ActionType.SETSEARCHRESULT,
            payload : resultIndex
        });
    };
}