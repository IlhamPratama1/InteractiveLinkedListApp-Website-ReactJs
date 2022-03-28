// Lib
import React, { useLayoutEffect } from "react";
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
        }

        if(projectType === 'circular') {
            return (
                nodeData.length > 1 ?
                <Xarrow
                    key={index}
                    strokeWidth={2} 
                    color='#9DD9D8' 
                    start={`elem${index}`} 
                    end={`elem${index === nodeData.length - 1 ? 0 : index + 1}`}
                    startAnchor={index === nodeData.length - 1 ? 'top' : 'auto'}
                    endAnchor={index === nodeData.length - 1 ? 'top' : 'auto'}
                    _cpy1Offset={index === nodeData.length - 1 ? -100 : 0}
                    _cpy2Offset={index === nodeData.length - 1 ? -100 : 0} />
                : null
            );
        }
    }

    useLayoutEffect(() => {
        if(nodeData.length !== 0) console.log("node update");
    }, [nodeData.length]);
    
    return (
        <div className="absolute w-screen h-screen-lg overflow-hidden flex items-center justify-center">
            <Xwrapper>
                {nodeData.map((data, i) => {
                    return ( 
                        <Node key={i} index={i} data={data} />
                    );
                })}
                {nodeData.map((data, i) => {
                    return(
                        RenderArrowType(i)
                    );
                })}
            </Xwrapper>
        </div>
    );
}