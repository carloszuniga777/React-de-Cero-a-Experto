import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MainApp } from '../../src/09-UseContext/MainApp';


describe('Pruebas en <MainApp /> | Test en React Router', () => {
    
    test('debe de mostrar el HomePage', () => {
        
        render( 
            <MemoryRouter>
                <MainApp /> 
            </MemoryRouter>
        );
        
        // screen.debug()
        
        //Se espera que en el documento exista el texto HomePage
        expect( screen.getByText('HomePage') ).toBeTruthy();

    });




    test('debe de mostrar el LoginPage', () => {
        
        render( 
            <MemoryRouter initialEntries={['/login']}>
                <MainApp /> 
            </MemoryRouter>
        );

         //screen.debug()

        //Se espera que en el documento exista el texto LoginPaga
        expect( screen.getByText('LoginPage') ).toBeTruthy();

    });

});