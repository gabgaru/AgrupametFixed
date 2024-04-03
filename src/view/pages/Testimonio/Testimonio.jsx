import React, { useState, useEffect } from "react";
import "./Testimonio.css";
import Header2 from "../../components/Header2/Header2";
import { db } from "/src/controller/services/firebase.js";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

export default function Testimonio() {
  const [agrupacion, setAgrupacion] = useState(null);
  const [testimony, setTestimony] = useState("");
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

  if (!agrupacion) {
    return <div></div>;
  }

  const addTestimonio = async (id, testimonyString) => {
    try {
      await updateDoc(agrupacion, {
        Testimonios: arrayUnion(testimonyString), // Assuming "Testimonios" is the correct field name
      });
      console.log("Testimony added successfully!");
    } catch (error) {
      console.error("Error adding testimony: ", error);
    }
  };

  const agregar = () => {
    if (testimony) {
      // Check if testimony is not empty
      addTestimonio(id, testimony);
    }
  };

  const cancelar = () => {
    navigate(`/agrupacion/${id}`);
  };

  return (
    <>
      <Header2 />
      <div className="testimony">
        <h1>Añadir testimonio ...</h1>
        <input
          value={testimony}
          onChange={(e) => setTestimony(e.target.value)}
          contentEditable="true"
          className="input_testimonio"
          placeholder="Escriba su testimonio ... "
          type="text"
        />
        <div className="botones_t">
          <button className="canceled" onClick={cancelar}>
            Cancelar
          </button>
          <button className="btns_" onClick={agregar}>
            Agregar
          </button>
        </div>
      </div>
    </>
  );
}
