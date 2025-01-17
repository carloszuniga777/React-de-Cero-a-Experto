
import { useFetchGifs } from "../hooks/useFetchGifs"
import PropTypes from "prop-types"
import { GiftItem } from "./GiftItem"


export const GifGrid = ({category}) => {
  const { images, isLoading} = useFetchGifs(category)

  return (
    <>
       <h3>{category}</h3>
       {
          isLoading && (<div className="">Cargando...</div>)
       }
       <div className="card-grid">
              {        
                images.map(image=>(
                  <GiftItem key={image.id} {...image}/>
                ))
              }
       </div>
    </>
  )
}


// Definir los tipos de las props
GifGrid.propTypes = {
  category: PropTypes.string.isRequired, // `category` es un string obligatorio
};