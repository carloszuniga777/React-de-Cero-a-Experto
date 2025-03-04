    import {isValid, getTime }  from 'date-fns';

//Valida si la fecha es valida
const isDate = (dateValue) => {
  if (!dateValue) return false;

  //Convierte dateValue que viene en formato String a Milisegundos para que isValid pueda evaluarla 
  const getMiliseconds = getTime(dateValue);
 
  const date = isValid(getMiliseconds);   // retorna true o false
  
  return date;
};
 
export default isDate
