import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../contexts/actions';

export default function NavBar() {
    const dispatch = useDispatch();
    return (
        <nav className=' bg-[#F3931D] h-10  '>
            <ul className='flex justify-center items-center list-none w-full h-full'>

                <li className='text-xl mx-8'><Link className='  text-white' to={'/home'}>Home</Link></li>
                <li className='text-xl mx-8'><Link className=' text-white' to={'/sopis'}>Solicitudes</Link></li>
                <li className='text-xl mx-8'><Link className=' text-white' to={'/compras'}>Compras</Link></li>
                <li className='text-xl mx-8'><Link className=' text-white' onClick={()=> dispatch(logout())}to={'/login'}>Salir de la sesión</Link></li>
            </ul>
        </nav>
    )
}
