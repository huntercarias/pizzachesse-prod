import { Link, NavLink } from 'react-router-dom';
import '../../App.css';
import image1 from '../../imagenes/logoPizzaCheese.jpg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';



export const Navbar = () => {

    const [usuario, setUsurio] = useState([]);
    const [cargandoU, setCargandoU] = useState(true);
    const [error, setError] = useState(null);

    const baseURL = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/me`;

    // consulta token almacenado en la localstorage
    const miToken = localStorage.getItem('miToken');

    const fetchUsuario = async () => {
        try {
            //console.log(miToken);
            const response = await axios.post(baseURL, null, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                    //"Authorization": `Bearer ${miToken}`,
                },
            });

            setUsurio(response.data);
            //console.log(usuario.rol);
            setCargandoU(false);
            //console.log(process.env.REACT_APP_API_HOST);
        } catch (error) {
            setError('Ocurrió un error con el usuario. Por favor, inténtalo de nuevo más tarde.');
            //console.log("error");
            setCargandoU(false);
        }
    };

    useEffect(() => {
        fetchUsuario();
    });


    return (
        <nav class="text-light bg-dark" >
            <div class="row justify-content-between">

                <Link class="col-sm-4 col-md-3 col-lg-2" to="/">
                    <img src={image1} alt="Logo" class="rounded" width="80%" height="175" />
                </Link>

                <div class="col-sm-4 col-md-4 col-lg-10">
                    <div class="row justify-content-end">
                        <NavLink class="col-sm-12 col-md-6 col-lg-2 align-self-end" className="p-2" to="/Pizza">
                            <h3>Pizza</h3>
                        </NavLink>
                        <NavLink class="col-sm-12 col-md-6 col-lg-2 align-self-end" className="p-2" to="http://localhost:3000/Lazana">
                            <h3>Lazaña</h3>
                        </NavLink>
                        <NavLink class="col-sm-12 col-md-6 col-lg-2 align-self-end" className="p-2" to="http://localhost:3000/Calzone">
                            <h3>Calzone</h3>
                        </NavLink>
                        <NavLink class="col-sm-12 col-md-6 col-lg-2 align-self-end" className="p-2" to="http://localhost:3000/Combos">
                            <h3>Combos</h3>
                        </NavLink>
                        <NavLink class="col-sm-12 col-md-6 col-lg-2 align-self-end" className="p-2" to="http://localhost:3000/Bebidas">
                            <h3>Bebidas</h3>
                        </NavLink>


                        <NavLink class="col-sm-12  col-md-12 col-lg-2" className="p-2">
                            {cargandoU ? (
                                <a href={`${process.env.REACT_APP_API_URL}/Login`}>
                                    <form>
                                        <button class="btn btn-outline-primary" type="submit"><h3>Login</h3></button>
                                    </form>
                                </a>
                            ) : error ? (
                                <a href={`${process.env.REACT_APP_API_URL}/Login`}>
                                    <form>
                                        <button class="btn btn-outline-primary" type="submit"><h3>Login</h3></button>
                                    </form>
                                </a>
                            ) : (
                                <form>
                                    {usuario.rol === "administrador" ? (
                                        <>
                                            <h3>Dashboard </h3>
                                            <h3>Ingreso Produdctos </h3>
                                            <h3>Actualiza Productos </h3>
                                        </>
                                    ) : usuario.rol === "CLIENTE" ? (
                                        <>
                                            <h3>Carrito de Compras </h3>
                                            <h3>Pedidos Realizados </h3>
                                        </>
                                    ) : null}
                                    <h3>Bienvenido {usuario.email}</h3>
                                    <a href="http://localhost:3000/Login">
                                        <button class="btn btn-outline-primary" type="submit"><h3>Salir</h3></button>
                                    </a>
                                </form>
                            )}
                        </NavLink>


                    </div>
                </div>

            </div>
        </nav >
    );
}