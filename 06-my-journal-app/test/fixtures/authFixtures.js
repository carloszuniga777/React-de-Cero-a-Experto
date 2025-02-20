
//Estado inicial de la autenticacion
export const initialState = {
    status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

//Estado de autenticacion autenticado
export const authenticatedState = {
    status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
}

//Estado de auntenticacion no autenticado
export const notAuthenticatedState = {
    status: 'not-authenticathed', // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

//Usuario de demostracion
export const demoUser = {
    uid: 'ABC123',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://foto.jpg'
}