// Lib
import { useState } from 'react';
import { useSelector } from 'react-redux';

// Redux component
import { selectNode, selectProjectType, selectStruct, useHookDispatch } from '../../../state/dispatch';
import { StructStateInterface } from '../../../interface';

// External function
import { CheckRegexValidation } from '../../../regex';


export default function SearchTool() {
    // --- Redux state
    const projectType: string = useSelector(selectProjectType);
    const nodeData: Array<any> = useSelector(selectNode);
    const { structData }: StructStateInterface = useSelector(selectStruct);
    const { GenerateCode, SetLastOperation, SetSearchLog, CloseTool } = useHookDispatch();

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
    function SearchNodeAtIndex(valueBy: string, ind: number) {
        const data = searchIndex[ind];
        for (let i = 0; i < nodeData.length; i++) {
            if (nodeData[i][valueBy] === searchIndex[ind]) {
                console.log("ada");
            }
        }
        SetSearchLog(valueBy);
        SetLastOperation(`search${valueBy}`);
        CloseTool();
        GenerateCode(Number(data), data, valueBy);
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
        <div className="bg-yellow-main p-4 mt-2 space-y-2">
            <div className="grid grid-cols-2 gap-4">
                {structData.map((variable, i) => {
                    return(
                        checkToolValue(i) ?
                        <div key={i} className="space-y-2">
                            <p className="font-source text-md font-bold text-black">Search by {variable.value}</p>
                            <input value={searchIndex[i]} onChange={e => HandleChange(e, i, variable.type)} placeholder="value" className="focus:outline-none focus:border-orang-main p-4 h-5 w-44 border rounded-xl"></input>
                            <br />
                            <button onClick={() => SearchNodeAtIndex(variable.value, i)} className="text-xs font-bold font-playfair py-2 px-4 bg-orange-main hover:bg-orane-second text-white-main hover:text-black-main transition duration-300">submit</button>
                        </div>
                        : null
                    );
                })}
            </div>
        </div>
    );
}