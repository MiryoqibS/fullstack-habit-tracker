import React, { useRef } from 'react'
import { useTooltipPosition } from '../../hooks/useTooltipPosition';

export const Tooltip = ({ targetRef, children, show }) => {
    const tooltipRef = useRef(null);
    const { top, left } = useTooltipPosition(targetRef, tooltipRef);

    return (
        <div
            ref={tooltipRef}
            className={`absolute bg-gray-700 rounded text-white flex items-center justify-center
            px-4 py-2 shadow-lg transition-opacity duration-500
            ${show ? "opacity-100 visible" : "opacity-0 invisible"} z-[999]`}
            style={{ top, left, position: "fixed" }}
        >
            <span className="absolute -top-2 left-1/2 -translate-x-1/2
            w-0 h-0 border-l-8 border-r-8 border-b-8
            border-l-transparent border-r-transparent border-b-gray-700"
            />

            <p className="text-xs text-center">{children}</p>
        </div>
    )
}
