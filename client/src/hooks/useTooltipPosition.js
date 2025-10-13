import { useLayoutEffect, useState } from "react";

export const useTooltipPosition = (target, tooltip) => {
    const [pos, setPost] = useState({
        top: 0,
        left: 0,
    });

    useLayoutEffect(() => {
        if (!target || !tooltip) return;
        const targetRect = target.current.getBoundingClientRect();
        const tooltipRect = tooltip.current.getBoundingClientRect();
        let top = targetRect.bottom + 14;
        let left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;

        setPost({ top, left });
    }, [target, tooltip]);

    return pos;
};