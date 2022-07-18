import React, { ReactNode } from "react";

type TooltipType = {
    children: ReactNode,
    tooltipText: string
}


export default function Tooltip({ children, tooltipText }: TooltipType) {
    const tipRef = React.createRef<HTMLDivElement>();
    function handleMouseEnter() {
        if (tipRef.current !== null) {
            tipRef.current.style.opacity = "1";
            tipRef.current.style.marginLeft = "20px";
        }
    }
    function handleMouseLeave() {
        if (tipRef.current !== null) {
            tipRef.current.style.opacity = "0";
            tipRef.current.style.marginLeft = "10px";
        }
    }
    return (
        <div
            className="relative flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="w-36 absolute whitespace-no-wrap bg-gradient-to-r from-black to-gray-700 text-white px-4 py-2 rounded flex items-center transition-all duration-150"
                style={{ left: "100%", opacity: 0 }}
                ref={tipRef}
            >
                <div
                    className="bg-black absolute"
                    style={{ left: "-6px", transform: "rotate(45deg)" }}
                />
                {tooltipText}
            </div>
            {children}
        </div>
    );
}