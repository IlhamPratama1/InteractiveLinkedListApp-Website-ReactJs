// Lin
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
        SetLastOperation, ResetCode
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
        let newNode: Array<any> = [...nodeData, {}];
        SetNodeData(newNode);
        SetLastOperation('add');
        OpenEditNodeIndex(newNode.length - 1);
        CloseTool();
        UpdateNodeData(listId, newNode);
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
        <div className="absolute left-0 top-100 flex space-x-2 items-end">
            <div>
                <div className="bg-yellow-main p-4 w-16">
                    <button title='dashboard' onClick={RedirectToDashboard}><img className="w-8 cursor-pointer" alt="dashboard" src="/static/icons/dashboard.svg" /></button>
                </div>
                <div className="bg-yellow-second p-4 space-y-8 w-16">
                    <button title='Add New Node' onClick={AddNewNodeInTail} ><img  className="w-8 cursor-pointer" alt="add" src="/static/icons/layer.png" /></button>
                    <button title='Insert New Node' onClick={() => OpenToolInIndex(1)} ><img className="w-8 cursor-pointer" alt="insert" src="/static/icons/process.png" /></button>
                    <button title='Search Node' onClick={() => OpenToolInIndex(2)} ><img className="w-8 cursor-pointer" alt="delete" src="/static/icons/magnifying-glass.png" /></button>
                    <button title='Remove Node Index' onClick={() => OpenToolInIndex(3)} ><img className="w-8 cursor-pointer" alt="search" src="/static/icons/trash.png" /></button>
                    <button title='Remove Logs' onClick={RemoveCodeAndLog} ><img className="w-8 cursor-pointer" alt="search" src="/static/icons/remove-database.png" /></button>
                    <button title='Remove All Node' onClick={RemoveAllNode} ><img className="w-8 cursor-pointer" alt="search" src="/static/icons/eraser.png" /></button>
                </div>
            </div>
            <div>
                {RenderTool()}
            </div>
        </div>
    );
}