// components/ui/button.jsx
import React from "react";

const buttonVariants = {
  default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90",
  outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
};

const Button = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 ${buttonVariants[variant]} ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };
