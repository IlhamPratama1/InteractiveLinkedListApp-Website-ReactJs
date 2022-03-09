// Lib
import { useSelector } from "react-redux";
import Moveable, { OnDrag } from "react-moveable";
import { useRef } from "react";

// Redux component
import { selectTool, useHookDispatch } from "../../../state/dispatch";
import { ToolStateInterface } from "../../../interface";

// React component
import EditModal from "./editModal";
import NodeModal from "./nodeModal";
import React from "react";


type NodeType = {
    index: number,
    data: any
}

export default function Node({ index, data }: NodeType) {
    // --- Lib
    const targetRef = useRef<HTMLDivElement>(null);

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
        <React.Fragment>
            <div ref={targetRef} className="w-48 space-y-3 absolute z-30 block">
                <div className="flex justify-center">
                    <button onClick={HandleNodeButton} className={`focus:outline-none py-3 px-12 rounded-md text-lg transition duration-300
                        ${ nodeIndex === index ? 'bg-cyan-dark' : 'bg-cyan-light'}`}>{index}</button>
                </div>
                {RenderNodeModal()}
            </div>
            <Moveable
                target={targetRef}
                draggable={true}
                checkInput={true}
                onDrag={ ({ target, transform }: OnDrag) => {
                    target!.style.transform = transform;
                }}
            />
        </React.Fragment>
    );
}