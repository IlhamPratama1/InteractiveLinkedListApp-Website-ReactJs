// Lib
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { UpdateNodeData } from '../../../api/nodeRequest';

// Redux component
import { StructStateInterface } from '../../../interface';
import { selectNode, selectProjectType, selectStruct, selectTool, useHookDispatch } from '../../../state/dispatch';

// External function
import { CheckRegexValidation } from '../../../regex';


export default function RemoveTool() {
    // --- State
    const [ deleteIndex, setDeleteIndex ] = useState<string>('');

    // --- Redux state 
    const nodeData: Array<any> = useSelector(selectNode);
    const { editIndex } = useSelector(selectTool);
    const projectType: string = useSelector(selectProjectType);
    const {
        SetLastOperation, SetQuestComplete, SetNodeData,
        CloseTool, GenerateCode, OpenSnackbar,
        OpenNodeIndex, SetAnimation, ResetAllTools,
    } = useHookDispatch();
    const { listId }: StructStateInterface = useSelector(selectStruct);

    // --- OnChange
    function HandleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === '' || CheckRegexValidation("int").test(e.target.value)) {
            setDeleteIndex(e.target.value)
        }
    }

    // --- OnSubmit
    function RemoveNodeAtIndex(e: React.MouseEvent) {
        e.preventDefault();

        // Validation #1
        if (editIndex !== -1) {
            OpenSnackbar('You must fill empty node first', 1);
            OpenNodeIndex(editIndex);
            CloseTool();
            return;
        }

        // Validation #2
        const index: number = Number(deleteIndex);
        if (index > nodeData.length - 1) {
            OpenSnackbar('Index out of bonds', 1);
            CloseTool();
            return;
        }

        // Set Node data
        let array: Array<any> = [...nodeData];
        array.splice(index, 1);

        // Set last operation
        SetLastOperation('delete');

        // close all tool modal
        ResetAllTools();

        // Set Animation
        SetAnimation(index, 'destroy', () => {
            SetNodeData(array);
        });
        
        // Generate Code
        GenerateCode(index, index, '');

        // Save node data request api
        UpdateNodeData(listId, array);

        // Check quest complete
        SetQuestComplete('delete', projectType);
    }

    return(
        <div className="bg-white drop-shadow-8xl p-4 rounded-md">
            <form className='w-48 font-roboto space-y-2'>
                <p className="text-sm font-bold">Delete in Index</p>
                <label className='text-xs opacity-40'>Index</label>
                <div className='space-y-3'>
                    <input value={deleteIndex} onChange={e => HandleChange(e)} placeholder="index" className="focus:outline-none bg-slate-gray p-4 h-5 rounded-md text-sm"></input>
                    <button onClick={e => RemoveNodeAtIndex(e)} className="text-xs font-bold rounded-md py-2 px-4 text-black bg-cyan-light transition duration-300">Submit</button>
                </div>
            </form>
        </div>
    );
}