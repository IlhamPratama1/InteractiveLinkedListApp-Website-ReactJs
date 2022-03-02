// Lib
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { UpdateNodeData } from '../../../api/nodeRequest';

// Redux component
import { StructStateInterface } from '../../../interface';
import { selectNode, selectProjectType, selectStruct, useHookDispatch } from '../../../state/dispatch';

// External function
import { CheckRegexValidation } from '../../../regex';


export default function RemoveTool() {
    // --- State
    const [ deleteIndex, setDeleteIndex ] = useState<string>('');

    // --- Redux state 
    const nodeData: Array<any> = useSelector(selectNode);
    const projectType: string = useSelector(selectProjectType);
    const { SetLastOperation, SetQuestComplete, SetNodeData, CloseTool, GenerateCode } = useHookDispatch();
    const { listId }: StructStateInterface = useSelector(selectStruct);

    // --- OnChange
    function HandleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === '' || CheckRegexValidation("int").test(e.target.value)) {
            setDeleteIndex(e.target.value)
        }
    }

    // --- OnSubmit
    function RemoveNodeAtIndex() {
        const index: number = Number(deleteIndex);
        let array: Array<any> = [...nodeData];
        array.splice(index, 1);
        SetLastOperation('delete');
        SetNodeData(array);
        CloseTool();
        GenerateCode(index, index, '');
        UpdateNodeData(listId, array);
        SetQuestComplete('delete', projectType);
    }

    return(
        <div className="bg-white drop-shadow-8xl p-4 rounded-md">
            <div className='w-48 font-roboto space-y-2'>
                <p className="text-sm font-bold">Delete in Index</p>
                <label className='text-xs opacity-40'>Index</label>
                <div className='space-y-3'>
                    <input value={deleteIndex} onChange={e => HandleChange(e)} placeholder="index" className="focus:outline-none bg-slate-gray p-4 h-5 rounded-md text-sm"></input>
                    <button onClick={RemoveNodeAtIndex} className="text-xs font-bold rounded-md py-2 px-4 text-black bg-cyan-light transition duration-300">Submit</button>
                </div>
            </div>
        </div>
    );
}