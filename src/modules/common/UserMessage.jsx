import React, { createContext, useContext, useState } from 'react'

const MessageContext = createContext();

export const useOpenMessage = () => {

    const messageContext = useContext(MessageContext);
    return ((message, success) => {
        messageContext.setMessage(message)
        messageContext.setOpen(true)
        messageContext.setSuccess(success)
        setTimeout(() => {
            messageContext.setOpen(false);
            messageContext.setMessage('')
        }, 3000)
    })
}

export const MessageContextProvider = ({ children }) => {

    const [open, setOpen] = useState(false);
    const [message, setMessage ] = useState('');
    const [success, setSuccess ] = useState(false);



    return (<MessageContext.Provider value={{
        setOpen, open, message, setMessage, success, setSuccess
    }}>
        {children}
    </MessageContext.Provider>)
}


export default function UserMessage() {

    const messageContext = useContext(MessageContext);
    return (
        <>
            {
                messageContext.open ? <div className={`fixed z-[999] w-full text-white font-bold flex items-center shadow bg-[#fff]  py-2 px-2 rounded min-w-[300px] min-h-[50px] ${messageContext.success ?
                    'bg-[#4BB543]' : 'bg-[#FC100D]'
                }`}>{messageContext.message}</div> : ''
            }
        </>
    )
}
