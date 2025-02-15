import { useState } from 'react';
import { Book } from '../interfaces/Book';
import { Search_BookCard } from '../components/BookCard';

export const Pagina_Libros = () => {
    const [title, setTitle] = useState("");
    const [response, setReponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const searchBook = async () => {
        setReponse(null);
        setLoading(true);
        const query = "https://openlibrary.org/search.json?limit=5&q=" + title;

        try {
            const response = await fetch(query); //Esta línea realiza la petición HTTP a la REST API.
            const data = await response.json();
            setReponse(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
            setError(error);
            setLoading(false);
        }
    }

    const onChangeTitle = (newTitle: string) => {
        setTitle(newTitle);
    }

    const books = getBooks(response);
    return (
        <div className='container mt-3 mb-3'>
            <h2 className='text-center mb-4'>Buscador de libros:</h2>
            <section className='input-group mb-3'>
                <input type="text" value={title} onChange={(e) => onChangeTitle(e.target.value)} placeholder="Título del libro" className='form-control' />
                <button onClick={searchBook} className='btn btn-outline-primary'>Buscar libro</button>
            </section>

            {

                response && (
                    <div className='bookList'>
                        {
                            books.map((book: Book) => (
                                <Search_BookCard key={book.key} book={book}/>
                            ))
                        }
                    </div>
                ) || loading && (
                    <>
                        <p className='text-center'>Cargando...</p>
                    </>
                ) || error && (
                    <>
                        <p className='text-center'>No se han podido cargar los libros.</p>
                    </>
                ) 

            }
        </div>
    )
}

const getBooks = (response: any): Book[] => {
    
    const books = response?.docs.map((book: any) => ({
        title: book.title,
        key: book.key,
        author_name: book.author_name || undefined,
        subjects: book.subject_facet || undefined,
        publish_year: book.publish_year?.[0] || undefined,
        cover_edition_key: book.cover_edition_key || undefined,
        amount: 1
    }));

    return books;

}