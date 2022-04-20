// Lib
import { RefObject } from "react";
import { useSelector } from "react-redux";
import Draggable from "react-draggable";
import { useXarrow } from "react-xarrows";

// Redux component
import { selectTool, useHookDispatch } from "../../../state/dispatch";
import { ToolStateInterface } from "../../../interface";

// React component
import EditModal from "./editModal";
import NodeModal from "./nodeModal";


type NodeType = {
    index: number,
    data: any,
    nodeRef: RefObject<HTMLDivElement>,
}

export default function Node({ index, data, nodeRef }: NodeType) {
    // --- Lib
    const updateXarrow = useXarrow();

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
        <Draggable handle="button" onDrag={updateXarrow} onStop={updateXarrow}>
            <div ref={nodeRef} className='absolute w-48 space-y-3' 
                style={{ 
                    left: `${25 + index * 12.5}rem`,
                    top: `7.5rem`,
                }}>
                <div className="flex justify-center">
                    <button id={`elem${index}`} onClick={HandleNodeButton} className={`focus:outline-none py-3 px-12 rounded-md text-lg transition duration-300
                        ${ nodeIndex === index ? 'bg-cyan-dark' : 'bg-cyan-light'}`}>{index}</button>
                </div>
                {RenderNodeModal()}
            </div>
        </Draggable>
    );
}