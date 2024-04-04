import "./agrupacion.css";
import Header2 from "../../components/Header2/Header2";
import Footer2 from "../../components/footer2/footer2";
import { db } from "/src/controller/services/firebase.js";
import saman from "../../assets/saman.jpg";
import ig from "../../assets/ig.svg";
import email from "../../assets/email.svg";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import authService from "../../../controller/services/AuthService";
import Controlador from "../../../controller/controller";

export default function Agrupacion() {
  const [agrupacion, setAgrupacion] = useState(null);
  const [unido, setUnido] = useState(false); 
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgrupacion = async () => {
      const docRef = doc(db, "Agrupaciones", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAgrupacion({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("no se encontró el documento");
      }
    };

    fetchAgrupacion();
  }, [id]);

  const handleAgrupSelection = (item) => {
    navigate(`/testimonio/${item.id}`);
  };

  const handleClick = () => {
    setUnido(!unido); 
    console.log("BotonFurula");
    console.log("Esto es el id: ",id);
    console.log("Este es el user: ",authService.getCurrentUser())
    Controlador.joinmember(authService.getCurrentUser().uid,id);
  };

  if (!agrupacion) {
    return <div></div>;
  }

  return (
    <div>
      <Header2 />
      <div
        className="imagen_group"
        style={{ backgroundImage: `url(${agrupacion.imagen})` }}
      >
        <h1 className="title_g">{agrupacion.nombre}</h1>
      </div>
      <div className="Info_card">
        <p style={{ textAlign: "justify" }}>{agrupacion.descripcion}</p>
        <div className="btns">
          <Link to="/donaciones">
            <button className="btns_">
              {" "}
              <strong>Donar </strong>
            </button>
          </Link>
          <button
            className="btns_"
            onClick={() => handleAgrupSelection(agrupacion)}
          >
            Agregar Testimonio
          </button>
          <button className="btns_" onClick={handleClick}>
            {" "}
            <strong>{unido ? 'Salir' : 'Unirse'}</strong> {}
          </button>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <div style={{ marginBottom: "15px" }}>
            <strong>Contáctanos</strong>
          </div>
          <div className="contact_us">
            <img className="icon_i" src={ig} />
            <p>{agrupacion.instagram}</p>
          </div>
          <div className="contact_us">
            <img className="icon_i" src={email} />
            <p>{agrupacion.email}</p>
          </div>
        </div>
        <span style={{ color: "black", fontSize: "40px", textAlign: "center" }}>
          Mira lo que{" "}
          <span
            style={{ color: "#FD8204", fontSize: "40px", textAlign: "center" }}
          >
            otros opinan
          </span>
        </span>
        <ul className="testimonies">
          {agrupacion.testimonios.map((item) => (
            <li
              key={item}
              style={{ listStyleType: "none" }}
              className="feedback_box"
            >
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <Footer2></Footer2>
    </div>
  );
}
