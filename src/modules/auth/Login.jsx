import React from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../contexts/actions';

export default function Login() {
  
  const dispatch = useDispatch();

  const login = async () => {
    //TODO: Implementar lógica de login

    // Para guardar los datos del usuario luego de loggearse
    dispatch(loginUser({username: 'director', password: 'director'}))
  }
  return (
    <div>Login
      <button onClick={login}>Ingresar</button>
    </div>
  )
}
