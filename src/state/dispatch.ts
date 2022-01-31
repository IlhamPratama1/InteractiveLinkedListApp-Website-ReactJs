import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from ".";

export const useHookDispatch = function() {
    return bindActionCreators(actionCreators, useDispatch());
} 