import React from "react";
import "./Login.css";
import ButtonLogIn from "./ButtonLogIn";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { firebaseApp } from '../../firebase/firebaseConfig';
import { getAuth, signInWithEmailAndPassword,} from 'firebase/auth';
// import { Button } from "react-bootstrap";
// import {googleSingIn} from "../../functions/firebaseActions"
import ButtonGoogle from "./ButtonGoogle";


function Login() {
    


    const [userR, setUser] = useState({
    email:"",
    password:"",

});
const handleChange = ({target:{name,value}})=>{
        setUser({...userR,[name]: value})
 };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const auth = getAuth(firebaseApp);
    const email= userR.email;
    const password= userR.password;    
    signInWithEmailAndPassword(auth, email, password)
    .then((Credentials) =>{
        const firebase_user =Credentials.user;
        console.log(firebase_user);
    })
    .catch((error) =>{
        const errorCode = error.code;
        console.log (errorCode);
    });


    };
  return (
    <div className="Login">
      <h1 className="loginPage-title"> Login to Netflix </h1>      
      <form onSubmit={handleSubmit}>
        <h1>Inicia sesión</h1>

        <div className="InpUserName mb-2">
          <input
            style={ {width: "100%", height: "45px" }}
            type="text"
            name="email"
            placeholder="Email o número de teléfono"
            onChange={handleChange}
          />
        </div>
        
        <div className="inpPassword mb-2">
          <input style={ {width: "100%", height: "45px" }}
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />
        </div>          
        
        <ButtonLogIn></ButtonLogIn>
        <ButtonGoogle />

        <div className="checkBoxLogin d-flex justify-content-between small mb-2">
          <Form.Check aria-label="option 1" label="Recuérdame" id='check' />
          <Link to="/LoginHelp" className="text-decoration-none text-secondary">¿Necesitas ayuda?</Link>
        </div>        
      </form>

      <div className="login-signup-now text-left mb-3">
        ¿Primera vez en Netflix? 
        <Link to="/" className="text-decoration-none text-light"> Suscríbete ahora</Link>.
      </div>
      <span className="derechos">
        Esta página está protegida por Google reCAPTCHA para comprobar que no
        solo eres un robot.
      </span>
    </div>
  );
}
export default Login;
