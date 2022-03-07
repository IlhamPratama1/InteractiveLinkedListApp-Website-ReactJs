// Lib
import { useSelector } from "react-redux";

// Redux component
import { selectCode, selectNode, selectProjectType, selectStruct } from "../../../state/dispatch";
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
    const { lastOperation } = useSelector(selectCode);
    const { listId, structData }: StructStateInterface = useSelector(selectStruct);
    const { SetNodeData, CloseDetailNode, GenerateCode, SetQuestComplete } = useHookDispatch();

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
        SetQuestComplete(lastOperation, projectType);
    }

    // --- React render component
    const inputDisabledValue = (disabledValue: string | number, placeholder: string) => {
        return <input disabled value={disabledValue} placeholder={placeholder} className="focus:outline-none px-2 py-2 w-full rounded-sm text-sm"></input>
    }
    const inputValue = (variable: StructFormType) => {
        return <input value={data[variable.value] || ''} onChange={e => UpdateNodeForm(variable, e)} placeholder={variable.type} className="focus:outline-none p-2 py-2 w-full border rounded-sm text-sm"></input>
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
        <div className="py-4 px-4 bg-white rounded-sm space-y-3 drop-shadow-9xl font-roboto">
            {structData.map((variable, i) => {
                return(
                    <div key={i} className="space-y-1">
                        <label className="text-sm font-bold opacity-50">{variable.value}</label>
                        {RenderNodeValue(variable, i)}
                    </div>
                );
            })}
            <button onClick={SubmitNodeData} className="focus:outline-none bg-cyan-light text-black rounded-md px-5 py-2 font-bold text-sm">submit</button>
        </div> 
    );
}