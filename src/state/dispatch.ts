import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from ".";

// Bind Action Creators
export const useHookDispatch = function() {
    return bindActionCreators(actionCreators, useDispatch());
}

export const selectAuth = (state: State) => state.auth;