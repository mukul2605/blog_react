import React, {useId, forwardRef} from 'react'

const Input = forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
            className='inline-block mb-1 pl-1 text-slate-300'
            htmlFor={id}>
                {label}
                </label>}
                <input
                type={type}
                className={`px-3 py-2 rounded-lg
                     bg-slate-700 text-slate-100 outline-none
                      focus:bg-slate-600 duration-200 border
                       border-slate-600 focus:border-blue-400 w-full placeholder-slate-400 ${className}`}
                ref = {ref}
                {...props}
                id = {id} 
                />
        </div>
    )
})

export default Input

