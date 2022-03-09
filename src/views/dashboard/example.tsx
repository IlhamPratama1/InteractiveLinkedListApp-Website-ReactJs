import Moveable, { OnDrag } from "react-moveable";
import { useRef } from "react";

export default function ExampleView() {
    const targetRef = useRef<HTMLDivElement>(null);
    const targetRef2 = useRef<HTMLDivElement>(null);
    return (
        <div className="container">
            <div className="target w-20 h-20 bg-cyan-dark" ref={targetRef}>asd</div>
            <Moveable
                target={targetRef}

                draggable={true}
                throttleDrag={0}
                onDragStart={({ target, clientX, clientY }) => {
                    console.log("onDragStart", target);
                }}
                onDrag={({
                    target,
                    beforeDelta, beforeDist,
                    left, top,
                    right, bottom,
                    delta, dist,
                    transform,
                    clientX, clientY,
                }: OnDrag) => {
                    console.log("onDrag left, top", left, top);
                    // target!.style.left = `${left}px`;
                    // target!.style.top = `${top}px`;
                    console.log("onDrag translate", dist);
                    target!.style.transform = transform;
                }}
                onDragEnd={({ target, isDrag, clientX, clientY }) => {
                    console.log("onDragEnd", target, isDrag);
                }}
                />
            <div className="target w-20 h-20 bg-cyan-dark" ref={targetRef2}>asd</div>
            <Moveable
                target={targetRef2}

                draggable={true}
                throttleDrag={0}
                onDragStart={({ target, clientX, clientY }) => {
                    console.log("onDragStart", target);
                }}
                onDrag={({
                    target,
                    beforeDelta, beforeDist,
                    left, top,
                    right, bottom,
                    delta, dist,
                    transform,
                    clientX, clientY,
                }: OnDrag) => {
                    console.log("onDrag left, top", left, top);
                    // target!.style.left = `${left}px`;
                    // target!.style.top = `${top}px`;
                    console.log("onDrag translate", dist);
                    target!.style.transform = transform;
                }}
                onDragEnd={({ target, isDrag, clientX, clientY }) => {
                    console.log("onDragEnd", target, isDrag);
                }}
                />
        </div>
    );
}