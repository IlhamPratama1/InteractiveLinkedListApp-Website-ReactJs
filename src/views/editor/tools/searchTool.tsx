// Lib
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Redux component
import { selectAnim, selectNode, selectProjectType, selectStruct, selectTool, useHookDispatch } from '../../../state/dispatch';
import { AnimStateInterface, StructStateInterface, ToolStateInterface } from '../../../interface';

// External function
import { CheckRegexValidation } from '../../../regex';


export default function SearchTool() {
    // --- Redux state
    const projectType: string = useSelector(selectProjectType);
    const nodeData: Array<any> = useSelector(selectNode);
    const anim: AnimStateInterface = useSelector(selectAnim);
    const { editIndex }: ToolStateInterface = useSelector(selectTool);
    const { structData }: StructStateInterface = useSelector(selectStruct);
    const { 
        GenerateCode, SetLastOperation, 
        OpenNodeIndex, SetSearchLog, 
        SetSearchResult, SetQuestComplete,
        CloseTool, OpenSnackbar
    } = useHookDispatch();

    // --- State
    const [ searchIndex, setSearchIndex ] = useState<Array<string | number>>(GenerateArray());
    function GenerateArray() {
        let array: Array<string | number> = []
        for (let i = 0; i < structData.length; i++) {
            array.push('');
        }
        return array;
    }

    // --- OnChange
    function HandleChange(e: React.ChangeEvent<HTMLInputElement>, index: number, type: string) {
        let re: RegExp = CheckRegexValidation(type);
        if (e.target.value === '' || re.test(e.target.value)) {
            let array: Array<string | number> = [...searchIndex];
            array[index] = e.target.value;
            setSearchIndex(array);
        }
    }

    // --- Func
    function SearchNodeAtIndex(valueBy: string, ind: number, e: React.MouseEvent) {
        e.preventDefault();

        // Check anim if running
        if (anim.index !== -1) return;

        if (editIndex !== -1) {
            OpenSnackbar('You must fill empty node first', 1);
            OpenNodeIndex(editIndex);
            CloseTool();
            return;
        }

        const data = searchIndex[ind];
        if (data === '') return;
        
        for (let i = 0; i < nodeData.length; i++) {
            if (nodeData[i][valueBy] === searchIndex[ind]) {
                SetSearchResult(i);
                OpenNodeIndex(i);
                break;
            }
            else if (i === nodeData.length - 1 && nodeData[i][valueBy] !== searchIndex[ind]) {
                OpenSnackbar("Node data not found", 1);
            }
        }

        SetSearchLog(valueBy);
        CloseTool();
        SetLastOperation(`search${valueBy}`);

        GenerateCode(Number(data), data, valueBy);
        SetQuestComplete('search', projectType);
    }

    const checkToolValue = (index: number) => {
        if (projectType === 'single' || projectType === 'circular') {
            return index !== 0;
        }
        if (projectType === 'double') {
            return index > 1;
        }
    }

    return(
        <div className="font-roboto space-y-4">
            {structData.map((variable, i) => {
                return(
                    checkToolValue(i) ?
                    <form key={i} className="w-56 bg-white drop-shadow-8xl p-4 rounded-md space-y-2">
                        <p className="text-sm font-bold">Search by {variable.value}</p>
                        <label className='text-xs opacity-40'>Index</label>
                        <div className='space-y-3'>
                            <input value={searchIndex[i]} onChange={e => HandleChange(e, i, variable.type)} placeholder={`value in ${variable.type}`} className="focus:outline-none bg-slate-gray p-4 h-5 rounded-md text-sm"></input>
                            <button onClick={(e) => SearchNodeAtIndex(variable.value, i, e)} className="text-xs font-bold rounded-md py-2 px-4 text-black bg-cyan-light transition duration-300">submit</button>
                        </div>
                    </form>
                    : null
                );
            })}
        </div>
    );
}