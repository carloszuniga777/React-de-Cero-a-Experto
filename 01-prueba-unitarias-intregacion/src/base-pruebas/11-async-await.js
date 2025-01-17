

// const getImagenPromesa = () => new Promise( resolve => resolve('https://ajskdhaskjdhajs.com') )
// getImagenPromesa().then( console.log );

export const getImagen = async() => {

    try {

        const pokemon = 'bulbasaur'
        const resp   = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const  data  = await resp.json(); 

        // Obtener la URL de la imagen principal (frontal estándar)
        const imageUrl = data.sprites.front_default;

    
        return imageUrl;

    } catch (error) {
        // manejo del error
        console.error(error)
        return 'No se encontró la imagen'
    }
    
    
    
}

 getImagen();



