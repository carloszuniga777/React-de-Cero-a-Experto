import { createSlice } from '@reduxjs/toolkit'
import { logout } from '../auth';

//Los reducer son sincronos y los thunks asincronos
//Los reducer solo sirven para controlar el estado del redux, no debe contener funciones ajenas 


//Estado Inicial del State
const initialState = {
    isSaving: false,              //Controlador, sirve para saver si una nota se esta guardando
    isDelete: false,              //Estado para bloquear botones de eliminacion  
    messageSaved: '',             //Mensaje de los alerts  
    notes: [],                    //Contiene todas las notas recuperadas de Firebase  
    active: null                  //La nota seleccionada o la guarda mas reciente  
    /**
     * active: {
     *  id: 'asd',
     *  title: '',
     *  body: '',
     *  date: 123123,
     *  imageUrls: [] // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg,  
     * }
     */
}


export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        savingNewNote: (state)=>{             //Controla el estado isSavign para indicar que una nueva nota se esta guardando | util para poder deshalitar/habilitar el boton de nueva nota cuando se esta creando una
            state.isSaving = true   
        },
        addNewEmtyNote: (state, action )=>{       //Guarda la nota en el state de redux cuando se crea una nueva nota     
           state.notes.push( action.payload )    //No necesitas hacer destructuring (como [...state.notes, action.payload]) porque Immer maneja la inmutabilidad por ti, por tanto, puedes hacer push
           state.isSaving = false 
        },
        setActiveNote: (state, action)=>{         //Guarda la nota mas reciente o la seleccionada en el menu, la configura como la actual | Util hacer swith en pantalla entre NothingSelectedView y NoteView en JornalPage; Seleccionar una nota y modifar la nota seleccionada
            state.active = action.payload
            state.messageSaved = ''               //Limpia el mensaje del alert
        },
        setNotes: (state, action)=>{
          state.notes = action.payload
        },
        setSaving: (state, /*action*/)=>{              //Util para bloquear botones
            state.isSaving = true                     //Cambia el estado de isSaving para indicar que una nota se esta guardando  
            state.messageSaved = ''                  //Limpia el mensaje del alert 
        },
        updateNote: (state, action)=>{              //Actualiza la nota afectada en el array notes[]
            state.isSaving = false

            //actualiza la nota afectada del array notes[]
            state.notes = state.notes.map(note=>{ 
                if(note.id == action.payload.id){
                    return action.payload
                }

                return note
            })
            
            //Establece el mensaje del alert
            state.messageSaved = `La Nota "${action.payload.title}" fue actualizada correctamente`
        },
        setPhotoToActiveNote: (state, action)=>{                     //Almacena las notas en active (nota activa), util cuando el usuario seleccione la nota pueda verlo en la galeria
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
            state.isSaving = false
        },
        clearNoteLogout:(state)=>{                                 //Limpieza de todo el state del redux, util cuando se cierra session | nota: extraReducers hace esta limpieza
            state.isSaving = false
            state.messageSaved = ''
            state.notes = []
            state.active = null
        },
        setIsDelete:(state)=>{                                  //BLoquea los botones de eliminacion
            state.isDelete = true
        },
        deleteNoteById:(state, action)=>{                        //Elimina del state la nota seleccionada           
            state.isDelete = false,                             //Desbloquea los botones de eliminacion            
            state.active = null,
            state.notes = state.notes.filter( note => note.id !== action.payload)
        },
        deleteAllNotes:(state)=>{
            state.isDelete = false,                           //Desbloquea los botones de eliminacion
            state.notes = []
        } 
    },

    extraReducers: (builder)=>{            //Restablece el estado del state del jounal de redux a su valor inicial cuando se dispara la accion del logout
        builder.addCase(logout, ()=>{
            return initialState
        })       
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmtyNote,
    clearNoteLogout,
    deleteNoteById,
    deleteAllNotes,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotoToActiveNote,
    setSaving,
    setIsDelete,
    updateNote
 } = journalSlice.actions

