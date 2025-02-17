import { NavLink } from "react-router-dom"
import Switch from "react-switch";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { SearchBar } from "./SearchBar/SearchBar";

import logo from '../assets/img/dad-logo.gif';

export const NavBar = () => {

    const {isDarkMode, setIsDarkMode} = useDarkMode();

    useEffect(() => {

        const htmlTag = document.getElementById("html");

        if (isDarkMode) {
            htmlTag?.setAttribute('data-bs-theme', 'dark');
        } else {
            htmlTag?.removeAttribute('data-bs-theme');
        }

    }, [isDarkMode]);
    
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="#">
                    <img className="w-75 ms-3" src={logo} alt="Logo de DAD (séptimo círculo del Infierno)"/>
                </NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Inicio</NavLink>
                        </li>
                        
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/libros">Libros</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/carrito">Carrito</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/responsive">Elementos responsive</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/voz">Voz a texto</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/informes">Informes</NavLink>
                        </li>

                        <li className="nav-item ps-2">
                            <SearchBar/>
                        </li>
                    </ul>


                    <div className="ms-auto d-flex align-items-center">
                        
                        <ul className="navbar-nav pe-4">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user">
                                    <i className="bi bi-person-fill"/>
                                </NavLink>
                            </li>
                        </ul>

                        <ul className="navbar-nav pe-4">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">
                                    <i className="bi bi-door-open-fill"/>
                                </NavLink>
                            </li>
                        </ul>

                        <ul className="navbar-nav pe-4">
                            <li className="nav-item">

                                <Switch onChange={(checked) => setIsDarkMode(checked)} checked={isDarkMode}
                                    offHandleColor="#FFBF00"
                                    offColor="#FAD5A5"
                                    onHandleColor="#000000"
                                    onColor="#2e4482"
                                    uncheckedIcon={
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                fontSize: 15,
                                                color: "black",
                                                paddingRight: 2
                                            }}>
                                            ☼
                                        </div>
                                    }
                                    checkedIcon={
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                fontSize: 15,
                                                color: "white",
                                                paddingRight: 2
                                            }}>
                                            ☾
                                        </div>
                                    }
                                />

                            </li>
                        </ul>

                    </div>

                </div>

            </nav>
            
        </header>
    )
}