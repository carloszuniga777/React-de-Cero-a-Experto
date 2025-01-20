import { beforeEach } from "vitest"
import { AddCategory } from "../../src/components/AddCategory"
import { render, screen, fireEvent } from "@testing-library/react"
import { expect, vitest, test  } from "vitest"


describe('pruebas en AddCategory', ()=>{
    
    const inputValue = 'Goku' 
    const onNewCategory = vitest.fn()                           //Es una funcion Mock, lo que signfica que simula una funcion

    beforeEach(()=>{
        vi.clearAllMocks();                                    // Limpia las llamadas previas
        render(<AddCategory onNewCategory={onNewCategory}/>)    
    })



    test('debe de cambiar el valor de la caja de texto', () => { 
        

        const input = screen.getByRole('textbox')               //Busca el input

        fireEvent.input( input, { target: {value: inputValue} })  //Dispara el evento change y escribe en el input 'Goku'

        expect(input.value).toBe(inputValue)                       //Verifica que el valor seteado en el input sea igual al esperado 'Goku' 
        
        //screen.debug()

    })



    test('Haciendo pruebas con el submit del formulario', ()=>{
        const input = screen.getByRole('textbox') 
        const form = screen.getByRole('form', {name:'formulario'})
        

        fireEvent.input( input, { target: {value: inputValue} })        //Dispara el evento change y escribe en el input 'Goku'
        fireEvent.submit( form)                                         //Hace submit            

        //screen.debug()

        expect( input.value ).toBe('')                                 //Despues de hacer submit, el input debe estar vacio    
    })
    

    test('Haciendo pruebas que la funcion de la prop onNewCategory haya sido llamada', ()=>{
        const input = screen.getByRole('textbox') 
        const form = screen.getByRole('form', {name:'formulario'})
        

        fireEvent.input( input, { target: {value: inputValue} })        //Dispara el evento change y escribe en el input 'Goku'
        fireEvent.submit( form)                                         //Hace submit            

        //screen.debug()

        expect(onNewCategory).toHaveBeenCalled()                       //Pregunta si la funcion fue llamada 
    
        expect(onNewCategory).toHaveBeenCalledTimes(1)                 //Pregunta si fue llamada 1 vez 
    })


    test('Haciendo pruebas que la funcion de la prop onNewCategory haya sido llamada con el valor de "Goku"', ()=>{
    
        const input = screen.getByRole('textbox') 
        const form = screen.getByRole('form', {name:'formulario'})
        

        fireEvent.input( input, { target: {value: inputValue} })        //Dispara el evento change y escribe en el input 'Goku'
        fireEvent.submit( form)                                         //Hace submit            


        expect(onNewCategory).toHaveBeenCalledWith(inputValue)         //Evalua que la funcion haya sido llamada con el valor del input = Goku, es decir, que se este configurando con el valor de goku ej: onNewCategory(goku)
    })



    test('no debe llamar onNewCategory si el input esta vacio', ()=>{
        const input = screen.getByRole('textbox')
        const form = screen.getByRole('form', {name: 'formulario'})

        fireEvent.input( input, {target: {value: ''}})
        fireEvent.submit( form )

        expect(onNewCategory).not.toHaveBeenCalledOnce()
        expect(onNewCategory).not.toHaveBeenCalled()
        expect(onNewCategory).toHaveBeenCalledTimes(0)
    })
})