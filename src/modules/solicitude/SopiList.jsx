import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../common/Button';
import restService from '../utils/restService';
import editButton from "../../assets/edit-button.svg";
import Title from '../common/Title';

export default function SopiList() {

    const [sopis, setSopis] = useState([]);

    useEffect(() => {
        const searchSopis = async () => {
            const res = await restService.get('/api/v1/sopi')
            console.log(res.data)
            setSopis(res.data.data)
        }
        searchSopis()
    }, [])

    const navigate = useNavigate();
    return (
        <div className='m-10'>
            <Title title={'Solicitudes'} />

            <div className='w-full flex justify-center mt-10'>
                <table className='font-light w-full max-w-[1000px] border border-collapse bg-[#F5F5F5]  border-[#fff]'>
                    <thead className='font-thin'>
                        <tr className='text-lg '>
                            <th className='text-start border-2 border-[#fff] py-3 px-2'>Centro de costo</th>
                            <th className='text-start border-2 border-[#fff] py-3 px-2'>Financiamiento</th>
                            <th className='text-start border-2 border-[#fff] py-3 px-2'>Solicitante</th>
                            <th className='text-start border-2 border-[#fff] py-3 px-2'>Fecha de creación</th>
                            <th className='text-start border-2 border-[#fff] py-3 px-2'>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sopis.map(sopi => {
                                return (
                                    <tr>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2 '>{sopi.costCenter ? sopi.costCenter.name : 'NULO'}</td>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2'>{sopi.financing ? sopi.financing.name : 'NULO'}</td>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2'>{sopi.user ? `${sopi.user.firstname} ${sopi.user.lastname}` : 'NULO'}</td>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2'>{sopi.createdAt.split('T')[0]}</td>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2'>{sopi.status.name}</td>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2 flex justify-center'><Link to={`/sopis/${sopi.id}`} className='bg-'><img className='h-[40px]' src={editButton} /></Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className='flex justify-center mt-8'>

                <Button onClick={() => navigate('/sopis/nueva')}>Agregar solicitud</Button>
            </div>


        </div>
    )
}
