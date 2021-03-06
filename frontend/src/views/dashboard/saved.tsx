// Lib
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowSmLeftIcon, ArrowSmRightIcon } from "@heroicons/react/solid";
import { Link } from 'react-router-dom';

// React Component
import ListProject from "./components/projectList";

// Redux component
import { UserStateInterface } from "../../interface";
import { State } from "../../state";
import { ListType, StateDataType } from "../../type";

// External Function
import { GetMyLists } from "../../api/listRequest";


export default function SavedView() {
    // --- Lib
    let navigate = useNavigate();

    // --- Redux state
    const auth: UserStateInterface = useSelector((state: State) => state.auth);

    // --- State
    const [ lists, setLists ] = useState<StateDataType<ListType>>({ isLoading: true, data: [] });

    // --- Func
    const FetchUserList = useCallback(async () => {
        const data: Array<ListType> = await GetMyLists();
        setLists({ isLoading: false, data: data });
    }, []);

    useEffect(() => {
        if (lists.isLoading && auth.token) FetchUserList();
    }, [auth.token, navigate, lists.isLoading, FetchUserList]);

    return (
        <div className="font-roboto h-full grid grid-cols-1 content-between">
            <div className="saved-project">
                <div className="flex items-center">
                    <img className='w-96' src='/static/illustrations/saved.svg' alt='saved' />
                    <div className="space-y-2">
                        <h1 className='font-bold text-3xl'>Open Saved Project</h1>
                        <p className='w-[32rem] text-md opacity-60'>Project Saved in Database by Struct Name and Linked List type. avaiable 3 type of linked list project: Single Linked List, Double Linked List, Circular Linked List. Go to project to create new Linked List project</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    { auth.token 
                        ? lists.isLoading ? 
                            <>
                                <div className='animate-pulse h-24 radius-md bg-slate-gray'></div>
                                <div className='animate-pulse h-24 radius-md bg-slate-gray'></div>
                                <div className='animate-pulse h-24 radius-md bg-slate-gray'></div>
                                <div className='animate-pulse h-24 radius-md bg-slate-gray'></div>
                            </> :
                            lists.data.map((list, i) => {
                                return ( <ListProject key={i} list={list} FetchUserList={FetchUserList} /> );
                        }) :
                        <div className='text-center py-11'>
                            <h1 className='font-roboto text-lg'><Link to={`/login`} className="underline text-cyan-dark" >Sign in</Link> see saved project</h1>
                        </div>
                    }
                </div>
            </div>
            <div className="pagination flex justify-center space-x-3">
                <button className="w-10 h-10 bg-cyan-light hover:bg-cyan-dark text-white rounded-sm flex items-center justify-center rounded-md transition duration-300"><ArrowSmLeftIcon className="w-7 h-7" /></button>
                <button className="w-10 h-10 bg-blue-light hover:bg-cyan-dark text-white rounded-sm flex items-center justify-center font-bold font-roboto rounded-md transition duration-300">1</button>
                <button className="w-10 h-10 bg-cyan-light hover:bg-cyan-dark text-blue-dark rounded-sm flex items-center justify-center font-bold font-roboto rounded-md transition duration-300">2</button>
                <button className="w-10 h-10 bg-cyan-light hover:bg-cyan-dark text-blue-dark rounded-sm flex items-center justify-center font-bold font-roboto rounded-md transition duration-300">3</button>
                <button className="w-10 h-10 bg-cyan-light hover:bg-cyan-dark text-white rounded-sm flex items-center justify-center rounded-md transition duration-300"><ArrowSmRightIcon className="w-7 h-7" /></button>
            </div>
        </div>
    );
}