import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import restService from '../utils/restService';
import editButton from "../../assets/edit-button.svg";
import Title from '../common/Title';

export default function TicketList() {

    const [purchases, setPurchases] = useState([]);

    const { purchaseId } = useParams();

    useEffect(() => {
        const searchPurchases = async () => {
            const res = await restService.get(`/api/v1/gestion/ticket?compraId=${purchaseId}`)
            console.log(res.data.data)
            setPurchases(res.data.data)
        }
        searchPurchases()
    }, [])

    const navigate = useNavigate();
    return (
        <div className='m-10'>
            <Title title={'Tickets'}/>

            <div className='w-full flex justify-center'>
                <table className='font-light w-full max-w-[1000px] border border-collapse bg-[#F5F5F5]  border-[#fff]'>
                    <thead className='font-thin'>
                        <tr className='text-lg '>
                            <th className='text-start border-2 border-[#fff] py-3 px-2'>Proveedor</th>
                            <th className='text-start border-2 border-[#fff] py-3 px-2'>Tipo de compra</th>
                            <th className='text-start border-2 border-[#fff] py-3 px-2'>Costo total</th>
                            <th className='text-start border-2 border-[#fff] py-3 px-2'>Fecha de creación</th>
                            <th className='text-start border-2 border-[#fff] py-3 px-2'>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            purchases.map(purchase => {
                                return (
                                    <tr>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2 '>{purchase.supplier ? purchase.supplier.name : 'NULO'}</td>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2'>{purchase.purchaseType ? purchase.purchaseType.name : 'NULO'}</td>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2'>{purchase.totalAmmount ? `$ ${purchase.totalAmmount}` : '$ ------'}</td>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2'>{purchase.createdAt.split('T')[0]}</td>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2'>{purchase.status.name}</td>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2 flex justify-center'><Link to={`/compras/${purchase.id}`} className='bg-'><img className='h-[40px]' src={editButton} /></Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>




        </div>
    )
}
