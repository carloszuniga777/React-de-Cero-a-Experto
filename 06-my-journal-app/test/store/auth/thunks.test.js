import { loginWithEmailPassword, logoutFirebase, singInWithGoogle } from "../../../src/firebase";
import { checkingCredentials, login, logout, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store";
import { demoUser } from "../../fixtures/authFixtures";
import { getAuth, signOut } from 'firebase/auth';


//Los thunks de Auth llaman a funciones que por si mismas usan Firebase, por lo que debemos mockearlas
//Ejemplo de funciones singInWithGoogle y registerUserWithEmailPassword
vi.mock('../../../src/firebase/providers');


//Mock de getAuth y signOut de Firebase
vi.mock('firebase/auth', async () => {
    const actual = await vi.importActual('firebase/auth');
    return {
        ...actual,
        getAuth: vi.fn(),
        signOut: vi.fn(),
    };
});




describe('Pruebas en AuthThunks', () => {
    
    //Mock del dispatch
    const dispatch = vi.fn();
    
    //Limpiamos los mocks antes de cada prueba
    beforeEach( () => vi.clearAllMocks() );


    //Testeando al thunk de startGoogleSignIn y login en caso de exito
    test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async() => {
        
        //Configuracion inicial del Mock de SingInWithGoogle, se realiza mock porque es una funcion que usa internamente Firebase
        const loginData = { ok: true, ...demoUser };                    //Creamos un objeto con los datos del usuario y ok en true
        await singInWithGoogle.mockResolvedValue( loginData );          //Configuramos el mock de singInWithGoogle para que siempre devuelva el objeto LoginData cuando sea llamado 

        // thunk
        await startGoogleSignIn()( dispatch );                            //Ejecutamos el thunk el cual llama a checkingCredentials, SingInWithGoogle y despues a login

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );   //Se espera que haya sido llamado el dispatch de checkingCredentials  
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );      //Se espera que haya sido llamado el dispatch de login con los datos del usuario y ok en true, ya que la autenticacion fue exitosa. 

    });

    
   
 //Testeando al thunk de startGoogleSignIn y login en caso de fallo
    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async() => {
        
         
        //Configuracion inicial del Mock de SingInWithGoogle, se realiza mock porque es una funcion que usa internamente Firebase
        const loginData = { ok: false, errorMessage: 'Un error en Google' };           //Creamos un objeto con los datos del usuario y ok en false con un mensaje de error
        await singInWithGoogle.mockResolvedValue( loginData );                         //Configuramos el mock de singInWithGoogle para que siempre devuelva el objeto LoginData cuando sea llamado  

        // thunk 
        await startGoogleSignIn()( dispatch );                                           //Ejecutamos el thunk el cual llama a checkingCredentials, SingInWithGoogle y despues a login                              

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );               //Se espera que haya sido llamado el dispatch de checkingCredentials     
        expect( dispatch ).toHaveBeenCalledWith( logout(loginData.errorMessage) );     //Se espera que haya sido llamdo el dispatch de logout con el mensaje de error, ya que la autenticacion fallo

    });


   //Testeando el thunk de startLoginWithEmailPassword en caso de exito
    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => {
        
        //Configuracion inicial del Mock de loginWithEmailPassword, se realiza mock porque es una funcion que usa internamente Firebase
        const loginData = { ok: true, ...demoUser };                        //Creamos un objeto con los datos del usuario y ok en true
        await loginWithEmailPassword.mockResolvedValue( loginData );        //Configuramos el mock de loginWithEmailPassword para que siempre devuelva el objeto LoginData cuando sea llamado
        
         //Simulamos los datos del usuario que se ingresan en el formulario
        const formData = { email: demoUser.email, password: '123456' };

        // thunk
        await startLoginWithEmailPassword(formData)(dispatch);                 //Ejecutamos el thunk el cual llama a checkingCredentials y login

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );     //Se espera que haya sido llamado el dispatch de checkingCredentials
        expect( dispatch ).toHaveBeenCalledWith( login( loginData) );          //Se espera que haya sido llamado el dispatch de login con los datos del usuario y ok en true, ya que la autenticacion fue existosa

    });




    /* Testeando al thunk (Metodo 1 de Fernando) - (Sin probar)

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => {

        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
        
    });
    */



    //Testeando al thunk startLogout (Metodo 2)
    test('startLogout debe de llamar getAuth, signOut y logout', async() => {

       //Configuraciones iniciales del  Mock de getAuth y signOut
       const mockAuth = {};                 //Creamos un objeteo vacio que simula la instancia de autenticacion de Firebase
       getAuth.mockReturnValue(mockAuth);   //Configuramos el mock de getAuth para que siempre vuelva mockAuth cuando sea llamado 
       signOut.mockResolvedValue();         //Configuramos el mock de signOut para que resuelva una promesa sin valor cuando sea llamado. Esto simula una salida Exitosa

       // Llamamos al thunk a probar
        await startLogout()(dispatch);    //El thunk llama a getAuth, signOut y si todo sale vien despacha la accion de logout()


       // Verificar llamadas a Firebase
        expect(getAuth).toHaveBeenCalled();                     //Verificamos que getAuth haya sido llamado
        expect(signOut).toHaveBeenCalledWith(mockAuth);         //Verificamos que signOut haya sido llamado  


         // Verificar dispatch de acciones
         expect(dispatch).toHaveBeenCalledWith(logout());       //Verificamos que se haya despachado la accion de logout()
        
    });

    
});