"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface ScrollIndicatorProps {
    targetId?: string;
    className?: string;
}

export default function ScrollIndicator({ targetId, className = "" }: ScrollIndicatorProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Hide indicator after scrolling 100px
            setIsVisible(window.scrollY < 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        if (targetId) {
            document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
        }
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={handleClick}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce ${className}`}
            aria-label="Scroll down"
        >
            <div className="flex flex-col items-center gap-1">
                <div className="text-xs text-zinc-400 font-medium">Scroll</div>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                    <ChevronDown className="w-5 h-5 text-white" />
                </div>
            </div>
        </button>
    );
}
