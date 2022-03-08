// Lib
import { ArrowsExpandIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";

type ZoomType = {
    ZoomIn: any,
    ZoomOut: any,
    ResetZoom: any
}

export default function ZoomEditor({ ZoomIn, ZoomOut, ResetZoom}: ZoomType) {
    return (
        <div className="absolute z-20 left-8 bottom-8 bg-white drop-shadow-7xl p-4 flex items-center rounded-md space-x-4">
            <button onClick={() => ResetZoom()} className="focus:outline-none w-8 h-8"><ArrowsExpandIcon /></button>
            <button onClick={() => ZoomOut()} className="focus:outline-none w-8 h-8 bg-cyan-light"><MinusSmIcon /></button>
            <h1 className="text-sm font-roboto">100%</h1>
            <button onClick={() => ZoomIn()} className="focus:outline-none w-8 h-8 bg-cyan-light"><PlusSmIcon /></button>
        </div>
    );
}