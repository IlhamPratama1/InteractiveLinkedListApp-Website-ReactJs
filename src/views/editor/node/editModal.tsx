// Lib
import { useSelector } from "react-redux";

// Redux component
import { selectNode, selectProjectType, selectStruct } from "../../../state/dispatch";
import { NodeModalType, StructFormType } from "../../../type";
import { useHookDispatch } from "../../../state/dispatch";
import { StructStateInterface } from "../../../interface";

// External function
import { CheckRegexValidation } from "../../../regex";
import { UpdateNodeData } from "../../../api/nodeRequest";


export default function EditModal({ index, data }: NodeModalType ) {
    // --- Redux State
    const projectType: string = useSelector(selectProjectType);
    const nodeData: Array<any> = useSelector(selectNode);
    const { listId, structData }: StructStateInterface = useSelector(selectStruct);
    const { SetNodeData, CloseDetailNode, GenerateCode } = useHookDispatch();

    // --- OnChange
    function UpdateNodeForm (variable: StructFormType, event: React.ChangeEvent<HTMLInputElement>) {
        const re: RegExp = CheckRegexValidation(variable.type);
        if (event.target.value === '' || re.test(event.target.value)) {
            const old: any = nodeData[index];
            const updated: any = { ...old, [variable.value]: event.target.value }
            const clone: Array<any> = [...nodeData];
            clone[index] = updated;
            SetNodeData(clone);
        }
    }

    // --- OnSubmit
    function SubmitNodeData () {
        CloseDetailNode();
        GenerateCode(index, index, '');
        UpdateNodeData(listId, nodeData);
    }

    // --- React render component
    const inputDisabledValue = (disabledValue: string | number, placeholder: string) => {
        return <input disabled value={disabledValue} placeholder={placeholder} className="focus:outline-none focus:border-purple-main p-4 h-5 w-44 border rounded-xl"></input>
    }
    const inputValue = (variable: StructFormType) => {
        return <input value={data[variable.value] || ''} onChange={e => UpdateNodeForm(variable, e)} placeholder={variable.type} className="focus:outline-none focus:border-purple-main p-4 h-5 w-44 border rounded-xl"></input>
    }
    const RenderNodeValue = (variable: StructFormType, i: number) => {
        if (projectType === 'single') {
            if (i === 0) {
                return inputDisabledValue(nodeData[index + 1] ? index + 1 : "NULL", variable.type);
            } else {
                return inputValue(variable);
            }
        } 
        if (projectType === 'double') {
            if (i === 0) {
                return inputDisabledValue(nodeData[index + 1] ? index + 1 : "NULL", variable.type);
            }
            if (i === 1) {
                return inputDisabledValue(nodeData[index - 1] ? index - 1 : "NULL", variable.type);
            }
            else {
                return inputValue(variable);
            }
        }
        if (projectType === 'circular') {
            if (i === 0) {
                return inputDisabledValue(nodeData[index + 1] ? index + 1 : 0, variable.type);
            } else {
                return inputValue(variable);
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
            <button onClick={SubmitNodeData} className="text-xs font-bold font-playfair py-2 px-4 bg-purple-main hover:bg-purple-second text-white-main hover:text-black-main transition duration-300">submit</button>
        </div> 
    );
}