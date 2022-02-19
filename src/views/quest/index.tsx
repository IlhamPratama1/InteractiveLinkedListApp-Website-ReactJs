// Lib
import { useCallback, useEffect } from "react";

// Redux component
import { QuestType } from "../../type";
import { useDispatch, useSelector } from "react-redux";
import { QuestAction } from "../../state/actions";
import { ActionType } from "../../state/action-types";

// External funtion
import { GetMyQuests } from "../../api/questRequest";
import { selectQuest } from "../../state/dispatch";


export default function QuestView() {
    // --- Lib
    const dispatch = useDispatch();

    // --- Redux state
    const questData = useSelector(selectQuest);

    const CheckInitialData = useCallback( async () => {
        const quests: Array<QuestType> = await GetMyQuests();
        dispatch<QuestAction>({
            type: ActionType.SETQUESTDATA,
            payload: quests
        });
    }, [dispatch]);

    useEffect(() => {
        CheckInitialData();
    }, [CheckInitialData]);
    
    return (
        <div className="container mx-auto px-12 md:px-24">
            {questData.map((data, i) => {
                return (
                    <div className="quest" key={i}>
                        <h1>{data.quest.name}</h1>
                        <h4>{data.quest.detail}</h4>
                        <h5>{data.isComplete ? 'complete' : 'not'}</h5>
                    </div>
                );
            })}
        </div>
    );
}