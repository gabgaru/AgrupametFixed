import style from "./categoriesDash.module.css";
import Header2 from "../../components/Header2/Header2";
import { db } from "/src/controller/services/firebase.js";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Agrupacion from "../agrupacion/agrupacion";

export default function CategoriesDash() {
  const { id } = useParams();

  const [items, setItems] = useState([]);
  const [selectedAgrup, setSelectedAgrup] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/category/:nombre");
  };


  useEffect(() => {
    const fetchItems = async () => {
      const itemsCollection = collection(db, "Agrupaciones");
      const q = query(itemsCollection, where("category", "==", id));
      const itemsSnapshot = await getDocs(q);
      const itemsList = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsList);
      console.log(itemsList);
    };

    fetchItems();
  }, [id]);

  const handleAgrupSelection = (item) => {
    navigate(`/agrupacion/${item.id}`);
  };

  const filteredAgrup = items.filter((agrupacion) =>
    agrupacion.nombre.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  if (!items || items.length === 0) {
    return <div>Loading...</div>;
  }

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
          <li className={style.card} key={item.id} style={{ listStyleType: "none" }}>
            <div className={style.title}>
              <strong>{item.nombre}</strong>
              <button
                className={style.btn_info}
                key={item.id}
                onClick={() => handleAgrupSelection(item)}
              >
                VER MAS
              </button>
            </div>

            <Agrupacion info={selectedAgrup} />
          </li>
        ))}
      </ul>
    </div>
  );
}
