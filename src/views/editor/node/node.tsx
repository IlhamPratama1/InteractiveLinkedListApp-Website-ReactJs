// Lib
import { useSelector } from "react-redux";

// Redux component
import { selectSearch, selectTool, useHookDispatch } from "../../../state/dispatch";
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
    const searchResult: number = useSelector(selectSearch);
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
        <div className="w-52">
            <div className="flex justify-center">
                <button onClick={HandleNodeButton} className={`focus:outline-none cursore-pointer py-4 px-12 text-xl text-white rounded-xl bg-purple-main
                    ${ searchResult === index ? 'bg-purple-main' : 'bg-purple-second'}`}>{index}</button>
            </div>
            {RenderNodeModal()}
        </div>
    );
}