// Lib
import { useState } from 'react';
import { useSelector } from 'react-redux';

// Redux component
import { selectNode, useHookDispatch } from '../../../state/dispatch';

// External function
import { CheckRegexValidation } from '../../../regex';


export default function InsertTool() {
    // --- State
    const [ insertBeforeIndex, setInsertBeforeIndex ] = useState<string>('');
    const [ insertAfterIndex, setInsertAfterIndex ] = useState<string>('');

    // --- Redux State
    const nodeData = useSelector(selectNode);
    const { SetNodeData, SetLastOperation, OpenEditNodeIndex, CloseTool } = useHookDispatch();

    // --- Func
    function InsertNode(insertIndex: number, operation: string) {
        let array: Array<any> = [...nodeData];
        array.splice(insertIndex, 0, {});
        SetLastOperation(operation);
        SetNodeData(array);
        OpenEditNodeIndex(insertIndex);
        CloseTool();
    }

    // --- OnSubmit
    function InsertNodeBeforeIndex() {
        InsertNode(Number(insertBeforeIndex), 'before');
    }

    function InsertNodeAfterIndex() {
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
        <div className="bg-yellow-main p-4 mt-2 space-y-2">
            <p className="font-source text-md font-bold text-black">Insert before Index</p>
            <input type="text" value={insertBeforeIndex} onChange={handleChangeInsertBefore} placeholder="index" className="focus:outline-none focus:border-orang-main p-4 h-5 w-44 border rounded-xl"></input>
            <br />
            <button onClick={InsertNodeBeforeIndex} className="text-xs font-bold font-playfair py-2 px-4 bg-orange-main hover:bg-orane-second text-white-main hover:text-black-main transition duration-300">submit</button>
            <p className="font-source text-md font-bold text-black">Insert after Index</p>
            <input type="text" value={insertAfterIndex} onChange={handleChangeInsertAfter} placeholder="index" className="focus:outline-none focus:border-orang-main p-4 h-5 w-44 border rounded-xl"></input>
            <br />
            <button onClick={InsertNodeAfterIndex} className="text-xs font-bold font-playfair py-2 px-4 bg-orange-main hover:bg-orane-second text-white-main hover:text-black-main transition duration-300">submit</button>
        </div>
    );
}