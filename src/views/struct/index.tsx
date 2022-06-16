// Lib
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

// Redux component
import { ListType, StructFormType } from '../../type';
import { selectAuth, selectProjectType, selectStruct, useHookDispatch } from '../../state/dispatch';
import { StructStateInterface, UserStateInterface } from '../../interface';
import { ActionType } from '../../state/action-types';
import { ListAction, StructAction } from '../../state/actions';

// External function
import { DecodeId, EncodeId } from '../../encrypt/hashId';
import { PostNewStruct } from '../../api/structRequest';
import { StructFormValidation } from '../../validation/structFormValidation';
import { doubleLinkedData, singleLinkedData } from './initialStructData';
import { GetListDetail } from '../../api/listRequest';

// React component
import { StructDisabledSelectInput, StructDisabledValueInput, StructSelectInput, StructValueInput } from './components/structTypeInput';
import TutorialView from './tutorials';


export default function StructView() {
    // --- Lib
    const dispatch = useDispatch();
    let { type, encodedId } = useParams();
    let navigate = useNavigate();
    
    // --- Redux state
    const struct: StructStateInterface = useSelector(selectStruct);
    const auth: UserStateInterface = useSelector(selectAuth);
    const { SetStructName, SetStructData, SetQuestComplete } = useHookDispatch();
    const projectType: string = useSelector(selectProjectType);

    // --- State
    const [ error, setError ] = useState<any>({});
    const [ firstTime, setFirstTime ] = useState<boolean>(true);
    const [ structReady, setStructReady ] = useState<boolean>(false);

    // --- OnChange
    function UpdateItem (prop: string, event: React.ChangeEvent<HTMLSelectElement>| React.ChangeEvent<HTMLInputElement>, index: number) {
        const old: StructFormType = struct.structData[index];
        const updated: StructFormType = { ...old, [prop]: event.target.value }
        const clone: Array<StructFormType> = [...struct.structData];
        clone[index] = updated;
        SetStructData(clone);
    }

    // --- OnSubmit
    function AddNewFormData(event: React.MouseEvent) {
        event.preventDefault();
        var formObj: StructFormType = { type: 'int', value: '' };
        let newFormArray: Array<StructFormType> = [...struct.structData];
        newFormArray.push(formObj);
        SetStructData(newFormArray);
    }

    async function SubmitStructFormData(event: React.MouseEvent) {
        event.preventDefault();

        const formIsValid: boolean = StructFormValidation(struct.structName, struct.structData, setError);
        if(formIsValid) {
            if (auth.token) {
                const structs = await PostNewStruct(struct.structName, struct.structData, Number(DecodeId(encodedId)));
                encodedId = EncodeId(structs.listId);
                const questData: string[] = struct.structData.map((data) => { return data.type });
                questData.forEach((data) => {
                    SetQuestComplete(data, 'struct');
                });
                if (questData.length > 3) SetQuestComplete('data', 'struct');
            } else {
                localStorage.setItem('struct_data', JSON.stringify(struct));
            }
            navigate(`/editor/${projectType}/${encodedId}`);
        }
    }

    // --- Func
    const InitializeStruct = useCallback(() => {
        if (type)
            dispatch<ListAction>({
                type: ActionType.SETTYPE,
                payload: type
            });
        if (type === 'double') {
            const data = doubleLinkedData(struct.structName);
            dispatch<StructAction>({
                type : ActionType.SETSTRUCTDATA,
                payload : data
            });
        } else {
            const data = singleLinkedData(struct.structName);
            dispatch<StructAction>({
                type : ActionType.SETSTRUCTDATA,
                payload : data
            });
        }
        setStructReady(true);
    }, [struct.structName, dispatch, type]);

    const CheckIfStructExist = useCallback( async () => {
        const decodedId = Number(DecodeId(encodedId));
        const list: ListType = await GetListDetail(decodedId);
        
        if (list.struct) {
            navigate(`/dashboard`);
            setStructReady(true);
        }
        else
            InitializeStruct();
    }, [navigate, InitializeStruct, encodedId]);

    useEffect(() => {
        const cookies = new Cookies();
        setFirstTime(cookies.get('secondTutorial'));

        if (auth.token) CheckIfStructExist();
        else InitializeStruct();
    }, [CheckIfStructExist, auth.token, InitializeStruct]);

    return(
        <div className='struct-section'>
            {structReady ?
                <React.Fragment>
                    <div className="space-y-8">
                        <div className="space-y-2 font-roboto">
                            <h1 className="font-bold text-4xl">Create Struct</h1>
                            <p className="text-lg">Create new Struct and insert variable data to struct that used in Linked-List.</p>
                        </div>
                        <form className="space-y-4 xl:w-7/12">
                            <div className="space-y-3 font-roboto">
                                <label className="text-lg">Struct Name</label>
                                <br />
                                <input value={struct.structName} onChange={e => SetStructName(e.target.value)} className="w-full h-12 border focus:outline-none focus:border-yellow-main p-4"></input>
                                <br />
                                <span style={{ color: "red" }}>{error["name"]}</span>
                            </div>
                            {struct.structData.map((data, i) => {
                                return(
                                    <div key={i} className="w-full flex items-center space-y-2 font-roboto">
                                        <div className="pt-2">
                                            <label className="text-lg focus:outline-none focus:border-yellow-main">Variable Name</label>
                                            { i === 0 || (i === 1 && projectType === 'double') ?
                                                <StructDisabledSelectInput
                                                    data={data}
                                                    index={i}
                                                    HandleChange={UpdateItem}
                                                /> :
                                                <StructSelectInput
                                                    data={data}
                                                    index={i}
                                                    HandleChange={UpdateItem}
                                                /> 
                                            }
                                        </div>
                                        <div className="w-full">
                                            <label className="text-lg">Variable Name</label>
                                            <br />
                                            {i === 0 || (i === 1 && projectType === 'double') ? 
                                            <StructDisabledValueInput
                                                data={data}
                                                index={i}
                                                HandleChange={UpdateItem}
                                            /> :
                                            <StructValueInput
                                                data={data}
                                                index={i}
                                                HandleChange={UpdateItem}
                                            /> }
                                            <br />
                                            <span style={{ color: "red" }}>{error["value" + i]}</span>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="flex justify-end space-x-2">
                                <button onClick={(event) => AddNewFormData(event)} className="text-md font-bold py-3 px-7 bg-cyan-light text-blue-dark rounded-md">Add new data</button>
                                <button onClick={(event) => SubmitStructFormData(event)} className="text-md font-bold py-3 px-7 bg-blue-dark text-cyan-light rounded-md">Submit</button>
                            </div>
                        </form>
                    </div>
                    {firstTime 
                        ? null
                        : <TutorialView setFirstTime={setFirstTime} /> 
                    }
                </React.Fragment> :
                <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
                    <svg role="status" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-dark" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
            }
        </div>
    );
}