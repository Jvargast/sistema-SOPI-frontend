import React from 'react'
import item from "../../assets/docitem.svg";
import Button from '../common/Button';

export default function DocItem({ findFile, name, type, docId, handleDelete }) {

    return (


        <div className='relative flex flex-col items-center w-[200px] h-[200px]'>
            <div className='cursor-pointer' onClick={() => findFile(docId) }>

            <img className='-z-10  object-cover' src={item} />
            </div>
            <Button className={'z-[999] mt-4'} onClick={() => { handleDelete(docId) }}>Eliminar</Button>
        </div>

    )
}
