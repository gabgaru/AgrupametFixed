import { db } from '../controller/services/firebase.js';
import { doc, getDoc,updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
class Controller{
    constructor(){
    }
    
    //Todos los parámetros deben ser strings a excepción del "Float"

    async joinmember(UseruId,AgId){
        const Agrupacion = doc(db,"Agrupaciones",AgId);
        const Usuario = doc(db,"users",UseruId);
        await updateDoc(Agrupacion,{
            Members: arrayUnion(UseruId),
        });
        await updateDoc(Usuario,{
            BelongsTo:arrayUnion(AgId), //Array de los Id de las agrupaciónes a las que pertenece el usuario
        })
    }
    async deletememeber(UseruId,AgId){
        const Agrupacion = doc(db,"Agrupaciones",AgId);
        const Usuario = doc(db,"users",UseruId);
        await updateDoc(Agrupacion,{
            Members: arrayRemove(UseruId),
        });
        await updateDoc(Usuario,{
            BelongsTo: arrayRemove(AgId),
        })
    }
    async addcomment(AgId,Text){
        const Agrupacion = doc(db,"Agrupaciones",AgId);
        await updateDoc(Agrupacion,{
            testimonios: arrayUnion(Text),
        });
    }
    async addrating(AgId,Float){
        const Agrupacion = doc(db,"Agrupaciones",AgId);
        const docSnap = await getDoc(Agrupacion);
        const oldRating = parseFloat(docSnap.data().PromRating);
        var newrating=((oldRating+Float)/2);
        await updateDoc(Agrupacion,{
            PromRating: newrating,
        });
    }
}
const Controlador = new Controller();
export default Controlador;