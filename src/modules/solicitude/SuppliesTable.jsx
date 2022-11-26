import React from 'react'

export default function SuppliesTable({ supplies }) {
    return (
        <div className='flex flex-col items-center max-w-[400px]'>


            <div className=''>
                {

                    supplies.length > 0 ? (
                        <table className='drop-shadow-md w-full my-6 font-light w-full max-w-[1000px] border border-collapse bg-[#F5F5F5]  border-[#fff]'>
                            <thead>
                                <td className='text-start border-2  font-bold border-[#fff] py-3 px-2 '>Insumo</td>
                                <td className='text-start border-2  font-bold border-[#fff] py-3 px-2 '>Cantidad</td>
                            </thead>
                            <tbody>

                                {
                                    supplies.map((s) => {
                                        return (
                                            <tr>
                                                <td className='text-start border-2 border-[#fff] py-3 px-2 '>{s.name}</td>
                                                <td className='text-start border-2 border-[#fff] py-3 px-2 '>{s.quantity}</td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    ) : <p className='text-xl'>No hay insumos asociados</p>
                }
            </div>
        </div>
    )
}
