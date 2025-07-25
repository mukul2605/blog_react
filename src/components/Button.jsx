import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-100',
    textColor = 'text-white',
    classname = '',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} 
    ${textColor} ${classname}`} {...props}>
        {children}
    </button>
  )
}

export default Button 

