import React from 'react'

export default function DateField({name, value, onChange}) {
  return (
    <div>
        <input name={name} value={value} onChange={onChange} type='date'/>
    </div>
  )
}
