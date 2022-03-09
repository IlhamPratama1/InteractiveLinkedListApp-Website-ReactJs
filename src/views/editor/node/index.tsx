// Lib
import { useSelector } from "react-redux";
import { TransformComponent } from "react-zoom-pan-pinch";

// Redux component
import { selectNode } from "../../../state/dispatch";

// React compoenent
import Node from "./node";


export default function NodeEditor() {
    // --- Redux State
    const nodeData: Array<any> = useSelector(selectNode);
    
    return (
        <TransformComponent>
            <div className="w-screen h-screen-lg">
                {nodeData.map((data, i) => {
                    return ( 
                        <Node key={i} index={i} data={data} />
                    );
                })}
            </div>
        </TransformComponent>
    );
}