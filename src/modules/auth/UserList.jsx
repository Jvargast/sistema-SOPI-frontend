import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import PageContentWrapper from '../common/PageContentWrapper';
import Title from '../common/Title';
import { useOpenMessage } from '../common/UserMessage';
import restService from '../utils/restService';

export default function UserList() {

    const [users, setUsers] = useState([]);

    const openMessage = useOpenMessage()

    const navigate = useNavigate()

    useEffect(() => {

        const searchUsers = async () => {
            try {
                const res = await restService.get('/api/v1/auth/usuarios')
                setUsers(res.data.data)
            } catch (e) {
                openMessage('Error al buscar usuarios', false);
                navigate('/home')
            }
            
        }
        searchUsers()
    }, [])


    return (
        <div className='m-10'>
            <Title title={'Usuarios'} />
            <PageContentWrapper className={'justify-center w-full items-center flex'}>
                <table className='font-light w-full max-w-[1000px] border border-collapse bg-[#F5F5F5]  border-[#fff]'>
                    <thead className='font-thin'>
                        <tr className='text-lg '>
                            <th className='text-start border-2 border-[#fff] py-3 px-2'>ID</th>
                            <th className='text-start border-2 border-[#fff] py-3 px-2'>Nombre</th>
                            <th className='text-start border-2 border-[#fff] py-3 px-2'>Apellido</th>
                            <th className='text-start border-2 border-[#fff] py-3 px-2'>Usuario</th>
                            <th className='text-start border-2 border-[#fff] py-3 px-2'>Mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => {
                                return (
                                    <tr>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2 '>{user.id}</td>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2 '>{user.firstname}</td>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2 '>{user.lastname}</td>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2 '>{user.username}</td>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2 '>{user.mail}</td>
                                        <td className='text-start border-2 border-[#fff] py-3 px-2 '><Link to={`/usuarios/perfil/${user.id}`}>Perfil</Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </PageContentWrapper>
        </div>
    )
}
