import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FieldGroup from '../common/FieldGroup'
import FormField from '../common/FormField'
import PageContentWrapper from '../common/PageContentWrapper'
import Title from '../common/Title'
import { useOpenMessage } from '../common/UserMessage'
import Button from '../common/Button'
import restService from '../utils/restService'
import CommentChat from './CommentChat'

export default function TicketDetail() {

    const openMessage = useOpenMessage();

    const [commentResponse, setCommentResponse] = useState('');

    const [reloadComment, setReloadComment] = useState(false)

    const navigate = useNavigate()

    const [ticket, setTicket] = useState({
        comments: []
    })
    const ticketForm = useFormik({
        initialValues: {
            title: '',
            content: '',
            userId: 0,
            date: ''
        },
        onSubmit: async (values) => {

            console.log(values)

        }
    })

    const addComment = async () => {
        try {
            const res = await restService.post(`/api/v1/gestion/ticket/comentario`, {ticketId: ticket.id, response: commentResponse})
            openMessage('Comentario agredo con éxito', true);
            setReloadComment(prev => !prev)
            
        } catch (e) {
            openMessage('Error al agregar comentario', false);

        }
    }

    const { ticketId } = useParams()

    useEffect(() => {
        const searchTicket = async () => {
            try {
                const res = await restService.get(`/api/v1/gestion/ticket/${ticketId}`)
                ticketForm.setValues(values => {
                    return {
                        ...values,
                        ...res.data.data.ticket
                    }
                })
                setTicket({ ...res.data.data.ticket, comments: res.data.data.comments })
                console.log(ticket)
            } catch (e) {
                openMessage('Error al buscar ticket', false);
            }
        }
        searchTicket()

    }, [reloadComment])

    return (
        <div className='m-10'>
            <Title title={'Información del ticket'} />
            <Button onClick={() => navigate(`/compras/${ticket.purchaseId}`)}>Ir a compra asociada</Button>
            <PageContentWrapper>

                <FieldGroup>

                    <FormField
                        label={'Título'}
                        disabled
                        {...ticketForm.getFieldProps('title')}
                    />
                    <FormField
                        label={'Descripción'}
                        disabled
                        {...ticketForm.getFieldProps('content')}
                    />
                </FieldGroup>
                <FieldGroup className={'flex flex-col'}>
                    <p className='text-xl'>Añadir comentario</p>
                    <FormField
                        type={'textarea'}
                        value={commentResponse}
                        onChange={(e) => {setCommentResponse(e.target.value)}}
                        className={'w-[300px] h-[]'}

                    />
                    <Button onClick={addComment} className={''}>Añadir comentario</Button>
                </FieldGroup>

                <FieldGroup>
                    <CommentChat ticket={ticket} comments={ticket.comments} />
                </FieldGroup>
            </PageContentWrapper>

        </div>
    )
}
