// Lib
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Hashids from 'hashids';

// Redux Component
import { State } from '../../state';
import { UserStateInterface } from '../../interface';
import { ListType, QuestType, StateDataType } from '../../type';

// External function
import { GetMyLists } from '../../api/listRequest';
import { PostNewList } from '../../api/listRequest';
import NewProject from './newProject';
import ListProject from './listProject';
import { GetMyQuests } from '../../api/questRequest';


export default function ProjectView() {
    // --- Lib
    let navigate = useNavigate();
    const hashids = new Hashids(process.env.REACT_APP_HASH_ID, 20);

    // --- Redux State
    const auth: UserStateInterface = useSelector((state: State) => state.auth);

    // --- State
    const projectList = ['single', 'double', 'circular'];
    const [ lists, setLists ] = useState<StateDataType<ListType>>({ isLoading: true, data: [] });
    const [ quests, setQuests ] = useState<StateDataType<QuestType>>({ isLoading: true, data: [] });
    const [ selectedProject, setSelectedProject ] = useState<string>('single');
    
    // --- OnSubmit
    function SelectProject(projectType: string) {
        setSelectedProject(projectType);
    }

    async function SubmitListType() {
        const list: ListType = await PostNewList(selectedProject);
        const encodedId: string = hashids.encode(list.id);
        navigate(`/dashboard/struct/${selectedProject}/${encodedId}`);
    }

    // --- Func
    const FetchUserList = useCallback(async () => {
        const data: Array<ListType> = await GetMyLists();
        const questData: Array<QuestType> = await GetMyQuests();
        const questArray: Array<QuestType> = questData.slice(0, 4).sort((a) => (a.isComplete ? 1 : -1));
        setLists({ isLoading: false, data: data });
        setQuests({ isLoading: false, data: questArray });
    }, []);

    useEffect(() => {
        if (!auth.token) navigate('/login');
        if (lists.isLoading && quests.isLoading && auth.token) FetchUserList();
    }, [auth.token, navigate, lists.isLoading, quests.isLoading, FetchUserList]);

    return(
        <div className='grid grid-cols-1 lg:grid-cols-3'>

            {/* --- Cols-1 --- */}
            <div className='2xl:px-12'>
                <div className='w-full h-full bg-green-light rounded-3xl py-8 px-8 space-y-7'>
                    <img src='/static/illustrations/project-new.svg' alt='project' />
                    <div className='space-y-3 font-roboto px-2'>
                        <h1 className='font-bold text-3xl'>Create New Project</h1>
                        <p className='text-md opacity-80'>Create new Linked-List project, and select which type of Linked-List.</p>
                    </div>
                    <div className='space-y-6 font-roboto px-2'>
                        <h1 className='font-bold text-md opacity-50'>Type</h1>
                        {projectList.map((type, i) => {
                            return (
                                <NewProject 
                                    key={i}
                                    type={type}
                                    selectedProject={selectedProject}
                                    SubmitFunction={SelectProject} 
                                    />
                            );
                        })}
                        <button onClick={SubmitListType} className="focus:outline-none flex mx-auto rounded-md px-10 py-3 bg-cyan-dark text-white hover:bg-blue-dark hover:text-yellow font-bold text-sm md:text-md lg:text-lg transition duration-300">Create</button>
                    </div>
                </div>
            </div>

            {/* --- Cols-2 --- */}
            <div className='xl:border-r flex justify-center'>
                <div className='2xl:pl-10 2xl:pr-20 lg:pr-8 space-y-7'>
                    <img className='scale-90' src='/static/illustrations/phone.svg' alt='project' />
                    <div className='space-y-3 font-roboto'>
                        <h1 className='font-bold text-3xl'>Open Saved Project</h1>
                        <p className='text-md opacity-60'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                    <div className='space-y-5'>
                        {lists.isLoading ? null :
                            lists.data.map((list, i) => {
                                return (
                                    <ListProject
                                        key={i}
                                        list={list}
                                        FetchUserList={FetchUserList}
                                    />
                                );
                            }).slice(0, 3)
                        }
                    </div>
                    <button className="focus:outline-none flex mx-auto rounded-md px-10 py-3 bg-blue-dark text-white hover:text-yellow font-bold font-roboto text-sm md:text-md lg:text-lg transition duration-300">All</button>
                </div>
            </div>

            {/* --- Cols-3 --- */}
            <div className='flex justify-center'>
                <div className='2xl:px-16 lg:px-8 space-y-7'>
                    <img className='scale-90' src='/static/illustrations/laptop.svg' alt='project' />
                    <div className='space-y-3 font-roboto'>
                        <h1 className='font-bold text-3xl'>Quest</h1>
                        <p className='text-md opacity-60'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                    <div className='space-y-4'>
                        <h1 className='font-roboto font-bold text-md'>Complete</h1>
                        {quests.isLoading ? null :
                            quests.data.map((quest, i) => {
                                return (
                                    <div key={i} className={`border-l-8 border-cyan-dark pl-4 space-y-2`}>
                                        <h1 className='font-roboto text-md'>{quest.quest.detail}</h1>
                                        <h1 className='font-roboto text-sm opacity-40 capitalize'>{quest.quest.type} Linked List</h1>
                                    </div>
                                );
                            }).slice(0, 2)
                        }
                        <h1 className='font-roboto font-bold text-md'>InComplete</h1>
                        {quests.isLoading ? null :
                            quests.data.map((quest, i) => {
                                return (
                                    <div key={i} className={`border-l-8 border-orange pl-4 space-y-2`}>
                                        <h1 className='font-roboto text-md'>{quest.quest.detail}</h1>
                                        <h1 className='font-roboto text-sm opacity-40 capitalize'>{quest.quest.type} Linked List</h1>
                                    </div>
                                );
                            }).slice(2, 4)
                        }
                    </div>
                    <button className="focus:outline-none flex mx-auto rounded-md px-10 py-3 bg-blue-dark text-white hover:text-yellow font-bold font-roboto text-sm md:text-md lg:text-lg transition duration-300">All</button>
                </div>
            </div>

        </div>
    );
}