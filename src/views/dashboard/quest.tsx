// Lib
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux component
import { QuestType, StateDataType } from "../../type";
import { UserStateInterface } from "../../interface";
import { GetMyQuests } from "../../api/questRequest";
import { State } from "../../state";
import QuestList from "./components/questList";


export default function QuestView() {
    // --- Lib
    let navigate = useNavigate();

    // --- State
    const [ quests, setQuests ] = useState<StateDataType<QuestType>>({ isLoading: true, data: [] });

    // --- Redux State
    const auth: UserStateInterface = useSelector((state: State) => state.auth);

    // --- Func
    const FetchUserList = useCallback(async () => {
        const data: Array<QuestType> = await GetMyQuests();
        setQuests({ isLoading: false, data: data });
    }, []);

    useEffect(() => {
        if (quests.isLoading && auth.token) FetchUserList();
    }, [auth.token, navigate, quests.isLoading, FetchUserList]);

    return (
        <div className="font-roboto h-full space-y-3">
            <div className="flex items-center">
                <img className='w-96' src='/static/illustrations/quest.svg' alt='quest' />
                <div className="space-y-2">
                    <h1 className='font-bold text-3xl'>Quest List</h1>
                    <p className='w-[32rem] text-md opacity-60'>Follow quest's instruction to complete all quest below. Complete quest by type of Linked List: Single Linked List, Double Linked List, Circular Linked List and play on editor.</p>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div className="space-y-8">
                    <h1 className='font-roboto font-bold text-lg'>Single Linked List</h1>
                    <div className="space-y-4">
                        {quests.isLoading ? null :
                            quests.data.map((quest, i) => {
                                return (
                                    <QuestList 
                                        key={i}
                                        isComplete={true}
                                        detail={quest.quest.detail}
                                        type={quest.quest.type}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
                <div className="space-y-8">
                    <h1 className='font-roboto font-bold text-lg'>Single Linked List</h1>
                    <div className="space-y-4">
                        {quests.isLoading ? null :
                            quests.data.map((quest, i) => {
                                return (
                                    <QuestList
                                        key={i}
                                        isComplete={false}
                                        detail={quest.quest.detail}
                                        type={quest.quest.type}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
                <div className="space-y-8">
                    <h1 className='font-roboto font-bold text-lg'>Single Linked List</h1>
                    <div className="space-y-4">
                        {quests.isLoading ? null :
                            quests.data.map((quest, i) => {
                                return (
                                    <QuestList
                                        key={i}
                                        isComplete={true}
                                        detail={quest.quest.detail}
                                        type={quest.quest.type}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
                <div className="space-y-8">
                    <h1 className='font-roboto font-bold text-lg'>Single Linked List</h1>
                    <div className="space-y-4">
                        {quests.isLoading ? null :
                            quests.data.map((quest, i) => {
                                return (
                                    <QuestList
                                        key={i}
                                        isComplete={false}
                                        detail={quest.quest.detail}
                                        type={quest.quest.type}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}