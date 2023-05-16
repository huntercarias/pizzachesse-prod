import { Link, NavLink } from 'react-router-dom';
import '../../App.css';
import image1 from '../../imagenes/logoPizzaCheese.jpg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavbarCliente } from '../Navbar/NavbarCliente';
import { NavbarAdministrador } from '../Navbar/NavbarAdministrador';
import { NavbarDefault } from '../Navbar/NavbarDefault';
export const Navbar = () => {

    const [miToken, setMiToken] = useState(localStorage.getItem('miToken')); // almacenar token en estado

    // agregar evento para escuchar cambios en localStorage
    window.addEventListener('storage', (event) => {
        if (event.key === 'miToken') {
            setMiToken(event.newValue); // actualizar estado con el nuevo valor del token
        }
    });


    const [usuario, setUsurio] = useState({
        email: "INVITADO",
        rol: "INVITADO",
    });
    const [cargandoU, setCargandoU] = useState(true);
    const [error, setError] = useState(null);

    const baseURL = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/me`;

    // consulta token almacenado en la localstorage
    //const miToken = localStorage.getItem('miToken');

    const fetchUsuario = async () => {
        try {
            const response = await axios.post(baseURL, null, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                },
            });
            console.log(miToken);
            setUsurio(response.data);
            setCargandoU(false);
        } catch (error) {
            setError('Ocurrió un error con el usuario. Por favor, inténtalo de nuevo más tarde.');
            setCargandoU(false);
        }
    };

    useEffect(() => {
        fetchUsuario();
    }, [miToken]); // lista de dependencias vacía para evitar que se ejecute en cada renderizado

    return (
        <nav className="text-light bg-dark">
            <div className="row justify-content-between">
                <Link className="col-sm-4 col-md-3 col-lg-2" to="/">
                    <img src={image1} alt="Logo" className="rounded" width="80%" height="175" />
                </Link>
                {cargandoU ? (
                    <div className="row">
                        <NavbarDefault />
                        <div className="col-sm-4 col-md-3 col-lg-2">

                            <h5> {usuario.email} </h5>
                            <h5> {usuario.rol} </h5>

                        </div>
                    </div>
                ) : error ? (
                    <div className="row">
                        <NavbarDefault /><div className="col-sm-4 col-md-3 col-lg-2">
                            <h5> {usuario.email} </h5>
                            <h5> {usuario.rol} </h5>
                        </div>
                    </div>

                ) : (
                    usuario.rol === "ADMINISTRADOR" ? (
                        <div className="row">
                            <NavbarAdministrador />

                            <h5> {usuario.email} </h5>
                            <h5> {usuario.rol} </h5>
                        </div>

                    ) : usuario.rol === "CLIENTE" ? (
                        <div className="row">
                            <NavbarCliente />
                            <div className="col-sm-4 col-md-3 col-lg-2">
                                <h5> {usuario.email} </h5>
                                <h5> {usuario.rol} </h5>
                            </div>
                        </div>

                    ) : null
                )}

            </div>
        </nav>
    );
}