import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Button from '../common/Button';
import FieldGroup from '../common/FieldGroup';
import SelectInput from '../common/SelectInput';
import Title from '../common/Title';
import { useOpenMessage } from '../common/UserMessage';
import restService from '../utils/restService';

export default function ManagerAdd() {

    const [managers, setManagers] = useState([]);
    const [selectedManager, setSelectedManager] = useState(0)

    const openMessage = useOpenMessage()

    const { purchaseId } = useParams()

    useEffect(() => {
        console.log(purchaseId)
        const loadManagers = async () => {
            let res= '';
            try {
                res = await restService.get(`/api/v1/auth/usuarios`)
                setManagers(res.data.data.map((user) => {
                    return (
                        {
                            id: user.id,
                            name: `${user.firstname} ${user.lastname}  `
                        }
                    )
                }))
                setSelectedManager(res.data.data[0].id)
            } catch (e) {
                
            }

        }

        loadManagers()
    }, [])

    const addManager = async () => {
        let res = ''
        try {
            const res = await restService.post(`/api/v1/gestion/responsables`, {managerId: selectedManager, purchaseId})
            console.log({managerId: selectedManager, purchaseId})
            openMessage('Responsable añadido con éxito', true);
        } catch (e) {
            openMessage(`Error al ingresar responsable ${res.status == 403 ? 'no tienes el acceso necesario' : ''}`, false);
            
        }

    }
    return (
        <div className='m-10'>
            <Title title={'Nuevo gestor'}/>
            <FieldGroup className={'flex-col items-center '}>
                <SelectInput
                    label={'Usuario'}
                    options={managers}
                    value={selectedManager}
                    onChange={(e) => { setSelectedManager(e.target.value) }}
                />
            <Button className={'mt-8'} onClick={addManager} >Añadir cómo gestor</Button>
            </FieldGroup>

        </div>
    )
}
