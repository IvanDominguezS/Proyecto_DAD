import React, { ReactNode, RefObject, useRef, useState } from 'react';
import { algoliasearch } from 'algoliasearch';
import { InstantSearch, SearchBox, Hits, Highlight, Pagination, useInstantSearch, Configure } from 'react-instantsearch';
import { Popup_Content } from './Popup_Search';

import '../../css/search.css';

const appId = 'SGHENEAU30'; // Reemplaza con tu App ID de Algolia
const apiKey = 'eb70350a07b1b003e987d800dae5a557'; // Reemplaza con tu clave de búsqueda pública
const indexName = 'products_index'; // Reemplaza con el nombre de tu índice

const HitComponent: React.FC<{ hit: any }> = ({ hit }) => (
    <div className="hit-item">
        <p>
            <Highlight attribute="title" hit={hit} />
        </p>
        <p className="price">
            <Highlight attribute="price" hit={hit} />€
        </p>
    </div>
);

const NoResultsBoundary: React.FC = () => { //Mensaje para cuando no hay resultados.
    const { status } = useInstantSearch();

    if (status === 'idle' || status === 'loading') return null;
    else return (<p>No se encontraron resultados.</p>);
};

export interface PopupContentProps { //Usamos un interface, principalmente, porque no podemos pasar un ref directamente.
    isSearching: boolean,
    searchBar_ref: RefObject<HTMLDivElement>,
    children: ReactNode,
}

export const SearchBar = () => {
    const searchClient = algoliasearch(appId, apiKey);
    const [isSearching, setIsSearching] = useState(false);
    const searchBar_Results = (
        <>
            <NoResultsBoundary />
            <Hits hitComponent={HitComponent} />
            <Pagination />
        </>
    );
    let searchBar_Ref = useRef<HTMLDivElement>(null); //Creamos el ref para que se coloque correctamente y evitar que se pierda el "focus" de la barra de búsqueda.


    const props: PopupContentProps = {
        isSearching: isSearching,
        searchBar_ref: searchBar_Ref,
        children: searchBar_Results,
    };

    return (
        <div ref={searchBar_Ref}>
            <InstantSearch searchClient={searchClient} indexName={indexName}>

                <Configure hitsPerPage={5} />
                <SearchBox placeholder="Buscar..."
                queryHook={(query, search) => { //Esto se ejecutará cada vez que se escriba en el campo de texto. "query" guarda el contenido del campo y "search" es el método que realiza la búsqueda.
                    if(query != "") {
                        setIsSearching(true)
                        search(query); //Realizamos la búsqueda
                    } else setIsSearching(false);
                }}/>
                
                <Popup_Content props={props}/>
                
            </InstantSearch>
            
        </div>
        
    );

};