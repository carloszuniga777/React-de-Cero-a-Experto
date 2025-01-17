//Si hacer uso del screen | No es la forma recomendada. (Ver archivo FirstApp2 manera correcta de evaluar el elemento en dom)
import { render } from "@testing-library/react"
import { FirstApp } from "../FirstApp"
import { expect } from "vitest"
import { beforeEach } from "vitest"


describe('Testeando FirsApp', () => { 
    
    let container_, getByText_, getAllByText_, getByTestId_
    
    const title="Hola, soy vegeta"
    const subTitle = 'Soy un subtitulo'


    //Para renderizar FirstApp una sola vez y pueda ser usado en cada test
    beforeEach(()=>{

        //En este ejemplo no se usa 'Screen'de testing library por eso se toma con variables gobales,
        //Ver archivo FirstApp2 es la manera correcta de hacer referencia al elemento
        const {container, getByText, getAllByText, getByTestId} = render(<FirstApp title={title} subTitle={subTitle}/>)   
    
        container_ = container
        getByText_ = getByText
        getByTestId_ = getByTestId
        getAllByText_ = getAllByText
    })





    test('debe de hacer match con el snapshot', ()=>{

       expect(container_).toBeInTheDocument()   //Que se este renderizando en el dom

       expect(container_).toMatchSnapshot()   //Toma fotografia del componenete, y crea un archivo snapshoot. Si el dia de manana es componente cambia da error
    })    




    test('debe de mostrar el titulo en h1', ()=>{
        expect(getByText_(title)).toBeTruthy()   //Busca el texto Hola, soy vegeta se este renderizando en el dom
    })



    //No es recomendable, pero se puede usar el dom
    test('debe de mostrar el titulo en h1, buscando en el dom', ()=>{
       const h1 = container_.querySelector('h1')
       expect(h1.innerHTML).toContain(title)
    })

     

    
    test('Testeando el data-testid para obtener el titulo en h1', ()=>{
        expect(getByTestId_('test-title')).toBeTruthy()   //Busca que exista el atributo llamado 'test-title' en el elemento
        
        
        expect(getByTestId_('test-title').innerHTML).toContain(title) //Evaluando que el atributo data-testid contenga el texto 'Hola, soy vegeta' 
        
        //expect(getByTestId_('test-title').innerHTML).toBe(title)  //toBe es estricto, tiene que tener mismos espacios, palabra, etc
        
    })



    test('debe de mostrar el subtitulo enviado por props', ()=>{
          expect( getAllByText_(subTitle).length ).toBe(2)  //Busca que se renderice dos veces el subtitulo 'Soy un subtitulo' en el elemento
    })



})