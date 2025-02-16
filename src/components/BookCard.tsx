import { useCartContext } from "../context/BookCartContext";
import { useFetchImage } from "../hooks/useFetch";
import { Book } from '../interfaces/Book';
import { Action } from '../interfaces/Action';

export const Search_BookCard = ({ book }: { book: Book }) => {
    
    const imageUrl = "https://covers.openlibrary.org/b/olid/" + book?.cover_edition_key + "-M.jpg"; //OLID = Open Library IDentifier.
    const { isImage, imageLoading } = useFetchImage(imageUrl);
    const { dispatch } = useCartContext();

    const handleAddToCart = () => {
        const act: Action = {
            type: "ADD",
            payload: book
        }

        dispatch(act);
    }

    return (
        <div className="card mt-3">

            <div className="card-body m-3">
                <h5 className="card-title">{book.title}</h5>

                { getAuthors(book.author_name) || <p className="card-text">Autor(es) desconocido(s)</p> }
                { getSubjects(book.subjects) || 'Tema(s) desconocido(s)' }
                <p className="card-text"><strong>Año de publicación:</strong> {book.publish_year || 'Año de publicación desconocido'}</p>

                {imageLoading ? (
                    <p className="text-muted">Cargando la imagen...</p>
                ) : isImage ? (
                    <img src={imageUrl} alt={book.title} className="img-fluid" />
                ) : (
                    <p className="text-muted">No se ha encontrado una imagen.</p>
                )}

                <section>
                    <button className="btn btn-primary mt-3" onClick={handleAddToCart}>
                        Añadir al carrito
                    </button>
                </section>
            </div>
        </div>
    )

}

export const CartItem_BookCard = ({ book }: { book: Book }) => {
    
    const imageUrl = "https://covers.openlibrary.org/b/olid/" + book?.cover_edition_key + "-M.jpg"; //OLID = Open Library IDentifier.
    const { isImage } = useFetchImage(imageUrl);
    const { dispatch } = useCartContext();

    const handleChangeAmount = (event: React.FormEvent<HTMLInputElement>) => {

        const newAmount = Number((event.target as HTMLInputElement).value); //Recogemos el valor como número.
        const act: Action = newAmount < book.amount //Vemos si es mayor o menor que la cantidad anterior para saber qué acción hacer.
            ? { type: "MINUS_AMOUNT", payload: book }
            : { type: "PLUS_AMOUNT", payload: book }

        dispatch(act);

    }

    const handleDeleteFromCart = () => {
        const act: Action = {
            type: "DELETE",
            payload: book
        }

        dispatch(act);
    }

    return (
        <div className="card mt-3 d-flex flex-row">
            {
                isImage && (
                    <div className="m-3 align-self-center">
                        <img src={imageUrl} alt={book.title} className="img-fluid" />
                    </div>
                )
            }

            <div className="card-body m-3">
                <div className="book-data">

                    <section className="d-flex flex-row justify-content-between">
                        <h5 className="card-title">{book.title}</h5>
                        <input type="number" value={book.amount} onInput={handleChangeAmount}/>
                    </section>
                    
                    { getAuthors(book.author_name) || <p className="card-text">Autor(es) desconocido(s)</p> }
                    { getSubjects(book.subjects) || 'Tema(s) desconocido(s)' }
                    <p className="card-text"><strong>Año de publicación:</strong> { book.publish_year || 'Año de publicación desconocido' }</p>

                    <section>
                        <button className="btn btn-danger mt-3" onClick={handleDeleteFromCart}>
                            Eliminar del carrito
                        </button>
                    </section>

                </div>
                
            </div>

        </div>
    )

}

const getAuthors = (authors: any) => {
    
    if (!authors) return null;
    return (
        <>
            {
                authors.map((author: string, index: number) => {
                    return <h6 className="card-subtitle mb-2 text-muted" key={index}>{author}</h6>
                })
            }
        </>

    )

}

const getSubjects = (subjects: any) => {
    
    if (!subjects) return null;
    return(
        <p className="card-text text-capitalize"><strong>Temas: </strong> 
            {
                subjects.map((subject: string, index: number) => (
                    index === subjects.length - 1 ? subject : subject + ", " 
                ))
            }
        </p>
    )

}