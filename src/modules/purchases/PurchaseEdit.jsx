import { useFormik } from 'formik'
import SuppliesTable from "../solicitude/SuppliesTable";
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import addmanager from "../../assets/addmanager.svg";
import Button from '../common/Button';
import FieldGroup from '../common/FieldGroup';
import FormField from '../common/FormField';
import SelectInput from '../common/SelectInput';
import Title from '../common/Title';
import { useOpenMessage } from '../common/UserMessage';
import restService from '../utils/restService';
import { useSelector } from 'react-redux';

export default function PurchaseEdit() {


    const openMessage = useOpenMessage();

    const user = useSelector(store => store.authReducer)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setPurchase(prev => {
            return ({
                ...prev,
                [e.target.name]: e.target.value
            })
        })
    }

    const [purchase, setPurchase] = useState({
        purchaseDetails: []
    });
    const [purchaseTypes, setPurchaseTypes] = useState([]);
    const [suppliers, setSuppliers] = useState([])
    const [statuses, setStatuses] = useState([])

    const { purchaseId } = useParams();

    const editPurchase = async () => {
        try {
            const { purchaseTypeId, purchaseId: id, statusId, totalAmmount } = purchase;
            const res = await restService.put('/api/v1/compras', { purchaseTypeId, purchaseId, statusId, totalAmmount });
            if (res.status == 200) {
                openMessage('Compra actualizada con éxito', true);

            } else {

                openMessage('Error el actualizar compra', false);
            }
        } catch (e) {
            openMessage('Error el actualizar compra', false);
        }
    }

    useEffect(() => {



        const searchPurchasesType = async (purchase) => {
            const res = await restService.get('/api/v1/compras/tipos');
            setPurchaseTypes(res.data.data)
            console.log(res.data.data)
            if (purchase.purchaseTypeId) {

                setPurchase(prev => {
                    return ({
                        ...prev,
                        purchaseTypeId: res.data.data.find(pt => pt.id == purchase.purchaseTypeId).id
                    })
                })
            } else {
                setPurchase(prev => {
                    return ({
                        ...prev,
                        purchaseTypeId: res.data.data[0].id
                    })
                })

            }
        }

        const searchSuppliers = async (purchase) => {
            const res = await restService.get('/api/v1/compras/proveedor');
            setSuppliers(res.data.data)
            if (purchase.supplierId) {

                setPurchase(prev => {
                    return ({
                        ...prev,
                        supplierId: res.data.data.find(s => s.id == purchase.supplierId).id
                    })
                })
            }
        }

        const searchStatuses = async (purchase) => {
            const res = await restService.get('/api/v1/compras/estados');
            setStatuses(res.data.data)
            console.log(purchase)


            setPurchase(prev => {
                return ({
                    ...prev,
                    statusId: res.data.data.find(s => s.id == purchase.statusId).id
                })
            })

        }

        const searchPurchase = async () => {
            try {
                const res = await restService.get(`/api/v1/compras/${purchaseId}`);
                setPurchase(res.data.data)
                console.log('Purchase', res.data.data);
                searchPurchasesType(res.data.data);
                searchSuppliers(res.data.data);
                searchStatuses(res.data.data);

            } catch (e) {

                openMessage('No puedes ver la compra', false);
                navigate('/compras')
            }

        }

        searchPurchase();
    }, []);

    return (
        <div className='m-10'>
            <Title title={'Información de compra'} />
            {
                user.permissions.find((p) => p.name == 'COMPRA_EDITAR') ? (

                    <div className='flex justify-end mt-4'>



                        <Link to={`/compras/${purchaseId}/gestores/añadir`}>
                            <img src={addmanager} />
                        </Link>
                    </div>
                ) : ''

            }
            <FieldGroup>
                <SelectInput
                    label={'Tipo de compra'}
                    name={'purchaseTypeId'}
                    value={purchase.purchaseTypeId}
                    onChange={handleChange}
                    options={purchaseTypes}
                    disabled={user.permissions.find((p) => p.name == 'COMPRA_EDITAR') == undefined}

                />
                <SelectInput
                    label={'Proveedores'}
                    name={'supplierId'}
                    value={purchase.supplierId}
                    onChange={handleChange}
                    options={suppliers}
                    disabled={user.permissions.find((p) => p.name == 'COMPRA_EDITAR') == undefined}

                />
            </FieldGroup>
            <FieldGroup>

                <SelectInput
                    label={'Estado'}
                    name={'statusId'}
                    value={purchase.statusId}
                    onChange={handleChange}
                    options={statuses}
                    disabled={user.permissions.find((p) => p.name == 'COMPRA_EDITAR') == undefined}

                />
                <FormField
                    value={purchase.totalAmmount}
                    name={'totalAmmount'}
                    label={'Costo Total'}
                    onChange={handleChange}
                    disabled={user.permissions.find((p) => p.name == 'COMPRA_EDITAR') == undefined}
                />

            </FieldGroup>
            <FieldGroup>
                <div className='flex flex-col max-w-[400px]'>
                    <SuppliesTable supplies={purchase.purchaseDetails.map(item => {
                        console.log(item)
                        return {
                            name: item.sopiDetail.supply.name,
                            quantity: item.quantity
                        }
                    })} />
                    {/* <td className='px-3 py-2'>{s.sopiDetail.supply.name}</td>
                                                <td className='px-3 py-2'>{s.sopiDetail.quantity}</td> */}
                </div>
            </FieldGroup>

            <div className='flex justify-center flex-wrap'>
                {
                    user.permissions.find((p) => p.name == 'COMPRA_EDITAR') ? (
                        <Button className={'mr-6 my-6'} onClick={editPurchase}>Guardar</Button>

                    ) : ''
                }
                <Button className={'mr-6 my-6'} onClick={() => { navigate(`/compras/documentos/${purchase.id}`) }}>Ver Documentos</Button>
                <Button className={'mr-6 my-6'} onClick={() => { navigate(`/compras/${purchase.id}/tickets`) }}>Ver Tickets</Button>
                {
                    user.permissions.find((p) => p.name == 'TICKET_CREAR') ? (
                        <Button className={'mr-6 my-6'} onClick={() => { navigate(`/compras/tickets/crear?compraId=${purchase.id}`) }}>Crear Ticket</Button>
                    ) : ''
                }

            </div>
        </div>
    )
}
