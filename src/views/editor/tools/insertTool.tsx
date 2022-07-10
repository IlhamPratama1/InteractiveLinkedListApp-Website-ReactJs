// Lib
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Redux component
import { selectAnim, selectNode, selectTool, useHookDispatch } from '../../../state/dispatch';

// External function
import { CheckRegexValidation } from '../../../regex';


export default function InsertTool() {
    // --- State
    const [ insertBeforeIndex, setInsertBeforeIndex ] = useState<string>('');
    const [ insertAfterIndex, setInsertAfterIndex ] = useState<string>('');

    // --- Redux State
    const nodeData = useSelector(selectNode);
    const { index } = useSelector(selectAnim);
    const { editIndex } = useSelector(selectTool);
    const { 
        SetNodeData, SetLastOperation, SetAnimation,
        CloseTool, OpenSnackbar, OpenEditNodeIndex,
    } = useHookDispatch();

    // --- Func
    function InsertNode(insertIndex: number, operation: string) {
        
        // Validation
        if (editIndex !== -1) {
            OpenSnackbar('You must fill empty node first', 1);
            OpenEditNodeIndex(editIndex);
            return;
        }

        // Set Node data
        let array: Array<any> = [...nodeData];
        array.splice(insertIndex, 0, {});
        SetNodeData(array);

        // Set Last operation
        SetLastOperation(operation);
        
        // Set Animation
        SetAnimation(insertIndex, 'spawn', () => {});
    }

    // --- OnSubmit
    function InsertNodeBeforeIndex(e: React.MouseEvent) {
        e.preventDefault();

        // Check anim if running
        if (index !== -1) return;

        CloseTool();

        if (Number(insertBeforeIndex) > nodeData.length - 1) 
            OpenSnackbar('Index out of bonds', 1);
        else
            InsertNode(Number(insertBeforeIndex), 'before');
    }

    function InsertNodeAfterIndex(e: React.MouseEvent) {
        e.preventDefault();

        // Check anim if running
        if (index !== -1) return;

        CloseTool();

        if (nodeData.length === 0)
            OpenSnackbar("Cannot 'insert after' in empty node", 1);
        else if (Number(insertAfterIndex) > nodeData.length - 1)
            OpenSnackbar('Index out of bonds', 1);
        else
            InsertNode(Number(insertAfterIndex) + 1, 'after');
    }

    // --- OnChange
    function handleChangeInsertBefore(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === '' || CheckRegexValidation('int').test(e.target.value)) {
            setInsertBeforeIndex(e.target.value)
        }
    }

    function handleChangeInsertAfter(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === '' || CheckRegexValidation('int').test(e.target.value)) {
            setInsertAfterIndex(e.target.value)
        }
     } 

    return(
        <div className="font-roboto space-y-4">
            <form className='w-56 bg-white drop-shadow-8xl p-4 rounded-md'>
                <div className='space-y-2'>
                    <p className="text-sm font-bold">Insert Before Index</p>
                    <label className='text-xs opacity-40'>Index</label>
                    <div className='space-y-3'>
                        <input type="text" value={insertBeforeIndex} onChange={handleChangeInsertBefore} placeholder="index" className="focus:outline-none bg-slate-gray p-4 h-5 rounded-md text-sm"></input>
                        <button type='submit' onClick={e => InsertNodeBeforeIndex(e)} className="text-xs font-bold rounded-md py-2 px-4 text-black bg-cyan-light transition duration-300">Submit</button>
                    </div>
                </div>
            </form>
            <form className='w-56 bg-white drop-shadow-8xl p-4 rounded-md'>
                <div className='space-y-2'>
                    <p className="text-sm font-bold">Insert After Index</p>
                    <label className='text-xs opacity-40'>Index</label>
                    <div className='space-y-3'>
                        <input type="text" value={insertAfterIndex} onChange={handleChangeInsertAfter} placeholder="index" className="focus:outline-none bg-slate-gray p-4 h-5 rounded-md text-sm"></input>
                        <button type='submit' onClick={e => InsertNodeAfterIndex(e)} className="text-xs font-bold rounded-md py-2 px-4 text-black bg-cyan-light transition duration-300">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}