import style from "./dashboard.module.css";
import Header2 from "../../components/Header2/Header2";
import { db } from "/src/controller/services/firebase.js";
import {
    collection,
    getDocs,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Agrupacion from "../agrupacion/agrupacion";
import plus from "../../assets/plus.svg"

export default function Dashboard() {
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const handleClick = () => {
        setCategory(dataCategory);
        navigate("/dashboard");
    };

    useEffect(() => {
        const fetchItems = async () => {
            const itemsCollection = collection(db, "Categorías");
            const itemsSnapshot = await getDocs(itemsCollection);
            const itemsList = itemsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setItems(itemsList);
            console.log(itemsList);
        };

        fetchItems();
    }, []);

    const handleAgrupSelection = (item) => {
        const itemCategory = item.nombre;
        navigate(`/dashboard/${itemCategory}`);
    };

    const handleNewCategory = () => {
        navigate('/newCategory')
    }

    const filteredAgrup = items.filter((category) =>
        category.nombre.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    );

    if (!items || items.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header2 />
            <input
                placeholder="Buscar categoría"
                className={style.search}
                onChange={(e) => setSearchQuery(e.target.value)}
            ></input>
            <button className={style.btn_plus}
                onClick={() => handleNewCategory()}> <img src={plus} alt="plus" /> </button>
            <ul className={style.category_card}>
                {filteredAgrup.map((item) => (
                    <li className={style.card} key={item.nombre} style={{ listStyleType: "none" }}>
                        <div className={style.title}>
                            <strong>{item.nombre}</strong>
                            <button
                                className={style.btn_info}
                                key={item.nombre}
                                onClick={() => handleAgrupSelection(item)}
                            >
                                VER MAS
                            </button>
                        </div>

                        <Agrupacion info={selectedCategory} />
                    </li>
                ))}
            </ul>
        </div>

    );


}


