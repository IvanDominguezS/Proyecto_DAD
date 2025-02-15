import { createContext, ReactNode, useContext, useReducer } from 'react';
import { Book } from '../interfaces/Book';
import { Action } from '../interfaces/Action';

interface CartState {
    items: Book[]
}

const initialCartState: CartState = {
    items: []
}

const cartReducer = (state: CartState, action: Action): CartState => {
    switch (action.type) {
        case "ADD": {
            const existingItem = state.items.find(
                (book: Book) => book.key === action.payload.key
            );

            let updatedItems;
            if (existingItem) {

                const updatedItem = {
                    ...existingItem,
                    amount: existingItem.amount + 1
                };

                updatedItems = state.items.map( //Reemplazamos el objeto nuevo, con la cantidad aumentada, por el anterior.
                    (book: Book) => updatedItem.key === book.key ? updatedItem : book
                )

            } else { //Metemos el objeto nuevo dentro de la lista.
                updatedItems = [...state.items, action.payload];
            };

            return {
                items: updatedItems
            };
        }

        case "DELETE": {
            const updatedItems = state.items.filter(
                (book: Book) => book.key !== action.payload.key
            );

            return {
                items: updatedItems
            };
        }

        case "PLUS_AMOUNT": {
            const existingItem = state.items.find(
                (book: Book) => book.key === action.payload.key
            );

            if(existingItem) {

                const updatedItem = {
                    ...existingItem,
                    amount: existingItem.amount + 1
                };

                const updatedItems = state.items.map( //Reemplazamos el objeto nuevo, con la cantidad aumentada, por el anterior.
                    (book: Book) => updatedItem.key === book.key ? updatedItem : book
                )

                return {
                    items: updatedItems
                };

            } else {
                return {
                    ...state
                }
            }

        }

        case "MINUS_AMOUNT": {

            if(action.payload.amount === 1) return cartReducer(state, { //Si reducimos cuando tiene 1, lo elimianmos.
                type: "DELETE",
                payload: action.payload
            });
            else {

                const existingItem = state.items.find(
                    (book: Book) => book.key === action.payload.key
                );
    
                if(existingItem) {

                    const updatedItem = {
                        ...existingItem,
                        amount: existingItem.amount - 1
                    };
    
                    const updatedItems = state.items.map( //Reemplazamos el objeto nuevo, con la cantidad aumentada, por el anterior.
                        (book: Book) => updatedItem.key === book.key ? updatedItem : book
                    )
    
                    return {
                        items: updatedItems
                    };

                } else {
                    return {
                        ...state
                    }
                }

            }

        }

        case "PAY": {
            return initialCartState;
        }

        default: {
            return state;
        }
    }
}

const CartContext = createContext<{ state: CartState, dispatch: any } | null>(null);
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initialCartState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => { //Hook personalizado para usar el contexto.
    const context = useContext(CartContext);

    if(!context) throw new Error("Debe usarse dentro de un CartProvider."); //Solo dará error cuando no hemos llamado al Provider.
    else return context;
}
