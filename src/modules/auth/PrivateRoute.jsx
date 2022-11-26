import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../contexts/actions';


export default function PrivateRoute({ children, requiredPermission }) {

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();
    const user = useSelector(state => state.authReducer);

    const dispatch = useDispatch();



    useEffect(() => {
        const verify = async () => {
            try {
                if ((await axios.post(`http://localhost:8000/api/v1/auth/verify`,{}, { withCredentials: true})).status == 401) {
                    setIsAuthenticated(false);
                    dispatch(logout())
                    navigate('/login')
                    return;
                }
                
            } catch (e ){

                setIsAuthenticated(false);
                dispatch(logout())
                navigate('/login')

            }
            if (!user.loading) {

                try {

                    const hasPermission = (requiredPermission ? user.permissions.find(p => p.name == requiredPermission) : true);
                    if (user.isAuthenticated && hasPermission) {
                        setIsAuthenticated(true);

                    } else {

                        const res = (await axios.post(`http://localhost:8000/api/v1/auth/verify`,{}, { withCredentials: true})).status == 200;
                        setIsAuthenticated(res)
                        if (!res) navigate('/login')
                        else if (res && !hasPermission) navigate('/home')
                    }
                } catch (e) {
                    setIsAuthenticated(false);
                    navigate('/login')
                }
            }
        }
        verify()

    }, [user.loading]);

    if (isAuthenticated == null) {
        return (<>Cargando ...</>)
    }
    if (isAuthenticated) {
        return (
            children || <Outlet></Outlet>   
        )
    }
}
