import restService from "../modules/utils/restService";


export const loginUser = ({username, password}) => async(dispatch) => {
    try {
        dispatch({type: "LOGIN_REQUEST"});
        /* const config = {headers: {"Content-Type": "application/json"}}; */
        const {data} = await restService.post('/api/v1/auth/ingresar', {username, password});
        
        dispatch({type: "LOGIN_SUCCESS", payload: data.data});

        localStorage.setItem('user', JSON.stringify(data.data));
        
        const res = await restService.get('/api/v1/auth/usuarios/permisos');
        dispatch({type: "USER_PERMISSIONS", payload: res.data.data})
        localStorage.setItem('permissions', JSON.stringify(res.data.data));
    } catch (error) {
        dispatch({type: "LOGIN_FAILED", payload: error.response.data.message});
    }

};

export const logout = () => async (dispatch) => {
    try {
        await restService.get('/api/v1/auth/logout');
        dispatch({type:"LOGOUT_SUCCESS"});
        
    } catch (err) {
        dispatch({ 
            type: "LOGOUT_FAILED", 
            payload: {
                error: err.response.data.message
            } 
        })
    }
}

export const reloadAction = () => async (dispatch) => {
    try {
        const res = await restService.post('/api/v1/auth/verify');
        if (res.status == 200) {
            dispatch({ type: 'RELOAD_USER', payload: ''})
        }
        
    } catch (e) {
        console.log(e)
        dispatch({ type: 'READ_USER', payload: ''})
    }



}