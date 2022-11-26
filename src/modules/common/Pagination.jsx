import React, { useEffect, useState } from 'react'
import restService from '../utils/restService';

export default function Pagination({ baseUrl, setData, perPage, visible }) {
    const [page, setPage] = useState(1);
    const [config, setConfig] = useState({})
    // const [data, setData] = useState([]);

    const changePage = (changeValue) => {
        console.log('Cambiando a pagina ')
        console.log(config)
        if (page != config.totalPages || changeValue < 0 ) {

            setPage(prev => {
                const a = (prev + changeValue) <= 0 ? 1 : (prev + changeValue)
                console.log(a)
                return a;
            })
        }
    }

    useEffect(() => {
        const searchData = async () => {
            const res = await restService.get(`${baseUrl.includes('?') ? `${baseUrl}&per_page=${perPage}&page=${page}` : `${baseUrl}?per_page=${perPage}&page=${page}`}`)
            setData(res.data.data.data)
            setConfig(res.data.data.pagination)
            console.log('Data lenght ', res.data.data.data.length)
        }
        searchData();

    }, [page]);
    return (
        <div className={`${visible ? 'visible' : 'invisible'}`}>

            <button onClick={() => changePage(-1)}>prev</button>
            <button onClick={() => changePage(1)}>next</button>
        </div>
    )
}
