import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { State } from '../../state';

import { UserStateInterface } from '../../interface';
import { ListType, StateDataType } from '../../type';
import ListProject from './listProject';
import TypeProject from './typeProject';
import { GetMyLists, PostNewList } from '../../api/listRequest';


export default function DashboardView() {
    // Lib
    let navigate = useNavigate();

    // Redux
    const auth: UserStateInterface = useSelector((state: State) => state.auth);

    // State
    const [ lists, setLists ] = useState<StateDataType<ListType>>({ isLoading: true, data: [] }); 
    
    async function SubmitListType(type: string) {
        const list: ListType = await PostNewList(type);
        navigate(`/struct/${type}/${list.id}`);
    }
    
    const FetchUserList = useCallback(async () => {
        const data: Array<ListType> = await GetMyLists();
        setLists({ isLoading: false, data: data });
    }, []);

    useEffect(() => {
        if (!auth.token) navigate('/login');
        if (lists.isLoading && auth.token) FetchUserList();
    }, [auth.token, navigate, lists.isLoading, FetchUserList]);

    return(
        <div className="container mx-auto px-12 md:px-24">
            <div className="grid grid-cols-3 divide-x divide-gray-500 gap-16">
                <div className="space-y-10">
                    <div className="space-y-4">
                        <h1 className="font-playfair text-4xl font-bold">Create Linked-List</h1>
                        <p className="font-source text-lg">Create new Linked-List project, and select which type of Linked-List. </p>
                    </div>
                    <div className="space-y-6">
                        <TypeProject SubmitFunction={SubmitListType} type='single' />
                        <TypeProject SubmitFunction={SubmitListType} type='double' />
                        <TypeProject SubmitFunction={SubmitListType} type='circular' />
                    </div>
                </div>

                <div className="col-span-2">
                    <div className="pl-16 space-y-10">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="font-playfair text-4xl font-bold">Saved Linked-List Project</h1>
                                <p className="font-source text-lg">select the linked list project that has been saved.</p>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                                {lists.isLoading ? null :
                                    lists.data.length === 0 ? <h1 className="font-source text-xl">Linked List project is empty</h1> :
                                    lists.data.map((list, i) => {
                                        return( <ListProject key={i} index={i} list={list} /> );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}