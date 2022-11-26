import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Button from '../common/Button'
import DateField from '../common/DateField'
import FieldGroup from '../common/FieldGroup'
import FormField from '../common/FormField'
import SelectInput from '../common/SelectInput'
import { useOpenMessage } from '../common/UserMessage'
import restService from '../utils/restService'

export default function TicketNew() {

    const [ticket, setTicket] = useState({});

    const [searchParams, setSearch] = useSearchParams()
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const loadUsers = async () => {
            const res = await restService.get(`/api/v1/auth/usuarios`)
            setUsers(res.data.data.map((user) => {
                return (
                    {
                        id: user.id,
                        name: `${user.firstname} ${user.lastname}  `
                    }
                )
            }))
            // setSelectedManager(res.data.data[0].id)
            console.log(res.data.data[0].id)
            ticketForm.setValues((values) => {
                return (
                    {
                        ...values,
                        userId: res.data.data[0].id
                    }
                )
            })

        }

        loadUsers()
    }, [])

    const openMessage = useOpenMessage()

    const ticketForm = useFormik({
        initialValues: {
            title: '',
            content: '',
            userId: 0,
            date: ''
        },
        onSubmit: async (values) => {
            const purchaseId = searchParams.get('compraId');

            values.purchaseId = purchaseId;
            console.log(values)
            try {
                const res = await restService.post(`/api/v1/gestion/ticket`, values)
                console.log(res.data.data)
                openMessage('Ticket creado con éxito', true)
                navigate(`/tickets/${res.data.data.id}`)


            } catch (e) {
                openMessage('Error al ingresar ticket', false)
            }
        }
    })

    return (
        <div className='m-10'>
            <h1 className='text-xl'> Nuevo Ticket</h1>
            <FieldGroup>
                <FormField
                    label={'Título'}
                    {...ticketForm.getFieldProps('title')}

                />
                <SelectInput
                    label={'Usuario asignado'}
                    options={users}
                    {...ticketForm.getFieldProps('userId')}
                />

                <DateField
                    {...ticketForm.getFieldProps('date')}
                />
                <FormField
                    label={'Descripción'}
                    {...ticketForm.getFieldProps('content')}

                />
            </FieldGroup>
            <div className='flex justify-center'>

                <Button onClick={ticketForm.handleSubmit}>Crear</Button>
            </div>

        </div>
    )
}
