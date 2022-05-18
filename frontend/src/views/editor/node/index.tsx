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
    const [arrowRef, setArrowRef] = useState<Array<RefObject<HTMLDivElement>>>([]);

    const RenderArrowType = (index: number) => {
        const tAnchor: anchorType = { position: "auto", offset: { y: -10 } }
        const bAnchor: anchorType = { position: "auto", offset: { y: 10 } }

        switch (projectType) {
            // Render single linked list arrow
            case 'single':
                return (
                    index !== 0 && index < nodeData.length ?
                    <div ref={arrowRef[index]} key={index} >
                        <Xarrow
                            strokeWidth={2} 
                            color='#9DD9D8' 
                            start={`elem${index - 1}`} 
                            end={`elem${index}`}
                        />
                    </div>
                    : null
                );
                
            // Render double linked list arrow
            case 'double':
                return (
                    index !== 0 && index < nodeData.length ?
                    <div ref={arrowRef[index]} key={index}>
                        <Xarrow
                            strokeWidth={2} 
                            startAnchor={tAnchor}
                            endAnchor={tAnchor}
                            color='#9DD9D8' 
                            start={`elem${index - 1}`} 
                            end={`elem${index}`}
                        />
                        <Xarrow
                            strokeWidth={2}
                            startAnchor={bAnchor}
                            endAnchor={bAnchor}
                            color='#9DD9D8' 
                            start={`elem${index}`} 
                            end={`elem${index - 1}`}
                        />
                    </div>
                    : null
                );

            // Render Circular linked list arrow
            default:
                return (
                    nodeData.length > 1
                        ?
                        <div ref={arrowRef[index]} key={index}>
                            <Xarrow
                                key={index}
                                strokeWidth={2} 
                                color='#9DD9D8' 
                                start={`elem${index === 0 ? nodeData.length - 1 : index - 1}`} 
                                end={`elem${index === 0 ? 0 : index}`}
                                startAnchor={index === 0 ? 'top' : 'auto'}
                                endAnchor={index === 0 ? 'top' : 'auto'}
                                _cpy1Offset={index === 0 ? -100 : 0}
                                _cpy2Offset={index === 0 ? -100 : 0}
                            />
                        </div>
                    : null
                );
        };
    }

    // --- update nodeRef Value
    useEffect(() => {
        setNodeRef(nodeRef => (
          Array(nodeData.length).fill(undefined).map((_, i) => nodeRef[i] || createRef())
        ));
        setArrowRef(arrowRef => (
            Array(nodeData.length).fill(undefined).map((_, i) => arrowRef[i] || createRef())
        ));
    }, [nodeData.length]);

     // --- Node animation
    const SpawnNodeAnimation = useCallback((
        index: number, refObject: HTMLDivElement | null,
        value: number,
    ) => {
        gsap.timeline()
            .to(refObject, {
                delay: 0.15,
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
        nodeObject: HTMLDivElement | null,
        arrowObject: HTMLDivElement | null,
        value: number, callback: Function
    ) => {
        gsap.timeline()
            .to(nodeObject, {
                opacity: value,
                scale: value,
                duration: 0.5,
                ease: "power1.inOut",
                onComplete: () => {
                    
                    // Reset ref
                    gsap.to(nodeObject, {
                        opacity: 1,
                        scale: 1,
                        duration: 0
                    });
                    gsap.to(arrowObject, {
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

    // --- Arrow animation
    const SpawnArrowAnimation = useCallback((
        arrowObject: HTMLDivElement | null,
        nodeObject: HTMLDivElement | null,
        initialValue: number, value: number,
    ) => {
        gsap.timeline()
        .from(arrowObject, {
            startAt: {
                opacity: initialValue,
            },
            duration: initialValue
        })
        .from(nodeObject, {
            startAt: {
                opacity: initialValue,
            },
            duration: initialValue
        })
        .to(arrowObject, {
            delay: animState.index === 0 ? 0 : 0.15,
            opacity: value,
            duration: animState.index === 0 ? 0 : 0.25,
            ease: "linear",
            onComplete: () => {
                SpawnNodeAnimation(animState.index, nodeRef[animState.index].current, 1);
            }
        });
    }, [animState.index, nodeRef, SpawnNodeAnimation]);

    const DestroyArrowAnimation = useCallback((
        arrowObject: HTMLDivElement | null,
        nodeObject: HTMLDivElement | null,
        value: number
    ) => {
        gsap.timeline()
            .to(arrowObject, {
                opacity: value,
                duration: 0.5,
                ease: "power1.inOut",
                onComplete: () => {
                    return DestroyNodeAnimation(nodeObject, arrowObject, 0, animState.callback);
                }
            });
    }, [DestroyNodeAnimation, animState]);

    // --- Execute animation
    useEffect(() => {
        if (arrowRef[animState.index] !== undefined && nodeRef[animState.index] !== undefined) {
            switch (animState.type) {
                case 'spawn':
                    return SpawnArrowAnimation(arrowRef[animState.index].current, nodeRef[animState.index].current, 0, 1);
                case 'destroy':
                    return DestroyArrowAnimation(arrowRef[animState.index].current, nodeRef[animState.index].current, 0);
                default:
                    return;
            }
        }
    }, [animState, arrowRef, nodeRef, SpawnArrowAnimation, DestroyArrowAnimation]);


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