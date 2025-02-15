import { useCartContext } from '../context/BookCartContext';
import { Book } from '../interfaces/Book';
import { CartItem_BookCard } from '../components/BookCard';

export const Pagina_Carrito = () => {
    const { state } = useCartContext();
    const books = state.items;

    return (
        <div className='container mt-3'>
            <h2 className="text-center">Carrito de libros:</h2>

            {
                
                books.length > 0 ?
                    books.map((book: Book) => (
                        <CartItem_BookCard key={book.key} book={book} />
                    ))
                : (
                    <p className="text-center fs-5 text-muted">El carrito está vacío actualmente.</p>
                )

            }
        </div>
    )
}

