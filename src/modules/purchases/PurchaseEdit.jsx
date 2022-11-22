import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../common/Button';
import FieldGroup from '../common/FieldGroup';
import FormField from '../common/FormField';
import SelectInput from '../common/SelectInput';
import restService from '../utils/restService';

export default function PurchaseEdit() {

    const purchaseForm = useFormik({
        initialValues: {
            purchaseId: 0,
            purchaseTypeId: 0,
            supplierId: 0,
            totalAmmount: 0,
            statusId: 0

        }
    });

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

    const editPurchase = () => {
        console.log(purchase)
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
            const res = await restService.get(`/api/v1/compras/${purchaseId}`);
            setPurchase(res.data.data)
            console.log('Purchase', res.data.data);
            searchPurchasesType(res.data.data);
            searchSuppliers(res.data.data);
            searchStatuses(res.data.data);

        }

        searchPurchase();
    }, []);

    return (
        <div className='m-10'>
            <h1 className='text-xl'>Información de compra</h1>
            <FieldGroup>
                <SelectInput
                    label={'Tipo de compra'}
                    name={'purchaseTypeId'}
                    value={purchase.purchaseTypeId}
                    onChange={handleChange}
                    options={purchaseTypes}

                />
                <SelectInput
                    label={'Proveedores'}
                    name={'supplierId'}
                    value={purchase.supplierId}
                    onChange={handleChange}
                    options={suppliers}

                />
            </FieldGroup>
            <FieldGroup>

                <SelectInput
                    label={'Estado'}
                    name={'statusId'}
                    value={purchase.statusId}
                    onChange={handleChange}
                    options={statuses}

                />
                <FormField
                    value={purchase.totalAmmount}
                    name={'totalAmmount'}
                    label={'Costo Total'}
                    onChange={handleChange}
                />

            </FieldGroup>
            <FieldGroup>
                <div className='flex flex-col max-w-[400px]'>
                    <label className='mb-4'>Insumos</label>

                    <div className=''>
                        <table className='drop-shadow-md w-full my-6'>
                            <thead>
                                <td>Insumo</td>
                                <td>Cantidad</td>
                            </thead>
                            <tbody>

                                {
                                    purchase.purchaseDetails.map((s) => {
                                        return (
                                            <tr>
                                                <td className='px-3 py-2'>{s.sopiDetail.supply.name}</td>
                                                <td className='px-3 py-2'>{s.sopiDetail.quantity}</td>
                                                {/* <td className='px-3 py-2'><input className='w-full px-3 py-2' value={s.quantity} onChange={(e) => { changeSupplyQuantity(s.id, e.target.value) }} /></td> */}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </FieldGroup>

            <div className='flex'>
                <Button onClick={editPurchase}>Guardar</Button>
                <div className='mr-6'><Button onClick={() => {navigate(`/compras/documentos/${purchase.id}`)}}>Ver Documentos</Button></div>

            </div>
        </div>
    )
}
