import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import restService from '../utils/restService';
import editButton from "../../assets/edit-button.svg";
import Title from '../common/Title';
import PageContentWrapper from '../common/PageContentWrapper';
import Pagination from '../common/Pagination';

export default function TicketList() {

    const [tickets, setTickets] = useState([]);

    const { purchaseId } = useParams();

    useEffect(() => {
        // const searchTickets = async () => {
        //     const res = await restService.get(purchaseId ? `/api/v1/gestion/ticket?compraId=${purchaseId}&page=1&per_page=5` : `/api/v1/gestion/ticket?page=1&per_page=5`)
        //     console.log(res.data.data)
        //     setTickets(res.data.data.data)
        // }
        // searchTickets()
    }, [])

    const navigate = useNavigate();
    return (
        <div className='m-10'>
            <Title title={'Tickets'} />

            <PageContentWrapper className={'flex justify-center flex-col items-center'}>


                <>
                    {
                        tickets.length > 0 ? (
                            <table className='font-light w-full max-w-[1000px] border border-collapse bg-[#F5F5F5]  border-[#fff]'>
                                <thead className='font-thin'>
                                    <tr className='text-lg '>
                                        <th className='text-start border-2 border-[#fff] py-3 px-2'>Título</th>
                                        <th className='text-start border-2 border-[#fff] py-3 px-2'>Contenido</th>
                                        <th className='text-start border-2 border-[#fff] py-3 px-2'>Fecha de expiración</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tickets.map(ticket => {
                                            return (
                                                <tr>
                                                    <td className='text-start border-2 border-[#fff] py-3 px-2 '>{ticket.title || 'NULO'}</td>
                                                    <td className='text-start border-2 border-[#fff] py-3 px-2'>{ticket.content || 'NULO'}</td>
                                                    <td className='text-start border-2 border-[#fff] py-3 px-2'>{ticket.expirationDate || ''}</td>
                                                    <td className='text-start border-2 border-[#fff] py-3 px-2 flex justify-center'><Link to={`/tickets/${ticket.id}`} className='bg-'><img className='h-[40px]' src={editButton} /></Link></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        ) : (<div>No hay tickets disponibles para ver</div>)
                    }
                </>



                <Pagination visible={tickets.length > 0} setData={setTickets} baseUrl={'/api/v1/gestion/ticket'} perPage={1} />

            </PageContentWrapper>





        </div >
    )
}
