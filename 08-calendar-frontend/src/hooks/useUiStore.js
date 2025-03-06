import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store"


//Custom hook para manejar el estado del modal (abrir / cerrar)
export const useUiStore = ()=>{

    const dispatch = useDispatch()
   
   //Store ui de redux para conocer el estado del modal 
   const {isDateModalOpen} = useSelector(state => state.ui)


   //Abrir modal
   const openDateModal = ()=>{
       dispatch(onOpenDateModal())
   }

   //Cerrar Modal
   const closeDateModal = ()=>{
        dispatch(onCloseDateModal())
   }

   //Abrir o cerrar modal
   const toggleDateModal = ()=>{
       isDateModalOpen 
        ?  closeDateModal()
        :  openDateModal()
   }


   return{
    //* Propiedades
     isDateModalOpen,

    //* Metodos 
    openDateModal,
    closeDateModal,
    toggleDateModal

   }

}