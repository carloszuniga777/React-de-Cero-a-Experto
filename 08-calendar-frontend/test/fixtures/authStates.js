import { authStatus } from "../../src/helpers"



export const initialState = {
    status: authStatus.CHECKING , 
    user: {},
    errorMessage: undefined,
}

export const authenticatedState = {
    status: authStatus.AUTHENTICATED,
    user: {
        uid: 'abc',
        name: 'Fernando'
    },
    errorMessage: undefined,
}

export const notAuthenticatedState = {
    status: authStatus.NOT_AUTHENTICATED,
    user: {},
    errorMessage: undefined,
}
