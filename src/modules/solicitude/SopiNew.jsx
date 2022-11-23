import React, { useEffect, useState } from 'react'
import Button from '../common/Button';
import FieldGroup from '../common/FieldGroup';
import SelectInput from '../common/SelectInput';
import Title from '../common/Title';
import restService from '../utils/restService';

export default function SopiNew() {


    const [mainForm, setMainForm] = useState({
        costCenterId: '',
        financingId: '',
        basis: '',
    });
    const [costCenter, setCostCenter] = useState([]);
    const [financing, setFinancing] = useState([]);
    const [supplies, setSupplies] = useState([]);
    const [addedSupplies, setAddedSupplies] = useState([]);
    const [selectedSupply, setSelectedSupply] = useState();

    const changeForm = (item) => {
        setMainForm(prev => {
            return {
                ...prev,
                [item.name]: item.value
            }
        })
    }

    const handleChange = (e) => {
        setMainForm(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const sendSopi = async () => {
        const parsedSupplies = addedSupplies.map((supply) => {
            return ({ supplyId: supply.id, quantity: supply.quantity })
        })

        console.log({ ...mainForm, items: parsedSupplies })
        const body = { ...mainForm, items: parsedSupplies };

        try {
            const res = await restService.post('/api/v1/sopi', body);
            console.log(res)

        } catch (e) {
            console.log(e)
        }
    }

    const addSupply = () => {
        setAddedSupplies(prev => {
            const cleanedSupplies = prev.filter(s => s.id != selectedSupply)
            return [...cleanedSupplies, { ...supplies.find(s => s.id == selectedSupply), quantity: 0 }]
        })
        console.log(addedSupplies)
    }

    const changeSupplyQuantity = (id, quantity) => {
        setAddedSupplies(prev => {
            const supplyToChange = prev.find(s => s.id == id);
            const newSupplies = prev.filter(s => s.id != id);
            newSupplies.push({ ...supplyToChange, quantity })
            return (newSupplies)
        })
    }

    useEffect(() => {
        const searchCC = async () => {
            const res = await restService.get('/api/v1/sopi/centroCosto');
            if (res.status == 200) {
                setCostCenter(res.data.data);
                changeForm({ name: 'costCenterId', value: res.data.data[0].id })
            }
        }
        const searchFinancing = async () => {
            const res = await restService.get('/api/v1/sopi/financiamiento');
            if (res.status == 200) {
                setFinancing(res.data.data);
                changeForm({ name: 'financingId', value: res.data.data[0].id })
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
                        value={mainForm.costCenterId}
                        name={'costCenterId'}
                        label={'Centro de costo'}
                        onChange={handleChange}
                        options={costCenter}
                    />
                    <SelectInput
                        disabled={false}
                        value={mainForm.financingId}
                        name={'financingId'}
                        label={'Financiamiento'}
                        onChange={handleChange}
                        options={financing}
                    />

                </FieldGroup>
              
                <div className='flex flex-col w-full'>

                    <div className='flex flex-col'>
                        <label className='mb-4'>Fundamento</label>
                        <textarea name={'basis'} onChange={handleChange} className='rounded p-2 drop-shadow-md'></textarea>
                    </div>
                </div>
                <div className='flex flex-col w-full my-6'>

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
                        <div className=''>
                            <table className='drop-shadow-md w-full my-6'>
                                <tbody>

                                    {
                                        addedSupplies.map((s) => {
                                            return (
                                                <tr>
                                                    <td className='px-3 py-2'>{s.id}</td>
                                                    <td className='px-3 py-2'>{s.name}</td>
                                                    <td className='px-3 py-2'><input className='w-full px-3 py-2' value={s.quantity} onChange={(e) => { changeSupplyQuantity(s.id, e.target.value) }} /></td>
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
                <div><Button onClick={sendSopi}>Añadir solicitud</Button></div>
            </div>


        </div>
    )
}
