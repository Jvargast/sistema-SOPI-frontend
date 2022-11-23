import React, { Children } from 'react'

export default function FieldGroup({children, className}) {
    return (
        <div className={`w-full flex flex-wrap items-center justify-around my-10 ${className}`}>
            {children}
        </div>
    )
}
