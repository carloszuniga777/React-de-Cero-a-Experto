

import { render, screen } from "@testing-library/react"
import { GiftItem } from "../../src/components"
import { expect } from "vitest"




describe('pruebas en GifItem', ()=>{

    const title = 'Lol'
    const url = 'htpps://google.com.hn'
    let container_

    beforeEach(()=>{
      const { container } = render(<GiftItem title={title} url={url}/>)
      container_ = container 
    })



    test('deberia hacer match con el snaptshot', ()=>{
       expect( container_ ).toMatchSnapshot()
    })



    test('debe de mostrar la imagen con el URL y el ALT indicado', ()=>{
        // expect(screen.getByRole('img').src).toBe(url)
        // expect(screen.getByRole('img').alt).toBe(title)
        
        const {src, alt} = screen.getByRole('img')
        expect(src).toBe(url)
        expect(alt).toBe(alt)

    })


    test('debe de mostrar el tituli en el componente', ()=>{
        expect(screen.getByText(title)).toBeTruthy()
    })




})