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
    }, [struct.structName, dispatch, type]);

    const CheckIfStructExist = useCallback( async () => {
        const decodedId = Number(DecodeId(encodedId));
        const list: ListType = await GetListDetail(decodedId);
        
        if (list.struct)
            navigate(`/dashboard`);
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
        </div>
    );
}