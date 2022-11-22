import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../contexts/actions";
import dasLogo from "../../assets/DAS.png";
import userFa from "../../assets/user-fa.png";
import passFa from "../../assets/password-fa.png";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    username: "",
    password: "",
  };
  const [form, setForm] = useState(initialState);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  /* const {isAuthenticated} = useSelector(state => state.authReducer);

  useEffect(()=>{
    if(isAuthenticated) {
      navigate("/home")
    }
    
  }, [dispatch, isAuthenticated, navigate]); */

  const login = async (e) => {
    //TODO: Implementar lógica de login
    // Para guardar los datos del usuario luego de loggearse
    console.log(form)
    e.preventDefault();

    dispatch(loginUser({ username: form.username, password: form.password }));
    navigate('/home');
  };

  
  return (
    <div className="relative">
      <section className="w-full h-screen bg-center bg-cover bg-das">
        <div className="flex items-center justify-center h-full">
          <div className="h-[400px] w-[650px] bg-white ">
            <div className="flex flex-col mt-4">
              <div className="flex justify-center align-center">
                <img src={dasLogo} alt="das" className="object-cover w-80" />
              </div>
              <form className="flex flex-col">
                <div className="flex flex-col items-center">
                  <Field
                    placeholder={"Email@daschiguayante.cl"}
                    type={"text"}
                    icon={userFa}
                    alt={"user"}
                    onChange={handleChange}
                    name={"username"}
                  />
                  <Field
                    placeholder={"Password"}
                    type={"password"}
                    icon={passFa}
                    alt={"pass"}
                    onChange={handleChange}
                    name={"password"}
                  />
                </div>
                <div className="flex items-end justify-end w-[490px] mt-5">
                  <button onClick={login} className="bg-[#F3931D] w-28 px-2 py-3 text-white rounded-sm">
                    Ingresar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <footer className="align-center absolute bottom-0 w-full bg-gradient-to-r from-[#E65C00] via-[#EC850C] to-[#F9D423] h-24">
          hola soy el footer 
        </footer> 
      </section>
    </div>
  );
}
