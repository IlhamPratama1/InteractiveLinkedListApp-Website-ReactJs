import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from ".";

// Bind Action Creators
export const useHookDispatch = function() {
    return bindActionCreators(actionCreators, useDispatch());
}

export const selectAuth = (state: State) => state.auth;
export const selectStruct = (state: State) => state.struct;
export const selectProjectType = (state: State) => state.projectType;
export const selectCode = (state: State) => state.code;
export const selectNode = (state: State) => state.node;
export const selectTool = (state: State) => state.tool;