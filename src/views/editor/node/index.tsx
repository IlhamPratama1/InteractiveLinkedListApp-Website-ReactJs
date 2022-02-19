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
        <div className="mx-auto w-4/5 flex justify-evenly">
            {nodeData.map((data, i) => {
                return (
                    <Node key={i} index={i} data={data}  />
                );
            })}
        </div>
    );
}