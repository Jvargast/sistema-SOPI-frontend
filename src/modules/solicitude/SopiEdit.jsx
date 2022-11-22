import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../common/Button';
import restService from '../utils/restService';

export default function SopiEdit() {

    const [sopi, setSopi] = useState({
        sopiId: 0,
        costCenterId: 0,
        financingId: 0,
        basis: '',
        statusId: 0,
        details: []

    });

    const findPermission = (permission) => {
        return user.permissions.find(p => p.name == permission) != null;

    }

    const createPurchase = async () => {
        try {
            const res = await restService.post('/api/v1/compras', { sopiId: sopi.sopiId, creationType: 'SOPI_COMPLETA' });
            console.log(res)

        } catch (e) {
            console.log(e)
        }
    }



    const { sopiId } = useParams();

    const user = useSelector(state => state.authReducer);


    const [costCenter, setCostCenter] = useState([]);
    const [financing, setFinancing] = useState([]);
    const [statuses, setStatuses] = useState([]);




    const changeSopi = (item) => {

        setSopi(prev => {

            return {
                ...prev,
                [item.name]: item.value
            }
        })
    }

    const handleChange = (e) => {

        setSopi(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const sendSopi = async () => {

        try {
            const res = await restService.put('/api/v1/sopi', sopi);
            console.log(res)

        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {

        console.log('USer', user)

    }, [user])

    useEffect(() => {
        const searchStatuses = async (sopi) => {
            const res = await restService.get('/api/v1/sopi/estados');
            if (res.status == 200) {
                setStatuses(res.data.data);




            }
        }
        const searchCC = async (sopi) => {
            const res = await restService.get('/api/v1/sopi/centroCosto');
            if (res.status == 200) {
                setCostCenter(res.data.data);
                changeSopi({ name: 'costCenterId', value: res.data.data.find((cc) => cc.id == sopi.costCenterId).id })


            }
        }
        const searchFinancing = async (sopi) => {
            const res = await restService.get('/api/v1/sopi/financiamiento');
            if (res.status == 200) {
                setFinancing(res.data.data);
                changeSopi({ name: 'financingId', value: res.data.data.find((fi) => fi.id == sopi.financingId).id })
            }
        }

        const loadData = async () => {
            const res = await restService.get(`/api/v1/sopi/${sopiId}`)
            console.log('laskdjalksdjalksjdlk', {
                statusId: res.data.data.sopi.status.id,
                costCenterId: res.data.data.sopi.costCenterId,
                financingId: res.data.data.sopi.financingId,
                basis: res.data.data.sopi.basis,
                details: res.data.data.details.map(d => { return { quantity: d.quantity, name: d.supply.name } }),
            })
            setSopi({

                sopiId: res.data.data.sopi.id,
                statusId: res.data.data.sopi.status.id,
                costCenterId: res.data.data.sopi.costCenterId,
                financingId: res.data.data.sopi.financingId,
                basis: res.data.data.sopi.basis,
                details: res.data.data.details.map(d => { return { quantity: d.quantity, name: d.supply.name } }),
            });
            searchCC(res.data.data.sopi);
            searchFinancing(res.data.data.sopi);
            searchStatuses()

        }

        loadData();
    }, []);
    return (
        <div className='m-10'>
            <h1 className='text-xl'>

                Información Solicitud
            </h1>
            <div className='flex flex-col w-full'>
                <div className='w-full flex justify-around my-10'>
                    <div className='flex flex-col'>
                        <label className='mb-4'>Centro de costo</label>
                        <select disabled={!findPermission('SOPI_EDITAR')} name={'costCenterId'} value={sopi.costCenterId} onChange={handleChange} className='rounded p-2 drop-shadow-md'>
                            {
                                costCenter.map((c) => {
                                    console.log(typeof c.id)
                                    return (

                                        <option value={c.id}>{c.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-4'>Financiamiento</label>
                        <select disabled={!findPermission('SOPI_EDITAR')} name={'financingId'} value={sopi.financingId} onChange={handleChange} className='rounded p-2 drop-shadow-md'>
                            {
                                financing.map((c) => {
                                    return (
                                        <option value={c.id}>{c.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className='flex flex-col w-full'>

                    <div className='flex flex-col'>
                        <label className='mb-4'>Estado</label>
                        <select disabled={!findPermission('SOPI_EDITAR')} name='statusId' value={sopi.statusId}
                            className='rounded p-2 drop-shadow-md w-full'
                            onChange={handleChange}
                        >
                            {

                                statuses.map((status) => {
                                    return (
                                        <option value={status.id}>{status.name}</option>
                                    )
                                })
                            }
                        </select>

                    </div>
                </div>
                <div className='flex flex-col mt-4 w-full'>

                    <div className='flex flex-col'>
                        <label className='mb-4'>Fundamento</label>
                        <textarea disabled name={'basis'} value={sopi.basis} onChange={handleChange} className='rounded p-2 drop-shadow-md'></textarea>
                    </div>
                </div>
                <div className='flex flex-col w-full my-6'>

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
                                        sopi.details.map((s) => {
                                            return (
                                                <tr>
                                                    <td className='px-3 py-2'>{s.name}</td>
                                                    <td className='px-3 py-2'>{s.quantity}</td>
                                                    {/* <td className='px-3 py-2'><input className='w-full px-3 py-2' value={s.quantity} onChange={(e) => { changeSupplyQuantity(s.id, e.target.value) }} /></td> */}
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
                        <textarea disabled={!findPermission('SOPI_EDITAR')} className='rounded p-2 drop-shadow-md'></textarea>
                    </div>
                </div>
                <div className='flex'>
                    <div className='mr-6'><Button onClick={sendSopi}>Guardar</Button></div>
                    {
                        findPermission('COMPRA_CREAR') ?
                            <div className='mr-6'><Button onClick={createPurchase}>Crear proceso de compra</Button></div> : ''

                    }
                </div>
            </div>


        </div>
    )
}
