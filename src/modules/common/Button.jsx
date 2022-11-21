import React from 'react'

export default function Button({children, className, onClick, ...props}) {
  return (
    <button onClick={onClick} className={`text-white px-3 py-2 rounded bg-[#F3931D]  ${className}`} {...props}>{children}</button>
  )
}
