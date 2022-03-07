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
        return <input disabled value={disabledValue} className="focus:outline-none px-2 py-2 w-full rounded-sm text-sm"></input>
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
        <div className="py-4 px-4 bg-white rounded-sm space-y-3 drop-shadow-9xl font-roboto">
            {structData.map((variable, i) => {
                return(
                    <div key={i} className="space-y-1">
                        <label className="text-sm font-bold opacity-60">{variable.value}</label>
                        {RenderNodeValue(variable, i)}
                    </div>
                );
            })}
        </div> 
    );
}