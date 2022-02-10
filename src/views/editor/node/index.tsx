import { useSelector } from "react-redux";
import { selectNode } from "../../../state/dispatch";
import Node from "./node";

export default function NodeEditor() {
    const node = useSelector(selectNode);
    return (
        <div className="mx-auto w-4/5 flex justify-evenly">
            {node.map((data, i) => {
                return (
                    <Node key={i} index={i} data={data}  />
                );
            })}
        </div>
    );
}