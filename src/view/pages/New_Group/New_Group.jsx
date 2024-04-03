import {React, useState } from 'react';
import './New_Group.css';
import Header2 from '../../components/Header2/Header2';
import SystemAdmin from '../../../model/Admin';
const New_Group = () => {

    const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [telefono, setTelefono] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  const handleSubmit = () => {
    // Aquí puedes usar los valores
    SystemAdmin.createGroup("",descripcion,email,imagen,instagram,nombre,telefono);
  };

  return (
    <>
      <Header2/>
      <h2 id='ti'>Crear agrupación</h2>
      <div className='newG_container'>
        <div className='c'>
          <label>Nombre
            <input className='input2' type='text' value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </label>
          <label>Email
            <input className='input2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>Instagram
            <input className='input2' type='text' value={instagram} onChange={(e) => setInstagram(e.target.value)} />
          </label>
          <label>Teléfono
            <input className='input2' type='text' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </label>
          <label>Descripción
            <input className='input2' type='text' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          </label>
          <label>Imagen de la agrupación - URL
            <input className='input2' type='text' value={imagen} onChange={(e) => setImagen(e.target.value)} />
          </label>
        </div>
        <button className='btns_' onClick={handleSubmit}>Crear Agrupación</button>
      </div>
    </>
  )
}

export default New_Group
