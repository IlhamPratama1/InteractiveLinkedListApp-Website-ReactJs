import { useSelector } from "react-redux";
import { selectStruct } from "../../../state/dispatch";

export default function EditModal() {
    const { structData } = useSelector(selectStruct)

    return (
        <div className="py-4 px-4 bg-purple-third rounded-xl space-y-4">
            {structData.map((variable, i) => {
                return(
                    <div key={i} className="space-y-1">
                        <label className="font-source text-lg">{variable.value}</label>
                        <br />
                    </div>
                );
            })}
            <button className="text-xs font-bold font-playfair py-2 px-4 bg-purple-main hover:bg-purple-second text-white-main hover:text-black-main transition duration-300">submit</button>
        </div> 
    );
}