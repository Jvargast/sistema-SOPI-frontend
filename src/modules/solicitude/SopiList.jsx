import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../common/Button';

export default function SopiList() {

    const navigate = useNavigate();
    return (
        <div className='m-10'>
            <h1 className='text-xl'>

                Solicitudes
            </h1>
            <Button clas onClick={() => navigate('/sopis/nueva')}>Agregar solicitud</Button>


        </div>
    )
}
