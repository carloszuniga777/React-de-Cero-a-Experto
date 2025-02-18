import { addDoc, collection, deleteDoc, doc, setDoc, writeBatch } from "firebase/firestore"
import { FirebaseDB  } from '../../firebase/config'
import { addNewEmtyNote, deleteAllNotes, deleteNoteById, savingNewNote, setActiveNote, setIsDelete, setNotes, setPhotoToActiveNote, setSaving, updateNote } from './journalSlice'
import { fileUpload, loadNotes } from "../../helpers"
import Swal from "sweetalert2"



/** ---------------------------------------
 *  Configuracion del Firestore de Firebase
 * ----------------------------------------
 * Para hacer uso del Firestore primero se configura en Firebase la base datos
 * y seleccionar el de 'tipo produccion'. 
 * 
 * Una vez creado, se modifica la reglas para que pueda escribir
 * el usuario solo cuando esta autenticado: 
 * 
 * [Firebase]:
 * 
 *  rules_version = '2';

    service cloud.firestore {
    match /databases/{database}/documents {
        match /{document=**} {
        allow read, write: if request.auth != null;
        }
    }
    }

    Se agrego: if request.auth !== null

    Despues de da en publicar regla

 */


//Funcion para guardar una nueva nota en Firebase   
// documentacion: https://firebase.google.com/docs/firestore/quickstart?hl=es&authuser=1#web-modular-api_2
export const startNewNote = ()=>{
    return async(dispatch, getState)=>{
        try {       
              
            //------------Logica para no permitir guardar mas de una nota vacia ------------

            const { notes } = getState().journal 

              // Verificar si ya existe una nota vacía
            const emptyNoteExists = notes.some(note => !note.title.trim() && !note.body.trim());
             
            //Muestra mensaje de error
            if (emptyNoteExists) {
                return Swal.fire({
                    title: 'Error',
                    text: '¡Acción no permitida! Ya existe una nota sin contenido. Por favor, completa la nota actual o eliminala para crear una nueva',
                    icon: 'error',
                });
            }
            
             //----------------------------------------

             //Deshabilita el boton de crear nueva nota el cual es controlado con el estado isSaving
             dispatch(savingNewNote())

            const { uid } = getState().auth    //Se obtiene el id del usuario desde el state de redux

            const newNote = {
                title: '',
                body: '',
                imageUrls: [],
                date: new Date().getTime(),
            }


            // 1. Crea una referencia a un nuevo documento en Firebase en la ruta: {userID}/journal/notes 
            //    El ID del documento es el ID del usuario en Firebase

            const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
            
            //2. Guarda en Firebase los datos de la nota en el documento creado
            const doc = await addDoc(collectionRef, newNote)

            
            //Agregando el id de la nota a newNote
            newNote.id = doc.id;
            

            //Guarda la nota en el state de Redux
            dispatch( addNewEmtyNote(newNote) )    //Guarda la nota en el array del state de redux, junto con las demas notas
            dispatch( setActiveNote(newNote) )     //Mantiene esta nota como la mas actual 

        }catch(error){
            console.error("Error agregar un nuevo documento: ", error);
        }    

    }
}

//Funcion para obtener las notas desde Firebase, esta es llamada desde el observer useCheckAuth (hook)
export const startLoadingNotes = ()=>{
    return async(dispath, getState)=>{
    
      try{
          //Obtiene el id del usuario del state de redux
          const {uid} = getState().auth
    
          if(!uid) throw new Error('El UID del usuario no existe')
          
          //Obtiene todas las notas desde Firebase    
          const notes = await loadNotes(uid)
    
          //guarda las notas en el state de redux
          dispath(setNotes(notes))

      }catch(error){
        console.error('Error al obtener las notas de Firebase', error)
      } 
    }
}


//Funcion para actualizar una nota en firebase | documentacion: https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es-419
export const startSaveNote = () => {
    return async ( dispatch, getState ) => {

        try{
            
            //Cambia el estado isSaving a true, del state de redux para bloquear los botones
            dispatch(setSaving())    

            //Obtiene el id del usuario del state de redux
            const {uid} = getState().auth
    
            //nota activa
            const {active:note} = getState().journal

            

            //eliminando la propiedad id, para no enviar esa propiedad a firebase
            const noteToFirestore = {...note}
            delete noteToFirestore.id
    
            // 1. Crear referencia a la colección en Firebase con el id del usuario (uid) y el id de la nota(note.id)   
           // const docRef = doc(collection(FirebaseDB, `${uid}/journal/notes/${note.id}`));
            const docRef = doc(FirebaseDB, `${uid}`, 'journal', 'notes',`${note.id}`)
    
            // 2. guarda la nota en firebase | (opcional): el merge permite actualizar parcialmente el documento que se envia con solos los campos que se envian, sin sobreescribir los campos no mencionados en noteToFirestore             
            await setDoc(docRef, noteToFirestore, { merge: true })    

            //Guarda los cambios en el array de notas del states de redux para que se visualice en el sidebar    
            dispatch(updateNote(note))

        }catch(error){
             console.error(`error al actualizar la nota`, error)   
        }

    }
}

//Version 1 (fernando): Guardar las imagenes en Cloudinary
/* 
export const startUploadingFiles = (files = []) => {
    return async ( dispatch ) => {
        //Bloque los botones
        dispatch( setSaving() )


        //----Cargando todas las imagenes a cloudfire -----
        const fileUploadPromise = []

        for(const file of files){
            fileUploadPromise.push( fileUpload(file) )
        }
       
       //Resuelve todas las promesas 
       const photoUrls = await Promise.all(fileUploadPromise)

       //----------------------------------------------------- 

       //Almacena las notas en Active del state de redux
       dispatch( setPhotoToActiveNote(photoUrls) )
        
    }
}
*/

//Version 2: Guardar las imagenes en Cloudinary
export const startUploadingFiles = (files = []) => {
    return async ( dispatch ) => {
       try{
           //Bloque los botones
           dispatch( setSaving() )
   
   
           //----Cargando todas las imagenes a cloudfire -----
          //Resuelve todas las promesas 
          const photoUrls = await Promise.all([...files].map(fileUpload))
   
          //----------------------------------------------------- 
   
          //Almacena las notas en Active del state de redux
          dispatch( setPhotoToActiveNote(photoUrls) )
       
        }catch(error){
            console.error("Error al subir archivos:", error);
       } 
        
    }
}

//Eliminar la nota de Firebase   | documentacion: https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=es-419
export const startDeletingNote = () => {
    return async ( dispatch, getState ) => {
     
        try{

            //Bloquea los botones de eliminacion
            dispatch(setIsDelete())

            const {uid} = getState().auth                   //id del usuario del state de redux
            const {active:note}    = getState().journal     //nota activa del state redux
            
            //1. referencia del documento de la nota en firebase  [id usuario]/journal/notes/[id Nota]
            const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
            
            //2. elimina la nota en firestore de firebase
            await deleteDoc(docRef)
        
            //Elimina la nota del state del journal de redux
             dispatch( deleteNoteById(note.id) )

        }catch(error){
            console.error('Error al eliminar la nota de firebase', error)
        }    
    }
}


/*Escrituras por lotes firebase: 
  Son un conjunto de operaciones de escritura (como set(), update(), delete()) 
  que se ejecutan de forma atómica: todas se aplican correctamente 
  o ninguna lo hace.

  Son útiles para realizar múltiples cambios en documentos de manera consistente, 
  sin necesidad de transacciones complejas que incluyan lecturas previas.

  documentacion: https://firebase.google.com/docs/firestore/manage-data/transactions?hl=es-419#batched-writes
*/
//Funcion para borrar todas las notas de firebase
export const startDeletingAllNotes = () => {
    return async(dispatch, getState) => {

       try { 
           //Bloquea los botones de eliminacion
           dispatch(setIsDelete())
          
          //Obtenemos el id del usuario y el arreglo de las notas del store
          const { uid } = getState().auth;
  
          //Obtenemos las notas del journal
          const { notes } = getState().journal;
   
          //Usamos la escritura por lotes que provee Firestore
          const batch = writeBatch(FirebaseDB);
   
          //Recorremos el arreglo de las notas y mandamos la referencia a los documentos que
          //queremos borrar mandando el id de cada uno
          notes.forEach(note => {
              batch.delete( doc(FirebaseDB, `${uid}/journal/notes/${note.id}`) );
          });
   
          //Al final hacemos el commit de la escritura por lotes
          await batch.commit();
   
          //Borramos el contenido del arreglo de notas en el state del redux
          dispatch( deleteAllNotes() );         
       
        } catch (error) {
           console.error('Error al eliminar todas la nota de firebase', error)
       } 
 
    }
}