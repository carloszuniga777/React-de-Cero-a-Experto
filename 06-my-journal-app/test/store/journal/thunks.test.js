import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../../../src/firebase/config";
import { savingNewNote, startNewNote, setActiveNote, addNewEmtyNote } from "../../../src/store";


/**
 * Nueva Instancia de Firebase para el Testing

    Para la fase de pruebas con Firebase, fue necesario crear una nueva instancia 
    de la plataforma con reglas de seguridad que permitieran libremente operaciones 
    de lectura y escritura. 
    
    Esto se debió a que la instancia de Firebase utilizada en la aplicación 
    principal tiene configuradas sus reglas de seguridad 
    para permitir estas operaciones únicamente cuando el usuario 
    está debidamente autenticado.

    La configuracion se hizo en src/firebase/config
    
    Pasos:
    1. Se creo una base de datos firestore solo para testing en firebase, 
       por tanto se creo una nueva instancia, las reglas de firestore permiten lectura y escritura:
       
       rules_version = '2';

        service cloud.firestore {
        match /databases/{database}/documents {
            match /{document=**} {
            allow read, write
            }
        }
        } 
    
    2. crear un archivo .env.test y colocar las variables de entorno de esa base de datos
    3. En src/firebase/config se configuro para que en dependencia si estas en produccion/desarrollo o testing
       tome correctamente las variables de entorno
 */

      


describe('Pruebas en Journal Thunks', () => {
    
    //mocks
    const dispatch = vi.fn();
    const getState = vi.fn();

    beforeEach( () => vi.clearAllMocks() );

   //Testeando el thunk de startNewNote del Journal
    test('startNewNote debe de crear una nueva nota en blanco', async() => {

        //1. Configuraciones del mock getState
        const uid = 'TEST-UID';                       
        const notes = []

         
       getState.mockReturnValue({              //Configuramos el getSate para que siempre devuelva el uid: 'TEST-UID' y notes: []
            auth: { uid: uid }, 
            journal: { notes } 
        });
       

        //---------------------------------------

        //3. Llamamos al thunk 
        await startNewNote()( dispatch, getState );      //Ejecutamos al thunk el cual va a ejecutar savingNewNote, addNewEmptyNote y setActiveNote
    

        //Se espera que el dispatch llame a savingNewNote
        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );

       
        //Se espera que el dispatch llame a addNewEmptyNote y agrege una nota vacia
        expect( dispatch ).toHaveBeenCalledWith( addNewEmtyNote({
            body: '',
            title:'',
            imageUrls: [],
            id: expect.any( String ),
            date: expect.any( Number ),
        }));


        //Se espera que el dipatch llame setActiveNote y agregue una nota vacia
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title:'',
            imageUrls: [],
            id: expect.any( String ),
            date: expect.any( Number ),
        }));


           
        //------ Borrar de firebase---------
        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`);
        
        const { docs } = await getDocs( collectionRef );       

        await Promise.all(docs.map(({ref}) => deleteDoc(ref) ))

    });

    
});