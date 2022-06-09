// Lib
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

// Redux component
import { FourStateDataType, QuestType} from "../../type";
import { UserStateInterface } from "../../interface";
import { GetMyQuests } from "../../api/questRequest";
import { State } from "../../state";
import QuestList from "./components/questList";


export default function QuestView() {
    // --- Lib
    let navigate = useNavigate();

    // --- State
    const [ quests, setQuests ] = useState<FourStateDataType<QuestType>>({ isLoading: true, data: [], data2: [], data3: [], data4: [] });

    // --- Redux State
    const auth: UserStateInterface = useSelector((state: State) => state.auth);

    // --- Func
    const FetchUserList = useCallback(async () => {
        const data: Array<QuestType> = await GetMyQuests();
        const singleQuest: Array<QuestType> = [];
        const doubleQuest: Array<QuestType> = [];
        const circularQuest: Array<QuestType> = [];
        const universalQuest: Array<QuestType> = [];
        for (let i = 0; i < data.length; i++) {
            switch (data[i].quest.type) {
                case 'single': {
                    singleQuest.push(data[i]);
                    break;
                }
                case 'double': {
                    doubleQuest.push(data[i]);
                    break;
                }
                case 'circular': {
                    circularQuest.push(data[i]);
                    break;
                }
                default: {
                    universalQuest.push(data[i]);
                    break;
                }
            }
        }
        setQuests({ isLoading: false, data: singleQuest, data2: doubleQuest, data3: circularQuest, data4: universalQuest });
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
            { auth.token ?
                <div className="grid grid-cols-4 gap-4">
                <div className="space-y-8">
                    <h1 className='font-roboto font-bold text-lg'>Single Linked List</h1>
                    <div className="space-y-4">
                        {quests.isLoading ? 
                            <>
                                <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                                <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                                <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                                <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                            </> :
                            quests.data.map((quest, i) => {
                                return (
                                    <QuestList 
                                        key={i}
                                        isComplete={quest.isComplete}
                                        detail={quest.quest.detail}
                                        type={quest.quest.type}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
                <div className="space-y-8">
                    <h1 className='font-roboto font-bold text-lg'>Double Linked List</h1>
                    <div className="space-y-4">
                        {quests.isLoading ? 
                            <>
                                <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                                <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                                <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                                <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                            </> :
                            quests.data2.map((quest, i) => {
                                return (
                                    <QuestList
                                        key={i}
                                        isComplete={quest.isComplete}
                                        detail={quest.quest.detail}
                                        type={quest.quest.type}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
                <div className="space-y-8">
                    <h1 className='font-roboto font-bold text-lg'>Circular Linked List</h1>
                    <div className="space-y-4">
                        {quests.isLoading ? 
                            <>
                                <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                                <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                                <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                                <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                            </> :
                            quests.data3.map((quest, i) => {
                                return (
                                    <QuestList
                                        key={i}
                                        isComplete={quest.isComplete}
                                        detail={quest.quest.detail}
                                        type={quest.quest.type}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
                <div className="space-y-8">
                    <h1 className='font-roboto font-bold text-lg'>Universal Quest</h1>
                    <div className="space-y-4">
                        {quests.isLoading ? 
                            <>
                                <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                                <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                                <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                                <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                            </> :
                            quests.data4.map((quest, i) => {
                                return (
                                    <QuestList
                                        key={i}
                                        isComplete={quest.isComplete}
                                        detail={quest.quest.detail}
                                        type={quest.quest.type}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
                </div>:
                <div className='grid grid-cols-4 gap-4 text-center py-11'>
                    <h1 className='font-roboto text-lg'><Link to={`/login`} className="underline text-cyan-dark" >Sign in</Link> see available quest</h1>
                </div>
            }
        </div>
    );
}