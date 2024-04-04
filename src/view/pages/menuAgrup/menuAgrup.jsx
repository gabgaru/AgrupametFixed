import style from "./menuAgrup.module.css";
import Header2 from "../../components/Header2/Header2";
import Footer2 from "../../components/footer2/footer2";
import { db } from "/src/controller/services/firebase.js";
import mas from "../../assets/mas.svg";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Agrupacion from "../agrupacion/agrupacion";
import authService from "../../../controller/services/AuthService";
var num =1;
export default function MenuAgrup() {
  const [items, setItems] = useState([]);
  const [selectedAgrup, setSelectedAgrup] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  //const [administrador, setAdministrador] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    setAgrupacion(dataAgrup);
    navigate("/agrupacion");
  };

  useEffect(() => {
    const fetchItems = async () => {
      const itemsCollection = collection(db, "Agrupaciones");
      const itemsSnapshot = await getDocs(itemsCollection);
      const itemsList = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsList);
    };

    fetchItems();
  }, []);

  const handleAgrupSelection = (item) => {
    navigate(`/agrupacion/${item.id}`);
  };

  const filteredAgrup = items.filter((agrupacion) =>
    agrupacion.nombre.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  if (!items || items.length === 0) {
    return <div>Loading...</div>;
  }
  //Empieza el desastre
  /*
  console.log(authService.getAdminStatus());

  console.log("Acaben con esta sufridera porfa: ",authService.getAdminStatus());
  const handleAdmin = (e) => {
    setAdministrador(authService.getAdminStatus());
    console.log("Acaben con esta sufridera porfa: ",authService.getAdminStatus());
  };*/
  const administrador = true;
  //termina el desastre
  return (
    <div>
      <Header2 />
      <input
        placeholder="Ingresa el nombre de la agrupación"
        className={style.search}
        onChange={(e) => setSearchQuery(e.target.value)}
      ></input>
      <ul className={style.group_card}>
        {filteredAgrup.map((item) => (
          <li
            className={style.card}
            key={item.id}
            style={{
              listStyleType: "none",
              backgroundImage: `url(${item.imagen})`,
            }}
          >
            <div className={style.card_title}>
              <strong>{item.nombre}</strong>
            </div>

            <button
              className={style.btn_info}
              key={item.id}
              onClick={() => handleAgrupSelection(item)}
            >
              VER MAS
            </button>

            <Agrupacion info={selectedAgrup} />
          </li>
        ))}
      </ul>
      {/* Aquí está la parte que se muestra cuando "administrador" es true */}
      {administrador && (
        <Link to="/New_Group">
          <button className={style.btn_newG}>
            <img className={style.mas} src={mas} />
          </button>
        </Link>
      )}
      <Footer2></Footer2>
    </div>
  );
}
