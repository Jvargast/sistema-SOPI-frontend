import React from 'react'

export default function Field({placeholder, className, icon, alt, type, onChange,name, ...props}) {
  return (
    <div className='flex items-center relative mt-8'>
        <div className='absolute w-5 h-5 ml-3'>
            <img alt={alt} src={icon} className=""/>
        </div>
        <input  onChange={onChange} type={type} className={`text-black pr-2 pl-10 py-3 bg-[#D9D9D9] w-[330px] rounded-sm ring-gray-300 focus:ring-gray-500 focus:ring-2 ${className}`} {...props} placeholder={placeholder} name={name}/>
    </div>
    
  )
}