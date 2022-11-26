import React from 'react'

export default function SelectInput({label,name, value, options, onChange, disabled, children}) {

    console.log(options)
    return (
        <div className='flex flex-col mb-8'>
            <label className='mb-4'>{label}</label>
            <select disabled={disabled} name={name} value={value} onChange={onChange} className='rounded p-2 drop-shadow-md'>
                {
                    options.map((c) => {
                        console.log(typeof c.id)
                        return (

                            <option value={c.id}>{c.name}</option>
                        )
                    })
                }
            </select>
            {children}
        </div>
    )
}
