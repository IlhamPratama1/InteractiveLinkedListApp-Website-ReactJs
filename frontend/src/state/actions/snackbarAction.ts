import { ActionType } from "../action-types";

interface OpenSnackbar {
    type: ActionType.OPENSNACKBAR,
    payload: {
        message: string,
        type: number
    }
}

interface CloseSnackbar {
    type: ActionType.CLOSESNACKBAR
}

export type SnackbarAction = OpenSnackbar | CloseSnackbar;