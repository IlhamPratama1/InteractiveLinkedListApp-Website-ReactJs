import { ActionType } from "../action-types";
import { SnackbarAction } from "../actions";
import { SnackbarStateInterface } from "../../interface";

const initialState: SnackbarStateInterface = {
    open: false,
    message: 'This is success snackbar',
    type: 0
}

const snackbarReducer = (state: SnackbarStateInterface = initialState, action: SnackbarAction) => {
    switch (action.type) {
        case ActionType.OPENSNACKBAR:
            return state = {
                open: true,
                message: action.payload.message,
                type: action.payload.type
            };
        case ActionType.CLOSESNACKBAR:
            return state = {
                open: false,
                message: '',
                type: 0
            };
        default:
            return state;
    }
}

export default snackbarReducer;