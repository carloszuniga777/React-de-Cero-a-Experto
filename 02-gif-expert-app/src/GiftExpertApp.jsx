import { useState } from "react"
import { AddCategory, GifGrid } from "./components"

export const GiftExpertApp = () => {
 const [categories, setCategories] = useState([])



   /*La mejor manera de pasar el set del usestate al componente hijo, 
     es creando una funcion en el componente padre que haga referencia al set y pasarla al componente hijo */
  const onAddCategory = (newCategory)=>{
    
    //console.log(newCategory)
   
    if(categories.includes(newCategory)) return

    setCategories(cat => [newCategory, ...cat])
  }  




  return (
    <>
        <h1>GifExportApp</h1>
       
        <AddCategory onNewCategory={ value => onAddCategory(value)}/>
       
        {
            categories.map((category)=>(
                <GifGrid key={category} category={category}/>
            ))
        }
        
    </>
  )
}
