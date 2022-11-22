import React, { Children } from 'react'

export default function FieldGroup({children}) {
    return (
        <div className='w-full flex justify-around my-10'>
            {children}
        </div>
    )
}
