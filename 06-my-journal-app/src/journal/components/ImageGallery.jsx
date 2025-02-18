//import ImageList from '@mui/material/ImageList';
//import ImageListItem from '@mui/material/ImageListItem';
import { memo } from 'react';

//----------------LightGallery--------------
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-fullscreen.css';

// Módulos de LightGallery
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";


//Version 2: Galerya usando Material UI
//Se uso memo para que no se renderizara inecesariamente al escribir en los inputs
export const ImageGallery = memo( ({images = []})=>{
 
  //console.log('renderiza')

    return (
      <LightGallery speed={500} plugins={[lgThumbnail, lgZoom, lgFullscreen]} mode="lg-fade">
            {images.map((image) => (
              <a key={image} 
                 href={image}  
                 style={{margin:'5px'}}
              >
                    <img
                      srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={image}
                      alt='Imagen de la nota'
                      loading="lazy"
                      className="img-responsive"
                    />
              </a>
            ))}
      </LightGallery>  
  );

})



// Agregar display name para React Dev Tools y ESLint
ImageGallery.displayName = 'ImageGallery';




//------------------------------------------------------

//Version 1: Galerya usando Material UI
//Se uso memo para que no se renderizara inecesariamente al escribir en los inputs
/*
export const ImageGallery = memo( ({images = []})=>{
 
  //console.log('renderiza')

    return (
          <ImageList sx={{ width: '100%', height: 'auto', '::-webkit-scrollbar': { display: 'none'} }} cols={4} rowHeight={'auto'}>
            {images.map((image) => (
                  <ImageListItem key={image}>
                    <img
                      srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={image}
                      alt='Imagen de la nota'
                      loading="lazy"
                    />
                  </ImageListItem>
            ))}
          </ImageList>
  );
})
*/


//Imagenes obtenidas del componenete de galerias de material ui
/*
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];
*/