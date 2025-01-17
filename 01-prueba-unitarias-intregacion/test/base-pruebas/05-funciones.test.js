import { getUser } from "../../src/base-pruebas/05-funciones"



describe('Prueba en 05-funciones', () => {  
   test('getUser debe retornar un  objeto', ()=>{
        
     const testUser  = {
            uid: 'ABC123',
            username: 'El_Papi1502'
        }

        const user = getUser()
        
        expect(user).toStrictEqual(testUser)
        expect(user).toEqual(testUser)
        
   }) 
})