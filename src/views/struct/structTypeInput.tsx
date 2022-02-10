import { useSelector } from "react-redux";
import { StructStateInterface } from "../../interface";
import { selectStruct } from "../../state/dispatch";
import { StructFormType } from "../../type";

type InputType = {
    data: StructFormType,
    index: number,
    HandleChange: Function
}

export function StructDisabledSelectInput({ data, index, HandleChange}: InputType) {
    // --- Redux state
    const { structName }: StructStateInterface = useSelector(selectStruct);

    return (
        <select disabled className="p-3 border w-44" onChange={((e) => HandleChange('type', e, index))} value={data.type} name="data-type" id="data-type">
            <option value={structName+ "*"}>{structName+ "*"}</option>
            <option value="int">Int</option>
            <option value="string">String</option>
            <option value="double">double</option>
            <option value="float">float</option>
        </select>
    );
}

export function StructSelectInput({ data, index, HandleChange}: InputType) {
    return (
        <select className="p-3 border w-44" onChange={e => HandleChange('type', e, index)} value={data.type} name="data-type" id="data-type">
            <option value="int">Int</option>
            <option value="string">String</option>
            <option value="double">double</option>
            <option value="float">float</option>
        </select>
    );
}

export function StructDisabledValueInput({ data, index, HandleChange }: InputType) {
    return ( <input disabled onChange={e => HandleChange('value', e, index)} className="focus:outline-none focus:border-yellow-main p-4 w-7/12 h-12 border" value={data.value}></input> );
}

export function StructValueInput({ data, index, HandleChange }: InputType) {
    return ( <input onChange={e => HandleChange('value', e, index)} className="focus:outline-none focus:border-yellow-main p-4 w-7/12 h-12 border" value={data.value}></input> );
}