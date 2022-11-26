import React, { useEffect, useState } from 'react'
import Button from '../common/Button';
import FieldGroup from '../common/FieldGroup';
import FormField from '../common/FormField';
import SelectInput from '../common/SelectInput';
import { useOpenMessage } from "../common/UserMessage";
import Title from '../common/Title';
import restService from '../utils/restService';
import { useFormik } from 'formik';

export default function SopiNew() {

    const [costCenters, setCostCenters] = useState([]);
    const [financings, setFinancings] = useState([]);
    const [supplies, setSupplies] = useState([]);
    const [selectedSupply, setSelectedSupply] = useState();

    const openMessage = useOpenMessage();

    const formik = useFormik({
        initialValues: {
            costCenterId: '',
            financingId: '',
            basis: '',
            items: []

        },
        onSubmit: (values) => {
            sendSopi(values)
        },
        validate: (values) => {
            const errors = {}
            if (values.basis == '' || !values.basis) {
                errors.basis = 'El fundamento debe existir'
            }
            if (values.items.length == 0) {
                errors.items = 'Se debe solicitar al menos un item'

            }

            return errors
        }
    })

    const sendSopi = async (values) => {
        const parsedSupplies = formik.values.items.map((supply) => {
            return ({ supplyId: supply.id, quantity: supply.quantity })
        })

        const body = { ...values, items: parsedSupplies };

        try {
            const res = await restService.post('/api/v1/sopi', body);
            if (res.status == 200) {
                openMessage('Solicitud ingresada con éxito', true);
            } else {

                openMessage('Error al ingresar solicitud', false);
            }

        } catch (e) {
            openMessage('Error al ingresar solicitud', false);
        }
    }

    const addSupply = () => {
        formik.setValues(prev => {
            const cleanedSupplies = prev.items.filter(s => s.id != selectedSupply)
            return { ...prev, items: [...cleanedSupplies, { ...supplies.find(s => s.id == selectedSupply), quantity: 1 }] }
        })
    }

    const deleteSupply = (id) => {
        formik.setValues(prev => {
            return { ...prev, items: prev.items.filter(supply => supply.id != id) };
        })
    }

    const changeSupplyQuantity = (id, quantity) => {
        formik.setValues(prev => {
            const supplyToChange = prev.items.find(s => s.id == id);
            const newSupplies = prev.items.filter(s => s.id != id);
            newSupplies.push({ ...supplyToChange, quantity })
            return { ...prev, items: newSupplies }
        })
    }

    useEffect(() => {
        const searchCC = async () => {
            const res = await restService.get('/api/v1/sopi/centroCosto');
            if (res.status == 200) {
                setCostCenters(res.data.data);
                formik.setValues(prev => {
                    return { ...prev, costCenterId: res.data.data[0].id }
                })
            }
        }
        const searchFinancing = async () => {
            const res = await restService.get('/api/v1/sopi/financiamiento');
            if (res.status == 200) {
                setFinancings(res.data.data);
                formik.setValues(prev => {
                    return { ...prev, financingId: res.data.data[0].id }
                })
            }
        }
        const searchSupplies = async () => {
            const res = await restService.get('/api/v1/sopi/insumos');
            if (res.status == 200) {
                setSupplies(res.data.data);
                setSelectedSupply(res.data.data[0].id)
            }
        }

        searchCC();
        searchFinancing();
        searchSupplies();
    }, [])

    return (
        <div className='m-10'>
            <Title title={'Nueva Solicitud'} />
            <div className='flex flex-col w-full'>
                <FieldGroup>

                    <SelectInput
                        disabled={false}
                        {...formik.getFieldProps('costCenterId')}
                        label={'Centro de costo'}
                        options={costCenters}
                    />
                    <SelectInput
                        disabled={false}
                        {...formik.getFieldProps('financingId')}
                        label={'Financiamiento'}
                        options={financings}
                    />

                </FieldGroup>
                <FieldGroup>
                    <FormField error={formik.touched.basis ? formik.errors.basis : null} label={'Fundamento'} type={'textarea'} {...formik.getFieldProps('basis')} />
                </FieldGroup>


                <div className='flex flex-col items-center w-full my-6'>

                    <div className='flex flex-col max-w-[400px]'>
                        <label className='mb-4'>Insumos</label>
                        <div className='flex'>

                            <select value={selectedSupply}
                                className='rounded p-2 drop-shadow-md w-full'
                                onChange={(e) => setSelectedSupply(e.target.value)}>
                                {
                                    supplies.map((c) => {
                                        return (
                                            <option value={c.id}>{c.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <Button onClick={addSupply} className={'font-base mx-8'}>Agregar</Button>

                        </div>
                        {
                            formik.errors.items && formik.touched.items ?
                                (<div className='my-3'>
                                    <p className='font-bold text-[#FC100D]'>{formik.errors.items}</p>
                                </div>) : ''
                        }
                        <div className=''>
                            <table className='font-light drop-shadow-md w-full my-6 border border-collapse bg-[#F5F5F5]  border-[#fff]'>
                                {
                                    formik.values.items.length > 0 ? (
                                        <thead>
                                            <td className='text-start border-2  font-bold border-[#fff] py-3 px-2 '>ID</td>
                                            <td className='text-start border-2  font-bold border-[#fff] py-3 px-2 '>Nombre</td>
                                            <td className='text-start border-2  font-bold border-[#fff] py-3 px-2 '>Cantidad</td>
                                        </thead>
                                    ) : ''
                                }
                                <tbody>

                                    {
                                        formik.values.items.map((s) => {
                                            return (
                                                <tr>
                                                    <td className='text-start border-2   border-[#fff] px-3 py-2'>{s.id}</td>
                                                    <td className='text-start border-2   border-[#fff] px-3 py-2'>{s.name}</td>
                                                    <td className='text-start border-2   border-[#fff] px-3 py-2'><input className='w-full px-3 py-2' value={s.quantity} onChange={(e) => { changeSupplyQuantity(s.id, e.target.value) }} /></td>
                                                    <td className='text-start border-2   border-[#fff] px-3 py-2 cursor-pointer' onClick={() => deleteSupply(s.id)}>Eliminar</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-full my-6'>

                    <div className='flex flex-col'>
                        <label className='mb-4'>Especificación técnica</label>
                        <textarea className='rounded p-2 drop-shadow-md'></textarea>
                    </div>
                </div>
                <div><Button onClick={formik.handleSubmit}>Añadir solicitud</Button></div>
            </div>


        </div>
    )
}
