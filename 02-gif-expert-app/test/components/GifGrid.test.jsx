import { render, screen } from "@testing-library/react";
import { beforeEach, describe  } from "vitest";
import { GifGrid } from "../../src/components";
import { expect, vi } from "vitest";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

// Mock de useFetchGifs: Simula el comportamiento del hook para evitar llamadas reales a la API. 
// Permite controlar los datos devueltos en las pruebas y probar cómo el componente responde a diferentes estados del hook.
vi.mock('../../src/hooks/useFetchGifs')     



describe('Pruebas en GifGrid', ()=>{

    const category = 'Dragon ball'

    beforeEach(()=>{
        
        //Configuracion inicial del useFetchGifs() al cargar el componente las imagenes vienen vacias y isLoading en true
        useFetchGifs.mockReturnValue({
            images: [],
            isLoading: true
          })  
         
        //Renderiza el componente GIfGrid  
        render(<GifGrid category={category}/>)
    })

    test('debe de mostrar el loading inicialmente', ()=>{



        const loading = screen.getByText('Cargando...')
        const categoryTitle = screen.getByText(category)

        expect(loading).toBeTruthy()
        expect(categoryTitle).toBeTruthy()

        expect(categoryTitle)
        expect(loading)

    })


    test('debe de mostrar item cuando se cargan las imagenes useFetchGifts', ()=>{
       
        const gifs = [
            { id: '1', title: 'Goku', url: 'https://localhost/goku.jpg' },
            { id: '2', title: 'Vegeta', url: 'https://localhost/vegeta.jpg' },
        ];

        useFetchGifs.mockReturnValue({
            images: gifs,
            isLoading: false
          }) 

        //Renderiza de nuevo el componente GIfGrid  
        render(<GifGrid category={category}/>)  

        //screen.debug()
        
         // Verificar que se muestran los GIFs
        expect(screen.getAllByRole('img').length).toBe(gifs.length);

    })



})