// Lib
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

// Redux component
import { FourStateDataType, QuestType, TwoStateDataType} from "../../type";
import { UserStateInterface } from "../../interface";
import { GetMyQuests } from "../../api/questRequest";
import { State } from "../../state";
import QuestList from "./components/questList";


export default function QuestView() {
    // --- Lib
    let navigate = useNavigate();

    // --- State
    const [ quests, setQuests ] = useState<FourStateDataType<QuestType>>({ isLoading: true, data: [], data2: [], data3: [], data4: [] });
    const [ completeQuests, setCompleQuests ] = useState<TwoStateDataType<QuestType>>({ isLoading: true, data: [], data2: [] });

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
        setCompleQuests({ isLoading: false, data: data.filter((quest) => quest.isComplete), data2: data.filter((quest) => !quest.isComplete) });
        setQuests({ isLoading: false, data: singleQuest, data2: doubleQuest, data3: circularQuest, data4: universalQuest });
    }, []);

    function CountProgress(): string {
        const progress = completeQuests.data.length * 100 / (completeQuests.data.length + completeQuests.data2.length);
        const cssProgress = `bg-green-dark h-6 rounded-2xl w-[${progress}%]`;
        console.log(cssProgress)
        return cssProgress
    }

    useEffect(() => {
        if (quests.isLoading && auth.token) FetchUserList();
    }, [auth.token, navigate, quests.isLoading, FetchUserList]);

    return (
        <div className="font-roboto h-full">
            <div className="flex items-center">
                <img className='w-96' src='/static/illustrations/quest.svg' alt='quest' />
                <div className="space-y-2 w-[32rem]">
                    <h1 className='font-bold text-3xl'>Quest List</h1>
                    <p className='text-md opacity-60'>Follow quest's instruction to complete all quest below. Complete quest by type of Linked List: Single Linked List, Double Linked List, Circular Linked List and play on editor.</p>
                </div>
            </div>
            <div className="space-y-10">
                { auth.token
                    ? quests.isLoading 
                        ? <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                        : <div className="flex space-x-6">
                            <div className="space-y-4">
                                <h1 className='font-roboto font-bold text-lg'>Status</h1>
                                <div className="flex space-x-6">
                                    <div className="bg-green-light rounded-lg p-4 w-56 flex items-center space-x-4">
                                        <img className='w-14' src='/static/icons/star.png' alt='star' />
                                        <div>
                                            <h1 className='font-roboto text-md'>Quest</h1>
                                            <div className="flex space-x-2 items-end">
                                                <h1 className='font-roboto text-3xl font-bold'>{completeQuests.data.length * 120}</h1>
                                                <h1 className='font-roboto text-md'>/1080</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-green-light rounded-lg p-4 w-56 flex items-center space-x-4">
                                        <img className='w-14' src='/static/icons/trophy.png' alt='star' />
                                        <div>
                                            <h1 className='font-roboto text-md'>Trophy</h1>
                                            <div className="flex space-x-2 items-end">
                                                <h1 className='font-roboto text-3xl font-bold'>{completeQuests.data.length * 8}</h1>
                                                <h1 className='font-roboto text-md'>/1080</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="progress">
                                <h1 className='font-roboto font-bold text-lg'>Progress</h1>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-green-light w-48 h-6 rounded-2xl">
                                        <div className={CountProgress()}></div>
                                    </div>
                                    <img className='w-12' src='/static/icons/medal.png' alt='quest' />
                                    <div className="bg-green-light w-48 h-6 rounded-2xl">
                                        <div className="bg-green-dark w-[0%] h-6 rounded-2xl"></div>
                                    </div>
                                    <img className='w-20' src='/static/icons/badge2.png' alt='quest' />
                                </div>
                            </div>
                        </div>
                    : null
                }
                { auth.token 
                ? <div className="grid grid-cols-4 gap-4 pb-6">
                    <div className="space-y-6">
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
                    <div className="space-y-6">
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
                    <div className="space-y-6">
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
                    <div className="space-y-6">
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
                </div>
                : <div className='grid grid-cols-4 gap-4 text-center py-11'>
                    <h1 className='font-roboto text-lg'><Link to={`/login`} className="underline text-cyan-dark" >Sign in</Link> see available quest</h1>
                </div>
                }
            </div>
        </div>
    );
}