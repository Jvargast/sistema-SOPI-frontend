import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';


export default function PrivateRoute({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();
    const user = useSelector(state => state.authReducer.user);


    
    useEffect(() => {
        const verify = async () => {
            try {
                
                if (user) {
                    setIsAuthenticated(true);

                } else {

                    const res = await (await axios.post(`${process.env.API_BASE}/api/v1/auth/verify`)).status == 200;
                    setIsAuthenticated(true)
                    if (!res) navigate('/login')
                }
            } catch (e) {
                setIsAuthenticated(true);
                // navigate('/login')
            }
        }
        verify()
        console.log('Private route')
    }, []);

    if (isAuthenticated == null) {
        return (<>Cargando ...</>)
    }
    if (isAuthenticated) {
        return (
            <Outlet></Outlet> || { children }
        )
    }
}
