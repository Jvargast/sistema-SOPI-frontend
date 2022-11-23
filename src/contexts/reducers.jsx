import { combineReducers } from "@reduxjs/toolkit";

const authReducer = (state = { user: {}, loading: true }, action) => {
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
        user: null,
        isAuthenticated: false,
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
    case "USER_PERMISSIONS":
      return {
        ...state,
        permissions: action.payload
      }
    case 'RELOAD_USER':
      let user = JSON.parse(localStorage.getItem('user'))
      let permissions = JSON.parse(localStorage.getItem('permissions'))

      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user,
        permissions
      };
    case 'RELOAD_FAILED':
      localStorage.removeItem('user');
      localStorage.removeItem('permissions');

      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        permissions: null
      }
    default:
      return state;
  }
};

export default combineReducers({ authReducer });
