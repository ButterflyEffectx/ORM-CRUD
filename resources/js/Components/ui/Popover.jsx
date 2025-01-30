import React, { useState, useRef, useEffect } from "react";

const Popover = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block">
            {React.Children.map(children, (child) => {
                if (child.type === PopoverTrigger) {
                    return React.cloneElement(child, { setIsOpen });
                } else if (child.type === PopoverContent) {
                    return React.cloneElement(child, { setIsOpen, isOpen });
                }
                return child;
            })}
        </div>
    );
};

const PopoverTrigger = ({ children, setIsOpen, ...props }) => {
    const handleClick = (event) => {
        event.preventDefault();  // Prevent the form from being submitted
        setIsOpen(prev => !prev);
    };

    return (
        <div onClick={handleClick} {...props}>
            {children}
        </div>
    );
};

const PopoverContent = React.forwardRef(({
    children,
    className = "",
    align = "center",
    sideOffset = 4,
    setIsOpen,
    isOpen,
    ...props
}, ref) => {
    const popoverRef = useRef(null);

    const handleClick = (event) => {
        event.stopPropagation(); // Prevent click from bubbling up to the form and triggering submit
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!isOpen) return null;

    const alignmentClasses = {
        center: "left-1/2 -translate-x-1/2",
        start: "left-0",
        end: "right-0"
    };

    return (
        <div
            ref={popoverRef}
            className={`absolute z-50 mt-2 ${alignmentClasses[align]} animate-in fade-in-0 zoom-in-95 rounded-md border border-slate-200 bg-white p-4 shadow-md outline-none ${className}`}
            onClick={handleClick} // Prevent form submit here as well
            {...props}
        >
            {children}
        </div>
    );
});

PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
