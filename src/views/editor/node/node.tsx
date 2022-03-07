// Lib
import { useSelector } from "react-redux";

// Redux component
import { selectTool, useHookDispatch } from "../../../state/dispatch";
import { ToolStateInterface } from "../../../interface";

// React component
import EditModal from "./editModal";
import NodeModal from "./nodeModal";


type NodeType = {
    index: number,
    data: any
}

export default function Node({ index, data }: NodeType) {
    // --- Redux State
    const { nodeIndex, editIndex }: ToolStateInterface = useSelector(selectTool);
    const { OpenNodeIndex, CloseNode } = useHookDispatch();

    // --- Func
    function HandleNodeButton() {
        if (index === nodeIndex) {
            CloseNode();
        } else {
            OpenNodeIndex(index);
        }
    }

    // --- React render component
    function RenderNodeModal() {
        if (index === nodeIndex && index === editIndex) {
            return <EditModal index={index} data={data} />
        } else if (index === nodeIndex) {
            return <NodeModal index={index} data={data} />
        }
    }

    return (
        <div className="w-48 space-y-3">
            <div className="flex justify-center">
                <button onClick={HandleNodeButton} className={`focus:outline-none py-3 px-12 rounded-md text-lg
                    ${ nodeIndex === index ? 'bg-cyan-dark' : 'bg-cyan-light'}`}>{index}</button>
            </div>
            {RenderNodeModal()}
        </div>
    );
}