import { fireEvent, render, screen, cleanup  } from "@testing-library/react"
import { MultipleCustomHooks } from "../../src/03-examples"
import { useFetch } from "../../src/hooks/useFetch"
import { useCounter } from "../../src/hooks"

//Mock de useFetch: Simula el comportamiento del hook para evitar llamadas reales a la API.
vi.mock('../../src/hooks/useFetch')

//Mock de useCounter
vi.mock('../../src/hooks/useCounter')


describe('pruebas en MultipleCustomHooks', () =>{
    let component
    let mockIncrement = vi.fn()
    

    beforeEach(()=>{

        //Limpia los mocks
        vi.clearAllMocks();
        
        //Configuracion inicial del useFetch() al cargar el componente las imagenes vienen vacias y isLoading en true
        useFetch.mockReturnValue({ data: null, isLoading: true, hasError: null });
     
        //Configuracion inicial del useCounter() al cargar el componente el contador inicia en 1
        useCounter.mockReturnValue({ counter: 1, decrement: vi.fn(), increment: mockIncrement });
     
        //Renderiza el componente MultipleCustomHooks
        component =  render(<MultipleCustomHooks/>)
         
    })


    test('debe de mostrarse correctamente', () =>{
        //screen.debug()

        expect(screen.getByText('Información de Pokémon')).toBeInTheDocument()
        expect(screen.getByText('Cargando')).toBeInTheDocument()

        const nextButton = screen.getAllByRole('button', {name: 'Siguiente'})
        expect(nextButton.disabled).toBeFalsy()                                   //Espera que el boton este habilitado  | Nota: en el ejercicio el boton nunca tiene la propiedad disabled el button por lo que siempre va a ser false

        expect(component).toMatchSnapshot()  //Espera que el componente sea igual al snapshot
    })


    test('debe de mostrar un pokemon', ()=>{
       
        //Configuracion del useFetch() cuando se carga la data del pokemon
        useFetch.mockReturnValue({
            data: {
              name: "Charmander",
              id: 2,
              sprites: {
                back_default: "back_default",
                back_shiny: "back_shiny",
                front_default: "front_default",
                front_shiny: "front_shiny",
              },
            },
            isLoading: false,
            hasError: null,
          });
          
          //vuelve a renderizar  
          render(<MultipleCustomHooks/>)
        
         // screen.debug()
        
         //Espera que el titulo de charmader se encuentre en el documento
        expect(screen.getByText(`#1 - Charmander`)).toBeTruthy();
    
    })

    test('debe de llamar la funcion de incrementar', ()=>{

         //Configuracion del useFetch() cuando se carga la data del pokemon
         useFetch.mockReturnValue({
            data: {
              name: "Charmander",
              id: 2,
              sprites: {
                back_default: "back_default",
                back_shiny: "back_shiny",
                front_default: "front_default",
                front_shiny: "front_shiny",
              },
            },
            isLoading: false,
            hasError: null,
          });

     
          cleanup(); // Limpia el DOM después antes de renderizar de nuevo
          
          //vuelve a renderizar
          render(<MultipleCustomHooks/>)
          
          //Obtiene la referencia del boton siguiente
          const bottonSiguiente = screen.getByRole("button", { name: "Siguiente" });
         
         //Simula el evento click en el boton siguiente
         fireEvent.click(bottonSiguiente);

           //screen.debug()

         //Espera que la funcion increment sea llamada cuando se hace click en el boton siguiente 
        expect(mockIncrement).toHaveBeenCalled()

    })
})