import React from 'react'

export default function FormField({ label, name, value, onChange, disabled, className, type, children, error }) {
    return (
        <div className={`flex flex-col ${className}`}>
            <label className='mb-4'>{label}</label>
            {
                type == 'textarea' ?

                    <textarea disabled={disabled} name={name} value={value} onChange={onChange} className='rounded p-2 drop-shadow-md h-full'></textarea> :
                    <input type={type || 'text'} disabled={disabled} name={name} value={value} onChange={onChange} className='rounded p-2 drop-shadow-md h-full'></input>
            }
            {error ? (
                <div className='my-3'>
                    <p className='font-bold text-[#FC100D]'>{error}</p>
                </div>
            ) : ''}
        </div>
    )
}
