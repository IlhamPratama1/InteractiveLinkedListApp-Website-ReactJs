// Lib
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { UpdateNodeData } from '../../../api/nodeRequest';

// Redux component
import { StructStateInterface } from '../../../interface';

// External function
import { CheckRegexValidation } from '../../../regex';
import { selectNode, selectStruct, useHookDispatch } from '../../../state/dispatch';


export default function RemoveTool() {
    // --- State
    const [ deleteIndex, setDeleteIndex ] = useState<string>('');

    // --- Redux state 
    const nodeData: Array<any> = useSelector(selectNode);
    const { SetLastOperation, SetNodeData, CloseTool, GenerateCode } = useHookDispatch();
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
    }

    return(
        <div className="bg-yellow-main p-4 mt-2 space-y-2">
            <p className="font-source text-md font-bold text-black">Delete in Index</p>
            <input value={deleteIndex} onChange={e => HandleChange(e)} placeholder="index" className="focus:outline-none focus:border-orang-main p-4 h-5 w-44 border rounded-xl"></input>
            <br />
            <button onClick={RemoveNodeAtIndex} className="text-xs font-bold font-playfair py-2 px-4 bg-orange-main hover:bg-orane-second text-white-main hover:text-black-main transition duration-300">submit</button>
        </div>
    );
}