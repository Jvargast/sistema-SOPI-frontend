import React from 'react'

export default function PageContentWrapper({children, className}) {
  return (
    <div className={`py-10 ${className}`}>{children}</div>
  )
}
