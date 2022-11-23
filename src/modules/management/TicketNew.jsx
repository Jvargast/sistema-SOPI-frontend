import { useFormik } from 'formik'
import React, { useState } from 'react'
import Button from '../common/Button'
import FieldGroup from '../common/FieldGroup'
import FormField from '../common/FormField'
import SelectInput from '../common/SelectInput'

export default function TicketNew() {

    const [ticket, setTicket] = useState({});

    const ticketForm = useFormik({
        initialValues: {
            title: '',
        }
    })

    return (
        <div className='m-10'>
            <h1 className='text-xl'> Nuevo Ticket</h1>
            <FieldGroup>
                <FormField
                    label={'Título'}

                />
                <SelectInput />
                <FormField
                    label={'Descripción'}

                />
            </FieldGroup>
            <Button></Button>

        </div>
    )
}
