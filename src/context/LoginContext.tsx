import { createContext, ReactNode, useContext, useReducer } from 'react';
import { Action } from '../interfaces/Action';

interface LoginState {
    username: string,
    email: string,
    password: string
}

const initialLoginState: LoginState = {
    username: "",
    email: "",
    password: ""
}

const loginReducer = (state: LoginState, action: Action): LoginState => {

    switch(action.type) {
        case "LOGIN": {
            return action.payload;
        }

        case "LOGOUT": {
            return initialLoginState;
        }

        case "CHANGE_PASSWORD": {
            return {
                ...state,
                password: action.payload
            }
        }

        case "CHANGE_USERNAME": {
            return {
                ...state,
                username: action.payload
            }
        }

        case "CHANGE_EMAIL": {
            return {
                ...state,
                email: action.payload
            }
        }

    }

    return state;

}

const LoginContext = createContext<{ state: LoginState, dispatch: any } | null>(null);
export const LoginProvider = ({ children } : { children: ReactNode }) => {
    const[state, dispatch] = useReducer(loginReducer, initialLoginState);

    return (
        <LoginContext.Provider value={{ state, dispatch }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLoginContext = () => { //Hook personalizado para usar el contexto.
    const context = useContext(LoginContext);

    if(!context) throw new Error("Debe usarse dentro de un CartProvider."); //Solo dará error cuando no hemos llamado al Provider.
    else return context;
}
