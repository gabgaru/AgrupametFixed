import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import authService from '../../../controller/services/AuthService';
import style from './login.module.css';
import CustomInput from '../../components/form/form.jsx';
import email_icon from '../../assets/email.svg';
import lock_icon from '../../assets/lock.svg';
import eye_icon from '../../assets/eye.svg';
import eye_close_icon from '../../assets/eye_close.svg';
import saman from '../../assets/saman.jpg';
import google_icon from '../../assets/google.svg';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../controller/services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Usuario autenticado con éxito:', userCredential.user);
        navigate("/menuAgrup");
      })
      .catch((error) => {
        setError('Correo electrónico o contraseña incorrectos');
        console.error(error);
      });
  }

  const handleGoogleLogin = async () => {
    try {
      await authService.signUpWithGoogle();
      navigate("/menuAgrup")
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };


  return (
    <>
      <div className={style.Login}>
        <div className={style.container}>
          <div className={style.login_form}>
            <h2 className={style.title}>Inicio de Sesión</h2>
            <form onSubmit={signIn}>
              <CustomInput label={"Email"} preffixIcon={<img src={email_icon} alt="icon" />} type={"email"} placeholder={"mail@correo.unimet.edu.ve"}
                required={true}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}>
              </CustomInput>
              <CustomInput id="passwordInput" label={"Contraseña"} preffixIcon={<img src={lock_icon} alt="icon" />} suffixIcon={
                <div><img src={eye_close_icon} alt="icon" id='eye_close' /><img src={eye_icon} alt="icon" id='eye_open' style={{ display: "none" }} /></div>
              }
                required={true}
                onClick={passwordVisibility} type={"password"} placeholder={"123"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}>
              </CustomInput>
              {error && <p className={style.error_message}>{error}</p>}
              <a href="#" className={style.forgot} onClick={() => authService.forgotPassword(email)}>Olvidé mi contraseña</a>
              <button type="submit" className={style.send}>Login</button>
            </form>
            <hr></hr>
            <button type="button" className={style.google} onClick={handleGoogleLogin}><img src={google_icon} alt="icon" /><p>Acceder con Google</p></button>
            <p className={style.register}>¿No estás registrado? <Link to="/register">Crear Cuenta</Link></p>
          </div>
        </div>
        <div className={style.banner}>
          <img src={saman} alt="saman" className={style.saman_image} />
        </div>
      </div>
    </>
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

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Escucha cambios en la autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Detiene la escucha cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  return {
    currentUser,
  };
};

