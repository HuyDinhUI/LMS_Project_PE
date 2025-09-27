import type { ReactNode } from 'react';
import React from 'react';

type ButtonVariant = 'default' | 'primary' | 'danger' | 'outline' | 'dark' | 'icon' | 'transparent' | 'item';
type ButtonSize = 'sm' | 'md' | 'lg' | 'ic' | 'lb';

type ButtonProps = {
    title?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    icon?: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>; // Thêm các props như onClick, type,...

const variantClass: Record<ButtonVariant, string> = {
    default: 'bg-gray-100 rounded hover:bg-gray-200 dark:hover:bg-gray-200/50',
    primary: 'bg-blue-500 rounded hover:bg-blue-600 text-white dark:border dark:border-white dark:hover:border-purple-500 dark:hover:bg-transparent dark:bg-transparent',
    danger: 'bg-red-500 rounded hover:bg-red-600 text-white',
    dark: 'bg-black rounded hover:bg-black/80 text-white dark:bg-gray-200 dark:text-black dark:hover:bg-white',
    outline: 'rounded ring ring-gray-200 dark:ring-gray-500 hover:bg-white/10',
    icon: 'rounded hover:bg-gray-600/20',
    transparent: 'bg-transparent',
    item: 'bg-transparent dark:text-gray-300'
};

const sizeClass: Record<ButtonSize, string> = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
    ic: 'p-2',
    lb: ''
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            title,
            variant = 'default',
            size = 'md',
            disabled = false,
            icon,
            className,
            ...rest
        },
        ref
    ) => {
        const base = 'inline-flex items-center gap-2 transition duration-200';
        const finalClass = `${base} ${variantClass[variant]} ${sizeClass[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className ?? ''}`;

        return (
            <button ref={ref} className={finalClass} disabled={disabled} {...rest}>
                {icon && <span>{icon}</span>}
                {title && <span>{title}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';
