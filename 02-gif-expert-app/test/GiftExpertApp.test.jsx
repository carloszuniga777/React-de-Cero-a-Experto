import { beforeEach, describe } from "vitest";
import { GiftExpertApp } from "../src/GiftExpertApp";
import { render, fireEvent, screen } from "@testing-library/react";
import { expect } from "vitest";

describe("Pruebas en GiftExpertApp", ()=>{
    
    const newCategory = 'Naruto';

    beforeEach(()=>{
       // vi.clearAllMocks();                                    // Limpia las llamadas previas
        render(<GiftExpertApp/>)
    })
    
    
    test('deberia agregar una nueva categoria', ()=>{

        const newCategory2 = 'Dragon Ball';

        const input = screen.getByRole('textbox'); 
        const form = screen.getByRole('form'); 

        //ahora disparo los eventos para agregar 2 categorias nuevas
       fireEvent.input(input, { target: { value: newCategory } });  //Escribe Naruto
       fireEvent.submit(form);  //agrega Naruto

       
       fireEvent.input(input, { target: { value: newCategory2 } });  //Escribe Dragon Ball
       fireEvent.submit(form);  //agrega Dragon Ball

       //Espero que se hallan agregado 2 categorías cuyos nombres aparecen en etiquetas h3
       expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(2);

    })


    test('no deberia agregar una caategoria repetida', ()=>{
        
        const input = screen.getByRole('textbox'); 
        const form = screen.getByRole('form'); 

       //ahora disparo los eventos para agregar 3 categorias repetidas
       fireEvent.input(input, { target: { value: newCategory } });  //Escribe Naruto
       fireEvent.submit(form);  //agrega Naruto

       
       fireEvent.input(input, { target: { value: newCategory } });  //Escribe Naruto
       fireEvent.submit(form);  //agrega Naruto


       fireEvent.input(input, { target: { value: newCategory } });  //Escribe Naruto
       fireEvent.submit(form);  //agrega Naruto

       //screen.debug()

        //espero que no agregue la misma categoría y sólo esté agregada la primera vez
       expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(2);
    })


})