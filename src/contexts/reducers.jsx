import { combineReducers } from "@reduxjs/toolkit";

const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        loading: true,
        isAuthenticated: false,
      };
    case "LOGIN_SUCCESS":
      console.log("Guardando datos de usuario...", action.payload);

      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case "LOGOUT_SUCCESS":
        return {
            ...state,
            user:null,
            isAuthenticated:false,
            loading: false
        }
    case "LOGIN_FAILED":
    case "LOGOUT_FAILED":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({ authReducer });
