    import {isValid}  from 'date-fns';

//Valida si la fecha es valida
const isDate = (dateValue) => {
  if (!dateValue) return false;
 
  const date = isValid(dateValue); // retorna true o false
  
  return date;
};
 
export default isDate
