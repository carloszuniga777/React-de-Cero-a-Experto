import { useCallback, useEffect, useState } from "react"
import { getGifs, getGifsTest } from "../helpers/getGifs"  // eslint-disable-line

//Custom hook: Para obtener los gif
export const useFetchGifs = (category) => {
    const [images, setImages] = useState([]) 
    const [isLoading, setIsLoading] = useState(true)

    /**
     * useCallback se utiliza para memorizar la función que pasa como argumento, 
     * pero solo en casos donde sus dependencias no cambian. 
     * 
     * Esto es útil cuando pasas esa función a otros componentes 
     * o hooks que podrían evitar renderizados innecesarios al verificar 
     * la identidad de la función.
     * 
     * La función getImages está memorizada, por lo que React solo la volverá a crear 
     * si la dependencia category cambia. 
     * 
     * Si category no cambia, getImages no se vuelve a redefinir en cada renderizado, 
     * evitando así posibles problemas de rendimiento al pasar la función como prop 
     * o usarla en efectos secundarios como en useEffect.
     */
    const getImages = useCallback(async () => {
        //const newImages = await getGifsTest(category)
        const newImages = await getGifs(category)
        setImages(newImages)
        setIsLoading(false)
    }, [category]) 
    

    useEffect(()=>{
        getImages()
    },[getImages])

    return{
        images,
        isLoading
    }

}
