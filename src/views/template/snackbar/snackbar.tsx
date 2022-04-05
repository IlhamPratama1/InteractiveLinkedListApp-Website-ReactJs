// Lib
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionType } from "../../../state/action-types";

// Redux component
import { selectSnackbar } from "../../../state/dispatch";
import { SnackbarAction } from "../../../state/actions";


type SnackbarType = {
    timeout: number
}

const Snackbar = ({ timeout }: SnackbarType) => {
    // --- Lib
    const dispatch = useDispatch();
    
    // --- Redux State
    const { open, message, type } = useSelector(selectSnackbar);
    
    useEffect(() => {
        let timer: number = 0;
        if (open) {
            timer = window.setTimeout(() => {
                dispatch<SnackbarAction>({
                    type: ActionType.CLOSESNACKBAR
                });
            }, timeout);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [open, dispatch, timeout]);
    
    return (
        open ? 
            <div className={`fixed z-50 top-24 right-1/2 ${type === 0 ? 'bg-cyan-light':'bg-red'} drop-shadow-5xl rounded-md px-6 py-4 font-roboto flex space-x-3 animate-fade`}>
                <p className={`font-bold ${type === 0 ? 'text-black':'text-white'}`}>{message}</p>
            </div>
        : null
    );
}

export default Snackbar;