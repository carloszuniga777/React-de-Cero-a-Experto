import { expect } from "vitest"
import { getGifs } from "../../src/helpers/getGifs"

describe('pruebas en getGift', ()=>{
    
    test('debe de retornar un arreglo de gift', async()=>{
        const gifs = await getGifs('Dragon Ball')
        //console.log(gifs)

        expect(gifs.length).toBeGreaterThan(0)   //El arreglo tiene al menos 1 elemento
        
        expect(gifs[0]).toEqual({
            id: expect.any(String),
            title: expect.any(String),
            url: expect.any(String)
        })
    })
})