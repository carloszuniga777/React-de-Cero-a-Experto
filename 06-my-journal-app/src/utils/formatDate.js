
//Recibe la fecha en formato numero, ejemplo: 1739497947795
//Devuelve la fecha en formato: dia, fecha de mes ano, ejemplo: jueves, 13 de febrero de 2025
export const formatDate = (dateNumber)=>{
    const date = new Date(dateNumber)
    return new Intl.DateTimeFormat("es-ES", { dateStyle: "full" }).format(date)
}