import { render, screen, fireEvent } from "@testing-library/react"
import { CounterApp } from "../src/CounterApp"

describe('Pruebas en el <CounterApp/>', () => { 
    let container_

    beforeEach(()=>{    
       
       const initialValue=20

       const{container} = render(<CounterApp value={initialValue}/>)
       container_ = container
    })


    test('debe de hacer match con el snapshot', () => {  
        expect(container_).toMatchSnapshot()              //Si el elemento permanece igual al snaptchot
    })


    test('debe de mostrar el valor inical de 20 en CounterAPP', ()=>{
        expect(screen.getByText(20)).toBeTruthy()         //Si elemento contiene un texto = 20 (initialValue)
        expect( screen.getByRole('heading', {level:2}).innerHTML ).toContain('20')    //Si el elemento h2 es el que contiene el valor 20
    })


    test('debe de incrementar el boton +1', ()=>{
        fireEvent.click(screen.getByText('+1'))          //Hace click en el boton y aumenta el initialValue a 21

        expect(screen.getByText('21')).toBeTruthy()                                    //Verifica que en el elemento exita el texto 21      
        expect( screen.getByRole('heading', {level:2}).innerHTML ).toContain('21')     //Verifica que el h2 se muestre el texto 21
        expect( screen.getByTestId('test-counter').innerHTML).toContain('21')          //Valida por medio de data-test-id que elemento con id 'test-counter' tenga el texto 21   
    })


    test('debe de decrementar el boton -1', ()=>{
        fireEvent.click(screen.getByText('-1'))          //Hace click en el boton y decrementa el initialValue a 19

        expect(screen.getByText('19')).toBeTruthy()                                    //Verifica que en el elemento exita el texto 19      
        expect( screen.getByRole('heading', {level:2}).innerHTML ).toContain('19')     //Verifica que el h2 se muestre el texto 19
        expect( screen.getByTestId('test-counter').innerHTML).toContain('19')          //Valida por medio de data-test-id que elemento con id 'test-counter' tenga el texto 19  
    })


    test('debe de funcionar el boton de reset', ()=>{
        fireEvent.click(screen.getByText('+1'))          //Hace click en el boton y incrementa en +1
        fireEvent.click(screen.getByText('+1'))          //Hace click en el boton y incrementa en +1
        fireEvent.click(screen.getByText('+1'))          //Hace click en el boton y incrementa en +1
        fireEvent.click(screen.getByRole('button', {name:'btn-reset'}))    //Dando click al boton reset, usando el arial-label:'btn-reset' para seleccionarlo 
        //screen.debug()
    
        expect(screen.getAllByText(20)).toBeTruthy()
    })

 })