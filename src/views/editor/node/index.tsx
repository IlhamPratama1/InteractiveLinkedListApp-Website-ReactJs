// Lib
import { useSelector } from "react-redux";

// Redux component
import { selectNode } from "../../../state/dispatch";

// React compoenent
import Node from "./node";


export default function NodeEditor() {
    // --- Redux State
    const nodeData: Array<any> = useSelector(selectNode);
    
    return (
        <div className="mx-auto h-3/5 flex justify-evenly items-center">
            {nodeData.map((data, i) => {
                return (
                    <Node key={i} index={i} data={data}  />
                );
            })}
        </div>
    );
}