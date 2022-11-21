import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <nav className=' bg-[#F3931D] h-10  '>
            <ul className='flex justify-center items-center list-none w-full h-full'>

                <li className='text-xl mx-8'><Link className='  text-white' to={'/home'}>Home</Link></li>
                <li className='text-xl mx-8'><Link className=' text-white' to={'/sopis'}>Solicitudes</Link></li>
            </ul>
        </nav>
    )
}
