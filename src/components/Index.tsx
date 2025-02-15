import { Route, Routes } from 'react-router';
import { NavBar } from './NavBar';
import { Pagina_Carrito, Pagina_Home, Pagina_Libros, Pagina_Login, Pagina_User, Pagina_Responsive, Pagina_Voz, Pagina_Informes } from '../pages/pages'; //Conexión al archivo barril.
import { Chatbot } from './ChatBot/Chatbot';

import '../css/main.css';
import '../css/login.css';


export const Index = () => {

    return (

        <div id='main'>
            <NavBar />

            {
                  
                <Routes>
                    <Route path='/' element={<Pagina_Home />} />
                    <Route path='/libros' element={<Pagina_Libros />} />
                    <Route path='/carrito' element={<Pagina_Carrito />} />
                    <Route path='/login' element={<Pagina_Login />} />
                    <Route path='/user' element={<Pagina_User />} />
                    <Route path='/responsive' element={<Pagina_Responsive />} />
                    <Route path='/voz' element={<Pagina_Voz />}/>
                    <Route path='/informes' element={<Pagina_Informes />} />
                </Routes>
               
            }
            
            <Chatbot />
        </div>

    )
    
}
