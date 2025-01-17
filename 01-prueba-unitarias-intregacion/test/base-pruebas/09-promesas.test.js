import { getHeroeByIdAsync } from "../../src/base-pruebas/09-promesas"

describe('Pruebas en 09-promesas sin uso async/away', () => { 
    
    
    test('getHeroByIdAsync debe retornar un hero', () =>{ 
          const id = 1

         const heroe = {
            id: 1,
            name: "Batman",
            owner: "DC",
          };

        return expect(getHeroeByIdAsync(id)).resolves.toEqual(heroe);
    })


    test('debe de obtener un error si el heroe por id no existe', () => {
        const id = 10;
        return expect(getHeroeByIdAsync(id)).rejects.toMatch('No se pudo encontrar el héroe');
    });


})




//mas rapido (recomendado)
describe('Pruebas en 09-promesas usando async/away (mas recomendado)', ()=>{
    
    test("getHeroeByIdAsync debe de retornar un héroe", async () => {
        const id = 1;
    
        const heroe = {
          id: 1,
          name: "Batman",
          owner: "DC",
        };

        const result = await getHeroeByIdAsync(id);
        expect(result).toEqual(heroe);
      });
      

      test("getHeroeByIdAsync debe de retornar un error si el héroe no existe", async () => {
        
        const id = 100;

        await expect(getHeroeByIdAsync(id)).rejects.toMatch(
          "No se pudo encontrar el héroe"
        );
      });
})




describe('Pruebas en 09-promesas usando then/catch', ()=>{
    test('getHeroByIdAsync debe retornar un hero', ()=>{
         
        const id = 1

        const heroe = {
           id: 1,
           name: "Batman",
           owner: "DC",
         };

        return getHeroeByIdAsync(id).then(hero =>{
                    expect(hero).toEqual(heroe)
                }).catch(error=>{
                    expect(error).toBe("No se pudo encontrar el héroe")
                })
        

    })
})