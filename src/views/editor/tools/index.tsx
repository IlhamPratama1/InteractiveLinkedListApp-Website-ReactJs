// Lib
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TemplateIcon, ViewGridAddIcon, CollectionIcon, SearchCircleIcon, TrashIcon, FolderRemoveIcon, FireIcon } from "@heroicons/react/outline";

// Redux Component
import { selectCode, selectNode, selectStruct, selectTool, useHookDispatch } from "../../../state/dispatch";
import { CodeStateInterface, StructStateInterface, ToolStateInterface } from "../../../interface";
import { SearchAction, ToolAction } from "../../../state/actions";
import { ActionType } from "../../../state/action-types";

// React Component
import InsertTool from "./insertTool";
import RemoveTool from "./removeTool";
import SearchTool from "./searchTool";

// External function
import { UpdateNodeData } from "../../../api/nodeRequest";
import { UpdateCodeData, UpdateLogData, UpdateOperationData, UpdateSearchLogData } from "../../../api/codeRequest";

export default function ToolEditor() {
    // --- Lib
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // --- Redux component
    const nodeData: Array<any> = useSelector(selectNode);
    const { listId }: StructStateInterface = useSelector(selectStruct);
    const code: CodeStateInterface = useSelector(selectCode);
    const { toolIndex, editIndex }: ToolStateInterface = useSelector(selectTool);
    const {
        SetNodeData, SetAnimation, ResetNode,
        OpenToolIndex, CloseTool, OpenSnackbar,
        SetLastOperation, ResetCode, OpenNodeIndex,
        ResetAllTools,
    } = useHookDispatch();

    // --- Func
    function RedirectToDashboard() { navigate('/dashboard'); }

    function OpenToolInIndex(index: number) {
        if (toolIndex === index)
            OpenToolIndex(-1);
        else 
            OpenToolIndex(index);
    }

    // --- React render component
    function RenderTool() {
        switch (toolIndex) {
            case 1:
                return <InsertTool />
            case 2:
                return <SearchTool />
            case 3:
                return <RemoveTool />
        }
    }

    // --- Node Func
    function AddNewNodeInTail() {

        // Validation
        if (editIndex !== -1) {
            OpenSnackbar('You must fill empty node first', 1);
            OpenNodeIndex(editIndex);
            return;
        }
        // close all tool modal
        ResetAllTools();

        // Set node array value
        let newNode: Array<any> = [...nodeData, {}];
        SetNodeData(newNode);

        // Set last operation
        SetLastOperation('add');

        // Set Animation
        SetAnimation(newNode.length - 1, 'spawn', () => {});
    }

    function RemoveAllNode() {
        ResetNode();
        CloseTool();
        UpdateNodeData(listId, []);
    }

    function RemoveCodeAndLog() {
        ResetCode();
        CloseTool();
        UpdateCodeData(listId, '');
        UpdateOperationData(code.id, []);
        UpdateLogData(code.id, []);
        UpdateSearchLogData(code.id, []);
    }

    useEffect(() => {
        dispatch<SearchAction>({
            type: ActionType.RESETSEARCHRESULT
        });
        dispatch<ToolAction>({
            type: ActionType.RESETALLTOOLS
        });
    }, [dispatch]);

    return (
        <div className="absolute z-20 mt-8 ml-8 flex space-x-6 items-start">
            <div className="bg-white drop-shadow-5xl rounded-md">
                <div className='flex justify-center border-b border-gray-200 py-4'>
                    <button title='dashboard' className="focus:outline-none" onClick={RedirectToDashboard}>
                        <TemplateIcon className="w-8 h-8 text-black hover:text-cyan-dark transition duration-300" />
                    </button>
                </div>
                <div className="p-4 space-y-4 w-16">
                    <button title='Add New Node' className="focus:outline-none" onClick={AddNewNodeInTail} >
                        <ViewGridAddIcon className="w-8 h-8 text-black hover:text-cyan-dark transition duration-300" />
                    </button>
                    <button title='Insert New Node' className="focus:outline-none" onClick={() => OpenToolInIndex(1)} >
                        <CollectionIcon className="w-8 h-8 text-black hover:text-cyan-dark transition duration-300" />
                    </button>
                    <button title='Search Node' className="focus:outline-none" onClick={() => OpenToolInIndex(2)} >
                        <SearchCircleIcon className="w-8 h-8 text-black hover:text-cyan-dark transition duration-300" />
                    </button>
                    <button title='Remove Node Index' className="focus:outline-none" onClick={() => OpenToolInIndex(3)} >
                        <TrashIcon className="w-8 h-8 text-black hover:text-cyan-dark transition duration-300" />
                    </button>
                    <button title='Remove Logs' className="focus:outline-none" onClick={RemoveCodeAndLog} >
                        <FireIcon className="w-8 h-8 text-black hover:text-cyan-dark transition duration-300" />
                    </button>
                    <button title='Remove All Node' className="focus:outline-none" onClick={RemoveAllNode} >
                        <FolderRemoveIcon className="w-8 h-8 text-black hover:text-cyan-dark transition duration-300" />
                    </button>
                </div>
            </div>
            <div>
                {RenderTool()}
            </div>
        </div>
    );
}