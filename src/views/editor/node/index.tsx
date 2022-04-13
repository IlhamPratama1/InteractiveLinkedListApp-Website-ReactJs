// Lib
import React from "react";
import { useSelector } from "react-redux";
import Xarrow, { anchorType, Xwrapper } from "react-xarrows";

// Redux component
import { selectNode, selectProjectType } from "../../../state/dispatch";

// React compoenent
import Node from "./node";


export default function NodeEditor() {
    // --- Redux State
    const nodeData: Array<any> = useSelector(selectNode);
    const projectType: string = useSelector(selectProjectType);

    const RenderArrowType = (index: number) => {
        const tAnchor: anchorType = { position: "auto", offset: { y: -10 } }
        const bAnchor: anchorType = { position: "auto", offset: { y: 10 } }

        if(projectType === 'single') {
            return (
                index !== 0 && index < nodeData.length ?
                <Xarrow
                    key={index}
                    strokeWidth={2} 
                    color='#9DD9D8' 
                    start={`elem${index - 1}`} 
                    end={`elem${index}`} />
                : null
            );
        }

        if(projectType === 'double') {
            return (
                index !== 0 && index < nodeData.length ?
                <React.Fragment key={index}>
                    <Xarrow
                        strokeWidth={2} 
                        startAnchor={tAnchor}
                        endAnchor={tAnchor}
                        color='#9DD9D8' 
                        start={`elem${index - 1}`} 
                        end={`elem${index}`} />
                    <Xarrow
                        strokeWidth={2}
                        startAnchor={bAnchor}
                        endAnchor={bAnchor}
                        color='#9DD9D8' 
                        start={`elem${index}`} 
                        end={`elem${index - 1}`} />
                </React.Fragment>
                : null
            );
        } else {
            return (
                nodeData.length > 1
                    ? <Xarrow
                        strokeWidth={2} 
                        color='#9DD9D8' 
                        start={`elem${index === 0 ? nodeData.length - 1 : index - 1}`} 
                        end={`elem${index === 0 ? 0 : index}`}
                        startAnchor={index === 0 ? 'top' : 'auto'}
                        endAnchor={index === 0 ? 'top' : 'auto'}
                        _cpy1Offset={index === 0 ? -100 : 0}
                        _cpy2Offset={index === 0 ? -100 : 0} />
                : null
            );
        }
    }

    return (
        <div className="absolute w-screen h-screen-lg overflow-hidden flex items-center justify-center">
            <Xwrapper>
                {nodeData.map((data, i) => (
                    <div key={i}>
                       <Node index={i} data={data} />
                       {RenderArrowType(i)}
                    </div>
                ))}
            </Xwrapper>
        </div>
    );
}