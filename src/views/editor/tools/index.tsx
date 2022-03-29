// Lin
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TemplateIcon, ViewGridAddIcon, CollectionIcon, SearchCircleIcon, TrashIcon, FolderRemoveIcon, FireIcon, PencilAltIcon } from "@heroicons/react/outline";

// Redux Component
import { selectCode, selectNode, selectStruct, selectTool, useHookDispatch } from "../../../state/dispatch";
import { CodeStateInterface, StructStateInterface, ToolStateInterface } from "../../../interface";

// React Component
import InsertTool from "./insertTool";
import RemoveTool from "./removeTool";
import SearchTool from "./searchTool";

// External function
import { UpdateNodeData } from "../../../api/nodeRequest";
import { UpdateCodeData, UpdateLogData, UpdateOperationData, UpdateSearchLogData } from "../../../api/codeRequest";

export default function ToolEditor() {
    // --- Router
    const navigate = useNavigate();

    // --- Redux component
    const nodeData: Array<any> = useSelector(selectNode);
    const { listId }: StructStateInterface = useSelector(selectStruct);
    const code: CodeStateInterface = useSelector(selectCode);
    const { toolIndex }: ToolStateInterface = useSelector(selectTool);
    const {
        SetNodeData, OpenEditNodeIndex, ResetNode,
        OpenToolIndex, CloseTool,
        SetLastOperation, ResetCode,
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
        let newNode: Array<any> = [...nodeData, {"key": Date.now()}];
        SetNodeData(newNode);
        SetLastOperation('add');
        OpenEditNodeIndex(newNode.length - 1);
        CloseTool();
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
                    <button title='Edit Node' className="focus:outline-none">
                        <PencilAltIcon className="w-8 h-8 text-black hover:text-cyan-dark transition duration-300" />
                    </button>
                </div>
            </div>
            <div>
                {RenderTool()}
            </div>
        </div>
    );
}