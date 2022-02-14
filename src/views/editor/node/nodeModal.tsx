// Lib
import { useSelector } from "react-redux";

// Redux component
import { selectNode, selectProjectType, selectStruct } from "../../../state/dispatch";
import { NodeModalType, StructFormType } from "../../../type";
import { StructStateInterface } from "../../../interface";


export default function NodeModal({ index, data }: NodeModalType ) {
    // --- Redux State
    const nodeData: Array<any> = useSelector(selectNode);
    const projectType: string = useSelector(selectProjectType);
    const { structData }: StructStateInterface = useSelector(selectStruct);

    // --- React render function
    const inputDisabledValue = (disabledValue: string | number) => {
        return <input disabled value={disabledValue} className="focus:outline-none focus:border-purple-main p-4 h-5 w-44 border rounded-xl"></input>
    }
    const RenderNodeValue = (variable: StructFormType, i: number) => {
        if (projectType === 'single') {
            if (i === 0) {
                return inputDisabledValue(nodeData[index + 1] ? index + 1 : "NULL");
            } else {
                return inputDisabledValue(data[variable.value] || '');
            }
        } 
        if (projectType === 'double') {
            if (i === 0) {
                return inputDisabledValue(nodeData[index + 1] ? index + 1 : "NULL");
            }
            if (i === 1) {
                return inputDisabledValue(nodeData[index - 1] ? index - 1 : "NULL");
            }
            else {
                return inputDisabledValue(data[variable.value] || '');
            }
        }
        if (projectType === 'circular') {
            if (i === 0) {
                return inputDisabledValue(nodeData[index + 1] ? index + 1 : 0);
            } else {
                return inputDisabledValue(data[variable.value] || '');
            }
        }
    }

    return (
        <div className="py-4 px-4 bg-purple-third rounded-xl space-y-4">
            {structData.map((variable, i) => {
                return(
                    <div key={i} className="space-y-1">
                        <label className="font-source text-lg">{variable.value}</label>
                        <br />
                        {RenderNodeValue(variable, i)}
                    </div>
                );
            })}
        </div> 
    );
}