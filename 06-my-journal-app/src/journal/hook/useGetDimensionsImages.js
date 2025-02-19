import { useEffect, useState } from "react";


//Obtiene dinamicamente las dimensiones de las imagenes
  export const useGetDimensionsImages = (images) => {
    const [dimensions, setDimensions] = useState({});
  
      useEffect(() => { 
          if (!images || images.length === 0) return;
  
          let isMounted = true;
  
  
          const loadDimensions = async () => {
            try{
                // 1. Crear array de promesas correctamente
                const promises = images.map(image => 
                            getImageDimensions(image)
                            .then(({ width, height }) => ({ image, width,height}))
                  );
  
                  // 2. Esperar todas las promesas
                  const results = await Promise.all(promises);
                  
  
                  // 3. Convertir a objeto
                  const dims = results.reduce((acc, { image, width, height }) => {
                      acc[image] = { width, height };
                      return acc;
                  }, {});
                  
  
                  // 4. Actualizar estado
                  if (isMounted) setDimensions(dims);
  
            }catch(error){
              if (isMounted) setDimensions({ width: 100, height: 100 });
            }
  
          }   
  
  
          loadDimensions(); 
  
  
          return () => { isMounted = false };  // Cleanup
      }, [images]);
  
      
    return { dimensions };
  };
  


  const getImageDimensions = (url) => {
    return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.src = url;
    });
};