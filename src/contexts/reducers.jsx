import { combineReducers } from "@reduxjs/toolkit";



const authReducer =  (state = { user: null}, action) => {
    switch (action.type) {
        case "LOGIN":
            console.log('Guardando datos de usuario...', action.payload)
            
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};


export default combineReducers({ authReducer })