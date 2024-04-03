import { db } from '../controller/services/firebase.js';
import user from "./User.js"
import { doc,collection, addDoc, getDoc,deleteDoc,updateDoc, setDoc } from "firebase/firestore";
class admin extends user{
    constructor(name,email,password,phone){
        //llamado a clase de usuario
        super(name,email,password,phone,true);
    }
    //Crear Agrupacion
    async createGroup(Cat,Desc,Email,img,insta,Name,tlf){
        const FirebaseAgg = collection(db, "Agrupaciones");
        const Today = new Date();
        const TodaysYear = Today.getFullYear();
        //Creacion del documento de agrupacion
        await addDoc(FirebaseAgg,{
            category: Cat,
            testimonios: [],
            Contribuidores: [],
            CrationYear: TodaysYear,
            descripcion: Desc,
            email: Email,
            imagen: img,
            instagram: insta,
            Members: [],
            nombre: Name,
            PromRating: 0,
            telefono: tlf
        });
    }
    async deleteGroup(GroupId){
        const FirebaseAgg = collection(db, "Agrupaciones");
        const selectedgroup = doc(db,"Agrupaciones",GroupId);
        await deleteDoc(selectedgroup);
    }
    async editGroup(GroupId,Cat,Desc,Email,img,insta,Name,tlf){
        const selectedgroup = doc(db,"Agrupaciones",GroupId);
        updateDoc(selectedgroup,{
            category: Cat,
            descripcion: Desc,
            email: Email,
            imagen: img,
            instagram: insta,
            nombre: Name,
            telefono: tlf
        });
    }
    async createCategory(Name){
        const FirebaseCatt = collection(db,"Categorías");
        //Creacion del documento de Categoría
        await addDoc(FirebaseAgg,{
            nombre: Name,
            Groups: []
        });
    }
    async deleteCategory(CatId){
        const selectedcat = doc(db,"Categorías",CatId)//CatId debe ser un string
        //Eliminar documento de Categoría
        await deleteDoc(selectedcat);
    }
    async editCategory(CatId,newname){
        const selectedcat = doc(db,"Categorías",CatId)
        await setDoc(selectedcat,{
            nombre: newname
        })
    }
}

const SystemAdmin  = new admin();
export default SystemAdmin;