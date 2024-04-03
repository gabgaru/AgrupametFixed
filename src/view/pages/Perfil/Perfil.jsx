import './Perfil.css';
import Header2 from '../../components/Header2/Header2'
import Footer2 from "../../components/footer2/footer2";
import person_icon from '../../assets/person.svg';
import React from 'react'
import authService from '../../../controller/services/AuthService';
import { useState, useEffect } from 'react';

export default function Perfil() {

    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userPhone, setuserPhone] = useState(null);

    const handleNameChange = (e) => {
        setUserName(e.target.value);
    };
    
    const handlePhoneChange = (e) => {
        setuserPhone(e.target.value);
    };

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    };

    useEffect(() => {
        async function fetchName() {
            try {
                const name = await authService.getName();
                setUserName(name);
            } catch (error) {
                console.error('Error fetching user email:', error);
            }
        }
        fetchName();
    }, []);



    useEffect(() => {
        async function fetchEmail() {
            try {
                const email = await authService.getEmail();
                setUserEmail(email);
            } catch (error) {
                console.error('Error fetching user email:', error);
            }
        }
        fetchEmail();
    }, []);


    useEffect(() => {
        async function fetchPhone() {
            try {
                const phoneNumber = await authService.getPhone();
                setuserPhone(phoneNumber);
            } catch (error) {
                console.error('Error fetching user email:', error);
            }
        }
        fetchPhone();
    }, []);

  return (
    <>
    <Header2 />
    <div className='User_cont'>
        <div className='User_info'>
            <div className='user_picture'><img id='img' src={person_icon} alt='foto de perfil'/>
            </div>
            <h4 className='t'>{userName}</h4>
            <div>__________________________________</div>
            <h5>Correo electronico: {userEmail}</h5>
            <h5>Fecha de Nacimiento: </h5>
            <h5>Agrupaciones a las que pertenezco: </h5>
        </div>
        
        <div className='User_edit'>
            <div className='c'>
            <label>Nombre 
                <input className= 'input' type='text' value={userName} onChange={handleNameChange}/>
            </label>
            <label>Telefono
                <input className= 'input' type='text' value={userPhone} onChange={handlePhoneChange}/>
            </label>
            <label>Carrera
                <input className= 'input' type='text' />
            </label>
            </div>
            <div className='c'>
            <label>Correo Electronico
                <input className= 'input' type='email' value={userEmail} onChange={handleEmailChange}/>
            </label>
            <label>Fecha de Nacimiento 
                <input className= 'input' type='date' />
            </label>
            </div>
            <button className='btn_edit'> Actualizar </button>
            </div>    
    </div>
    <Footer2></Footer2>
    </>
  )
}
