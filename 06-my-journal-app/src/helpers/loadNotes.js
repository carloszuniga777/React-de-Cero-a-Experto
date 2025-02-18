import { collection, getDocs, orderBy, query } from "firebase/firestore";  // eslint-disable-line
import { FirebaseDB } from "../firebase/config"


//Version 1 (fernando): Obtener todas las notas de firebase | https://firebase.google.com/docs/firestore/query-data/get-data?hl=es-419#get_multiple_documents_from_a_collection
/*
export const loadNotes = async(uid = '') =>{

    try{
        
        if(!uid) throw new Error('El UID del usuario no existe')
    
         // 1. Crear referencia a la colección en Firebase    
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)    
        
        // 2. Obtener los documentos de Firebase
        const docs = await getDocs(collectionRef)
    
        
        const notes =[]
    
        docs.forEach((doc)=>{
            notes.push({
               id: doc.id, 
               ...doc.data()
            })
        })
    
        return notes

    }catch(error){
        throw new Error('Error al cargar las notas en loadNotes', error)
    }
 }
*/
 

//Version 2: Obtener todas las notas ordenadas en fecha, la mas reciente primero
 export const loadNotes = async(uid = '') =>{

    try{
        
        if(!uid) throw new Error('El UID del usuario no existe')
    
         // 1. Crear referencia a la colección en Firebase    
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)    
    
        // 2. Crear query con ordenamiento
        const q = query(collectionRef, orderBy("date", "desc"));

        // 3. Obtener documentos con la query
        const docs = await getDocs(q);

        const notes =[]
    
        docs.forEach((doc)=>{
            notes.push({
               id: doc.id, 
               ...doc.data()
            })
        })
    
        return notes

    }catch(error){
        throw new Error('Error al cargar las notas en loadNotes', error)
    }
 }
