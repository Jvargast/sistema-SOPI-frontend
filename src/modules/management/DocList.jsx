import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../common/Button'
import PageContentWrapper from '../common/PageContentWrapper'
import Title from '../common/Title'
import { useOpenMessage } from '../common/UserMessage'
import restService from '../utils/restService'
import DocItem from './DocItem'

export default function DocList() {

    const { purchaseId } = useParams()
    const navigate = useNavigate()

    const [docs, setDocs] = useState([])
    const [file, setFile] = useState(null);

    const openMessage = useOpenMessage()

    useEffect(() => {
        const searchPurchase =  async () => {
            try {
                const res = await restService.get(`/api/v1/compras/${purchaseId}`)

                if (res.status == 200) {
                } else {
                    openMessage('Error al consultar compra', false);
                    navigate('/compras')
                    
                }
            } catch (e) {
                openMessage('Error al consultar compra', false);
                navigate('/compras')

    
            }
        }
        searchPurchase();
    },[])

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const deleteDoc = async (docId) => {
        const res = await restService.delete(`/api/v1/gestion/documentos`, { docId })
        if (res.status == 200) {
            setDocs(prev => {
                const filtered = prev.filter(d => d.id != docId);
                return filtered;
            })
        }

    }

    const sendFile = async () => {
        let formData = new FormData();

        formData.append("doc", file);
        formData.append("purchaseId", purchaseId);
        const res = await restService.post('/api/v1/gestion/documentos', formData, {
            'Content-Type': 'multipart/form-data'
        }
        )
        setFile(null)
        console.log(res)
    }

    const findFile = async (docId) => {
        const res = await restService.get(`/api/v1/gestion/documentos/${docId}`, {}, 'blob')
        console.log(typeof res.data)
        // Create a Blob from the PDF Stream
        const file = new Blob(
            [res.data],
            { type: 'application/pdf' });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);

    }

    useEffect(() => {
        const searchDocs = async () => {
            const res = await restService.get(`/api/v1/gestion/documentos?compraId=${purchaseId}`)
            console.log(res.data.data)
            setDocs(res.data.data)
        }
        searchDocs()
    }, [file])
    return (
        <div className='m-10'>



            <Title title={'Documentos'} />
            <PageContentWrapper>



                <input onChange={handleFileChange} id='input-file' hidden type={'file'} />
                {
                    file ? (
                        <div className='mt-4'>
                            <label className='mr-8'>{file.name}</label>
                            <Button className={'mr-6'} onClick={sendFile}>Enviar Documento</Button>
                            <Button onClick={() => setFile(null)}>Cambiar Documento</Button>
                        </div>
                    ) : (
                        <label className='text-white px-3 py-2 rounded bg-[#F3931D] cursor-pointer' for='input-file'>Agregar Documento</label>
                    )
                }

                <div className='my-8 flex justify-center'>

                    {
                        docs.map((d) => {
                            return (
                                <DocItem findFile={findFile} handleDelete={deleteDoc} docId={d.id} name={d.name} type={d.type} />

                            )
                        })
                    }

                </div>
            </PageContentWrapper >
        </div>
    )
}
