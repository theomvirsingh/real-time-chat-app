"use client";
import React from "react";
import clsx from "clsx";

interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    className,
    disabled,
}) => {
    return (
        <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={clsx(
            ` 
            flex
            justify-center
            rounded-md
            px-3
            py-2
            text-sm
            font-semibold
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            transition
            `,
            disabled && "opacity-50 cursor-default",
            fullWidth && "w-full",
            secondary ? "text-gray-900" : "text-white",
            danger && "bg-orange-600 focus-visible:outline-orange-600",
            !secondary && !danger && "bg-orange-500 hover:bg-orange-700 focus-visible:outline-orange-600",
            className
        )}
        >
            {children}
        </button>
    );
};

export default Button;