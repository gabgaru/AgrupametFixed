import authService from '../../../controller/services/AuthService';
import style from './register.module.css';
import CustomInput from '../../components/form/form'
import email_icon from '../../assets/email.svg';
import lock_icon from '../../assets/lock.svg';
import eye_icon from '../../assets/eye.svg';
import eye_close_icon from '../../assets/eye_close.svg';
import person_icon from '../../assets/person.svg';
import phone_icon from '../../assets/phone.svg';
import university from '../../assets/university.jpeg';
import { useState } from 'react';
import { Navigate } from "react-router-dom";

export default function Register() {
    // create user data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [registered, setRegistered] = useState(false);

    const handleSubmit = () => {
        if (name === "" || email === "" || password === "" || phone === "") {
            setErrorMessage("Rellene todos los campos");
        } else {
            authService.signUp(email, password, name, phone);
            console.log('Usuario registrado con éxito');
            setRegistered(true);
        }
    };

    return (
        <div className={style.Register}>
            <div className={style.container}>
                <div className={style.register_form}>
                    <h2 className={style.title}>Crear Cuenta</h2>
                    <CustomInput label={"Nombre"} preffixIcon={<img src={person_icon} alt="icon" />} type={'text'} placeholder={"Pepito Pérez"}
                        required={true}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}>
                    </CustomInput>
                    <CustomInput label={"Email"} preffixIcon={<img src={email_icon} alt="icon" />} type={'email'} placeholder={"mail@correo.unimet.edu.ve"}
                        required={true}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}>
                    </CustomInput>
                    <CustomInput label={"Teléfono"} preffixIcon={<img src={phone_icon} alt="icon" />} type={'tel'} pattern="[0-6]{4}-[0-9]{3}-[0-9]{4}" placeholder={"123"}
                        required={true}
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}>
                    </CustomInput>
                    <CustomInput id="passwordInput" label={"Contraseña"} preffixIcon={<img src={lock_icon} alt="icon" />} suffixIcon={
                        <div><img src={eye_close_icon} alt="icon" id='eye_close' /><img src={eye_icon} alt="icon" id='eye_open' style={{ display: "none" }} /></div>
                    }
                        required={true}
                        onClick={passwordVisibility} type={"password"} placeholder={"Min. 8 caracteres"}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}>
                    </CustomInput>
                    <CustomInput id="verificationPassword" label={"Confirmar contraseña"} preffixIcon={<img src={lock_icon} alt="icon" />} suffixIcon={
                        <div><img src={eye_close_icon} alt="icon" id='eye_close2' /><img src={eye_icon} alt="icon" id='eye_open2' style={{ display: "none" }} /></div>
                    }
                        required={true}
                        onClick={verificationPasswordVisibility} type={"password"} placeholder={"Min. 8 caracteres"}></CustomInput>

                    {errorMessage && <div className={style.error_message}>{errorMessage}</div>}
                    <button type="button" onClick={handleSubmit} className={style.send}>Crear cuenta</button>
                    {registered && <Navigate to="/login" />}
                </div>
            </div>

            <div className={style.banner}>
                <img src={university} alt="university" className={style.university_image} />
            </div>
        </div>

    )
}

function passwordVisibility() {
    var inputType = document.getElementById("passwordInput");
    var close = document.getElementById("eye_close");
    var open = document.getElementById("eye_open");
    if (inputType.type === "password") {
        inputType.type = "text";
        close.style.display = 'none';
        open.style.display = 'flex';
    } else {
        inputType.type = "password";
        close.style.display = 'flex';
        open.style.display = 'none';
    }
}

function verificationPasswordVisibility() {
    var inputType = document.getElementById("verificationPassword");
    var close = document.getElementById("eye_close2");
    var open = document.getElementById("eye_open2");
    if (inputType.type === "password") {
        inputType.type = "text";
        close.style.display = 'none';
        open.style.display = 'flex';
    } else {
        inputType.type = "password";
        close.style.display = 'flex';
        open.style.display = 'none';
    }
}