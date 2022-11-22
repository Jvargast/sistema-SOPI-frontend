import React from 'react'

export default function FormField({label,name, value, onChange, disabled}) {
    return (
        <div className='flex flex-col'>
            <label className='mb-4'>{label}</label>
            <input disabled={disabled} name={name} value={value} onChange={onChange} className='rounded p-2 drop-shadow-md'></input>
        </div>
    )
}
