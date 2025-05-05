"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CTAButton = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  icon = true,
  ...props
}) => {
  // Variant styles
  const variants = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white",
    secondary: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
    ghost: "text-orange-500 hover:bg-orange-50",
  };

  // Size styles
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  // Base classes
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2";

  // Combined classes
  const combinedClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  // Render as button or link
  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...props}>
        {children}
        {icon && <ArrowRight className="ml-2 w-4 h-4" />}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses} {...props}>
      {children}
      {icon && <ArrowRight className="ml-2 w-4 h-4" />}
    </button>
  );
};

export default CTAButton;