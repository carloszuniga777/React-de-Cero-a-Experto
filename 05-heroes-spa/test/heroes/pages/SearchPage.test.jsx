import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { SearchPage } from '../../../src/heroes';





 //-------Creando el Mock 'SetSearchParams' -------------------    

/* 1. Mock de SetSearchParams: función falsa para rastrear llamadas*/   

    const mockedSetSearchParams  = vi.fn();


/* 2. Se hace Mock PARCIAL de 'react-router':
    - Usamos vi.importActual para mantener la funcionalidad REAL del módulo
    - Sobrescribimos SOLO useSearchParams con nuestro mock
 */   
    vi.mock('react-router', async () => {
        // Importa la versión REAL de react-router (no el mock)  
       const actual = await vi.importActual('react-router');
     
       // Combina lo real con nuestro mock de useNavigate
       return {
         ...actual,                                 // 🔁 Conserva todo lo original
         useSearchParams: vi.fn(() => {             // 🎭 Nuestro mock
            
            // Obtenemos los searchParams reales y reemplazamos el setter con nuestro mock
            const [searchParams] = actual.useSearchParams();      //Mantenemos la funcionalidad actual del searchParams 
            return [searchParams, mockedSetSearchParams];         //Retornamos searchParams y el mock mockedSetSearchParams
          }),    
       };
     });





describe('Pruebas en <SearchPage />', () => {

 

     // Limpiar el mock antes de cada test
    beforeEach(() => {vi.clearAllMocks() });

    
    test('debe de mostrarse correactamente con valores por defecto', () => {
        
        const { container } =render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );
        expect( container ).toMatchSnapshot();
        
    });
  
    
    
    test('debe de mostrar a Batman y el input con el valor del queryString', () => {
        
        //Renderiza el SearchPage junto con las imagenes de batman, ya que la url esta configurada con ese query parameters
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );
        
        //Busca las imagenes
        const img = screen.getByRole('img');
        
        //screen.debug()
        
        //Se espera que renderice la imagen de batman
        expect( img.src ).toContain('/heroes/dc-batman.jpg');


       //Se espera que el alert de 'No hero with' (Alert indica que no se encontro la imagen) se encuentre deshabilitado           
       const alert = screen.getByText(/No hero with/i);

      // console.log(alert.style._values)

       expect( alert.style.display ).toBe('none');
        
    });



    test('debe de mostrar un error si no se encuentra el hero (batman123)', () => {
        
        //Renderiza SearchPage con la query parameter configurada en batman123
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

     //   screen.debug()
        
        // Se espera que al buscar batman123 se muestre el mensaje de error 
        const alert = screen.getByText(/No hero with/i);
       
       //console.log(alert.style._values)

        expect( alert.style.display ).toBe('');             //Espera que el display none este deshabilitado
    

    });



  
    //Haciendo pruebas en setSearchParams ha sido llamado con la query parameter 'superman', 
    test('debe de llamar el navigate a la pantalla nueva', () => {
        
        const inputValue = 'superman';

        //Renderiza el SearchPage sin query parameters
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        //Busca el cuadro de texto
        const input = screen.getByRole('textbox');
        
        //Busca en la caja de texto 'superman'
        fireEvent.change( input, { target: { name: 'searchText', value: inputValue }})
        
        //Obtiene el form
        const form = screen.getByRole('form', { name: 'search-form' });
        
        //Realiza submit
        fireEvent.submit( form );
        
      
        // Verificar que setSearchParams se llamó con el valor correcto
        expect(mockedSetSearchParams).toHaveBeenCalledWith({ q: inputValue });
    
    });
    



});