import { fireEvent, render, screen } from "@testing-library/react";
import { UserContext } from "../../src/09-UseContext/hooks/UserContext";
import { LoginPage } from "../../src/09-UseContext/LoginPage";


describe('Pruebas en <LoginPage />', () => {
    
    
    test('debe de mostrar el componente sin el usuario', () => {

        render(
            <UserContext.Provider value={{ user: null }}>
                <LoginPage />
            </UserContext.Provider>
        );

        const preTag = screen.getByLabelText('pre-arial-label');
        expect( preTag.innerHTML ).toBe('null');


    });




    test('debe de llamar el setUser cuando se hace click en el boton', () => {
        
        const setUserMock = vi.fn();

        render(
            <UserContext.Provider value={{ user: null, setUser: setUserMock }}>
                <LoginPage />
            </UserContext.Provider>
        );

        const button = screen.getByRole('button');
        fireEvent.click( button );

        expect( setUserMock ).toHaveBeenCalledWith({"correo": "juan@correo.hn", "id": 123, "name": "juan"})


    });


});