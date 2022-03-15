// Lib
import { ArrowsExpandIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";

export default function ZoomEditor() {
    return (
        <div className="absolute z-20 left-8 bottom-8 bg-white drop-shadow-7xl p-4 flex items-center rounded-md space-x-4">
            <button className="focus:outline-none w-8 h-8"><ArrowsExpandIcon /></button>
            <button className="focus:outline-none w-8 h-8 bg-cyan-light"><MinusSmIcon /></button>
            <h1 className="text-sm font-roboto">100%</h1>
            <button className="focus:outline-none w-8 h-8 bg-cyan-light"><PlusSmIcon /></button>
        </div>
    );
}