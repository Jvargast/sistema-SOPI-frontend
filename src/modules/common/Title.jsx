import React from 'react'

export default function Title({title}) {
  return (
    <div className='text-2xl'>
        <h1>{title}</h1>
        <div className='border-b-2 mt-2'></div>
    </div>
  )
}
