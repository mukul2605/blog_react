import React from 'react'

function Button({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    ...props
}) {
    const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger',
        success: 'btn-success'
    }
    
    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    }
    
    const variantClass = variants[variant] || variants.primary
    const sizeClass = sizes[size] || sizes.md
    
    return (
        <button 
            type={type}
            disabled={disabled}
            className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`} 
            {...props}
        >
            {children}
        </button>
    )
}

export default Button 

