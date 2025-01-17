//Usando screen para hacer referencias del elemento en el dom | Manera correcta de hacer test
//Para el test descomentar el FirstApp en archivo main.jsx

import { render, screen } from "@testing-library/react"
import { FirstApp } from "../FirstApp"
import { expect } from "vitest"
import { beforeEach } from "vitest"


describe('Testeando FirsApp', () => { 
    
    let container_
    
    const title="Hola, soy vegeta"
    const subTitle = 'Soy un subtitulo'


    //Para renderizar FirstApp una sola vez y pueda ser usado en cada test
    beforeEach(()=>{

        const {container} = render(<FirstApp title={title} subTitle={subTitle}/>)   
    
        container_ = container

    })





     test('debe de hacer match con el snapshot', ()=>{

        expect(container_).toBeInTheDocument()   //Que se este renderizando en el dom

        expect(container_).toMatchSnapshot()   //Toma fotografia del componenete, y crea un archivo snapshoot. Si el dia de manana es componente cambia da error
    })    



     test('debe de mostrar el mensaje "Hola, soy Goku', ()=>{
        //screen.debug()

        expect(screen.getAllByText(title)).toBeTruthy()  //El titulo 'Hola, soy vegeta' se este renderizando en el componente
     })




     test('debe mostrar el titulo en un h1', ()=>{
        expect( screen.getByRole('heading', {level: 1}).innerHTML).toContain(title) //Busca que el elemento h1 contenga el titulo 'Hola, soy vegeta'
     })



     test('debe mostrar el subtitulo enviado por props', ()=>{
        expect(screen.getAllByText(subTitle).length).toBe(2)
     })


})