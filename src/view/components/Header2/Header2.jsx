import style from './Header2.module.css';
import logo from '../../assets/unimetLogo.png';
import person_icon from '../../assets/person.svg';
// import plus from '../../assets/plus.svg'
import expand_more from '../../assets/expand_more.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../../controller/services/AuthService';
import { useNavigate } from "react-router-dom";


const Header2 = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOut = async () => {
    try {
      navigate("/")
      await authService.signOut();
    } catch (error) {
      console.error('Error', error);
    }
  };

    return (
    <div className={style.bar}>
        <img src={logo} alt="Logo Unimet" className={style.logo} />
        <div className={style.perfil}>
        <div className={style.icon}><img src={person_icon}  alt='icono'/></div>
        <button onClick={toggleMenu} className={style.btn_expand} type="button"> <img src={expand_more}/> </button>
    </div>
    {isOpen && (
        <div className={style.menu}>
          <Link to='/Perfil' className={style.l}><button className={style.btn_p}>Mi cuenta</button></Link>
          <Link to='/donaciones' className={style.l}><button className={style.btn_p}>Realizar Donación</button></Link>
          <Link className={style.l}><button className={style.btn_p} onClick={handleOut}>Cerrar Sesión</button></Link>
        </div>)}


    </div>
  );
};

export default Header2;

