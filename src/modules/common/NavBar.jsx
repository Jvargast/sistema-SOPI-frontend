import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../contexts/actions';
import { checkAnyPermission, useCheckAnyPermission } from './checkPermissionHook';

export default function NavBar() {
    const dispatch = useDispatch();
    const hasViewSopiModulePermission = useCheckAnyPermission(['SOPI_VER', 'SOPI_VER_CREADA'])
    return (
        <nav className=' bg-[#F3931D]   '>
            <ul className='flex justify-center h-[50px] items-center list-none w-full h-full'>

                <li className='text-xl h-full mx-8 flex items-stretch'><Link className='h-full flex items-center  text-white' to={'/home'}>Home</Link></li>
                {
                     hasViewSopiModulePermission ? <li className='text-xl h-full mx-8 flex items-stretch'><Link className='h-full flex items-center text-white' to={'/sopis'}>Solicitudes</Link></li> : ''
                }
                <li className='text-xl h-full mx-8 flex items-stretch'><Link className='h-full flex items-center text-white' to={'/compras'}>Compras</Link></li>
                <li className='text-xl h-full mx-8 flex items-stretch'><Link className='h-full flex items-center text-white' onClick={()=> dispatch(logout())}to={'/login'}>Salir de la sesión</Link></li>
            </ul>
        </nav>
    )
}
