import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { ListType, StructFormType } from '../../type';
import { doubleLinkedData, singleLinkedData } from './initialStructData';

import { GetListDetail } from '../../api/listRequest';
import { PostNewStruct } from '../../api/structRequest';
import { StructFormValidation } from '../../validation/structFormValidation';

import { StructDisabledSelectInput, StructDisabledValueInput, StructSelectInput, StructValueInput } from './structTypeInput';


export default function StructView() {
    // --- Lib
    let { type, listid } = useParams();
    let navigate = useNavigate();
    
    // --- State
    const [ structName, setStructName ] = useState<string>('');
    const [ structFormData, setStructFormData ] = useState<Array<StructFormType>>([{ type: '', value: '' }]);
    const [ projectType, setProjectType ] = useState<string>('');
    const [ error, setError ] = useState<any>({});

    // --- Func
    function AddNewFormData(event: React.MouseEvent) {
        event.preventDefault();
        var formObj: StructFormType = { type: '', value: '' };
        formObj['type'] = 'int';
        formObj['value'] = "";
        let newFormArray = [...structFormData];
        newFormArray.push(formObj);
        setStructFormData(newFormArray);
    }

    function UpdateItem (prop: string, event: React.ChangeEvent<HTMLSelectElement>| React.ChangeEvent<HTMLInputElement>, index: number) {
        const old = structFormData[index];
        const updated = { ...old, [prop]: event.target.value }
        const clone = [...structFormData];
        clone[index] = updated;
        setStructFormData(clone);
    }

    async function SubmitStructFormData(event: React.MouseEvent) {
        event.preventDefault();
        const formIsValid: boolean = StructFormValidation(structName, structFormData, setError);
        if(formIsValid) {
            const struct = await PostNewStruct(structName, structFormData, Number(listid));
            navigate(`/editor/${struct.listId}`);
        }
    }

    const InitializeStruct = useCallback(() => {
        if (type) setProjectType(type);
        if (type === 'double') {
            const data = doubleLinkedData(structName);
            setStructFormData(data);
        } else {
            const data = singleLinkedData(structName);
            setStructFormData(data);
        }
    }, [type, structName]);

    const CheckIfStructExist = useCallback( async () => {
        const list: ListType = await GetListDetail(listid);
        if (list.struct === null)
            InitializeStruct();
        else
            navigate(`/editor/${listid}`);
    }, [navigate, listid, InitializeStruct]);

    useEffect(() => {
        CheckIfStructExist();
    }, [CheckIfStructExist]);

    return(
        <div className="container mb-12 px-12 md:px-52">
            <div className="space-y-8">
                <div className="space-y-2">
                    <h1 className="font-playfair font-bold text-4xl">Create Struct</h1>
                    <p className="font-source text-lg">Create new Struct and insert variable data to struct that used in Linked-List.</p>
                </div>
                <form className="space-y-4">
                    <div className="space-y-3">
                        <label className="font-source text-xl">Struct Name</label>
                        <br />
                        <input onChange={e => setStructName(e.target.value)} className="w-7/12 h-12 border focus:outline-none focus:border-yellow-main p-4"></input>
                        <br />
                        <span style={{ color: "red" }}>{error["name"]}</span>
                    </div>
                    {structFormData.map((data, i) => {
                        return(
                            <div key={i} className="w-full flex items-cente space-y-2">
                                <div className="pt-2">
                                    <label className="font-source text-lg focus:outline-none focus:border-yellow-main">Variable Name</label>
                                    { i === 0 || (i === 1 && projectType === 'double') ?
                                        <StructDisabledSelectInput
                                            structName={structName}
                                            data={data}
                                            index={i}
                                            HandleChange={UpdateItem}
                                        /> :
                                        <StructSelectInput
                                            structName={structName}
                                            data={data}
                                            index={i}
                                            HandleChange={UpdateItem}
                                        />
                                        }
                                </div>
                                <div className="w-full">
                                    <label className="font-source text-lg">Variable Name</label>
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
                    <div className="flex justify-end space-x-2 w-8/12">
                        <button onClick={(event) => AddNewFormData(event)} className="text-xs font-bold font-playfair py-3 px-7 text-orange-main border border-orange-main hover:bg-yellow-second hover:text-black-main transition duration-300">Add new data</button>
                        <button onClick={(event) => SubmitStructFormData(event)} className="text-xs font-bold font-playfair py-3 px-7 bg-orange-main hover:bg-yellow-second text-white-main hover:text-black-main transition duration-300">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}