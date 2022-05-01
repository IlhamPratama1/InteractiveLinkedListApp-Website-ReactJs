// Lib
import React, { useEffect, createRef, useState, RefObject, useCallback } from "react";
import gsap from "gsap";
import { useSelector, useDispatch } from "react-redux";
import Xarrow, { anchorType, Xwrapper } from "react-xarrows";

// Redux component
import { selectAnim, selectNode, selectProjectType } from "../../../state/dispatch";
import { AnimStateInterface } from "../../../interface";

// React compoenent
import Node from "./node";
import { AnimAction, ToolAction } from "../../../state/actions";
import { ActionType } from "../../../state/action-types";


export default function NodeEditor() {
    // --- lib
    const dispatch = useDispatch();

    // --- Redux State
    const nodeData: Array<any> = useSelector(selectNode);
    const projectType: string = useSelector(selectProjectType);
    const animState: AnimStateInterface = useSelector(selectAnim);

    // --- React state
    const [nodeRef, setNodeRef] = useState<Array<RefObject<HTMLDivElement>>>([]);

    const RenderArrowType = (index: number) => {
        const tAnchor: anchorType = { position: "auto", offset: { y: -10 } }
        const bAnchor: anchorType = { position: "auto", offset: { y: 10 } }

        switch (projectType) {
            // Render single linked list arrow
            case 'single':
                return (
                    index !== 0 && index < nodeData.length ?
                    <Xarrow
                        key={index}
                        strokeWidth={2} 
                        color='#9DD9D8' 
                        start={`elem${index - 1}`} 
                        end={`elem${index}`} 
                        animateDrawing={0.5}
                    />
                    : null
                );
                
            // Render double linked list arrow
            case 'double':
                return (
                    index !== 0 && index < nodeData.length ?
                    <React.Fragment key={index}>
                        <Xarrow
                            strokeWidth={2} 
                            startAnchor={tAnchor}
                            endAnchor={tAnchor}
                            color='#9DD9D8' 
                            start={`elem${index - 1}`} 
                            end={`elem${index}`}
                            animateDrawing={0.25}
                        />
                        <Xarrow
                            strokeWidth={2}
                            startAnchor={bAnchor}
                            endAnchor={bAnchor}
                            color='#9DD9D8' 
                            start={`elem${index}`} 
                            end={`elem${index - 1}`}
                            animateDrawing={0.25}
                        />
                    </React.Fragment>
                    : null
                );

            // Render Circular linked list arrow
            default:
                return (
                    nodeData.length > 1
                        ? <Xarrow
                            key={index}
                            strokeWidth={2} 
                            color='#9DD9D8' 
                            start={`elem${index === 0 ? nodeData.length - 1 : index - 1}`} 
                            end={`elem${index === 0 ? 0 : index}`}
                            startAnchor={index === 0 ? 'top' : 'auto'}
                            endAnchor={index === 0 ? 'top' : 'auto'}
                            _cpy1Offset={index === 0 ? -100 : 0}
                            _cpy2Offset={index === 0 ? -100 : 0}
                            animateDrawing={0.5}
                        />
                    : null
                );
        };
    }

    // --- update nodeRef Value
    useEffect(() => {
        setNodeRef(nodeRef => (
          Array(nodeData.length).fill(undefined).map((_, i) => nodeRef[i] || createRef())
        ));
    }, [nodeData.length]);

    // --- Node animation
    const SpawnNodeAnimation = useCallback((
        index: number, refObject: HTMLDivElement | null,
        initialValue: number, value: number,
    ) => {
        gsap.timeline()
            .from(refObject, {
                startAt: {
                    opacity: initialValue,
                    scale: initialValue
                },
                duration: initialValue
            })
            .to(refObject, {
                delay: 0.25,
                opacity: value,
                scale: value,
                duration: 0.5,
                ease: "power1.inOut",
                onComplete: () => {

                    // Open Edit modal
                    dispatch<ToolAction>({
                        type: ActionType.EDITNODEINDEX,
                        payload: index
                    });

                    // reset animation
                    dispatch<AnimAction>({
                        type: ActionType.RESETANIMATION
                    });
                }
            });
    }, [dispatch]);

    const DestroyNodeAnimation = useCallback((
        refObject: HTMLDivElement | null,
        value: number, callback: Function
    ) => {
        gsap.timeline()
            .to(refObject, {
                opacity: value,
                scale: value,
                duration: 0.5,
                ease: "power1.inOut",
                onComplete: () => {
                    
                    // Reset ref
                    gsap.to(refObject, {
                        opacity: 1,
                        scale: 1,
                        duration: 0
                    });

                    // Eeset animation
                    dispatch<AnimAction>({
                        type: ActionType.RESETANIMATION
                    });

                    // Execute callback
                    callback();
                }
            });
    }, [dispatch]);

    // --- Execute animation
    useEffect(() => {
        if (nodeRef[animState.index] !== undefined) {
            switch (animState.type) {
                case 'spawn':
                    return SpawnNodeAnimation(animState.index, nodeRef[animState.index].current, 0, 1);
                case 'destroy':
                    return DestroyNodeAnimation(nodeRef[animState.index].current, 0, animState.callback);
                default:
                    return;
            }
        }
    }, [animState, nodeRef, SpawnNodeAnimation, DestroyNodeAnimation]);


    return (
        <div className="absolute w-screen h-screen-lg overflow-hidden">
            <Xwrapper>
                {nodeData.map((data, i) => (
                    <Node key={i} index={i} data={data} nodeRef={nodeRef[i]} />
                ))}
                {nodeData.map((data, i) => (
                    RenderArrowType(i)
                ))}
            </Xwrapper>
        </div>
    );
}