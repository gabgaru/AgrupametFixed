import style from "./newCategory.module.css"
import { useState, useEffect } from 'react';
import { collection, addDoc } from "firebase/firestore";
import Header2 from "../../components/Header2/Header2"
import CustomInput from "../../components/form/form";
import person_icon from '../../assets/person.svg';
import { db } from "/src/controller/services/firebase.js";


export default function NewCategory() {
  
    const [Nombre, setNombre] = useState(""); 
    const createCategory = async (e) => {
        
        e.preventDefault();
        try {
            console.log("Valor: ",Nombre)
            await addDoc(collection(db, 'Categorías'), {
                nombre: Nombre,
            });
        } catch (error) {
            alert("Error en la carga" + error);
        }
    };

    return (

        <div >
            <Header2 />
            <div className={style.form}>
                <h2>Crear categoría</h2>
                <form onSubmit={createCategory}>
                    {/*  
                    <input
                        label={"Nombre"}
                        preffixIcon={<img src={person_icon} alt="icon" />}
                        type={"text"}
                        required={true}
                        onChange={(e) => {
                            setNombre(e.target.nombre);
                        }}>
                    </input>*/}
                    <input className='input2' type='text' value={Nombre} onChange={(e) => setNombre(e.target.value)} />
                    
                    <button type="submit" className={style.create} value={Nombre} onClick={NewCategory} >Crear categoría</button>
                </form>
            </div>
        </div>



    );
}
