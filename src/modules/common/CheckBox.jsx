import React, { useState } from 'react'

export default function CheckBox({id, handleChange, value, name, label, check}) {

    const [checked, setChecked] = useState(check || true);

    const toggleCheckBox = () => {
        setChecked( prev => {
            return !prev
        });
        handleChange(id, checked);

    }

    return (
        <div key={id} className={`relative m-4 flex`}>

            <input value={value} name={id} checked={checked} onChange={handleChange} id={id} type={'checkbox'} className={`invisible absolute`} />
            <div onClick={toggleCheckBox} className={`mr-3 flex items-center h-[20px] w-[35px] border-2 border-[#b7b7b7] rounded-xl ${checked ? 'justify-end bg-[#0066ff]' : 'justify-start bg-[#fff]'}`}>
                <div className={`rounded-full h-[25px] bg-[#F3931D] border border-[#fff] w-[25px] relative ${checked ? 'right-[-10px]' : 'left-[-10px]'}`}></div>
            </div>
            <label className='font-light'>{label}</label>
        </div>
    )
}
