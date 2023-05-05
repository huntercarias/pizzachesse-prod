import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';



export const NavbarCliente = () => {
    //`${process.env.REACT_APP_API_URL}/Login`


    const baseURL = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/logout`;

    // consulta token almacenado en la localstorage
    const miToken = localStorage.getItem('miToken');

    const SalirUsuario = async () => {

        const [usuario, setUsurio] = useState([]);
        const [cargandoU, setCargandoU] = useState(true);
        const [error, setError] = useState(null);

        try {
            const response = await axios.post(baseURL, null, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                },
            });

            setUsurio(response.data);
            setCargandoU(false);
        } catch (error) {
            setError('Ocurrió un error con el usuario. Por favor, inténtalo de nuevo más tarde.');
            setCargandoU(false);
        }
    };




    return (
        <div class="col-sm-7 col-md-5 col-lg-7">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <h1>MENU</h1>
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Pizza"> <h3>PIZZA</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Lazana"><h3>LAZAÑA</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Calzone"><h3>CALZONE</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Combos"><h3>COMBOS</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Bebidas"><h3>BEBIDAS</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Carrito"><h3>CARRITO DE COMPRAS</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Pedidos"><h3>PEDIDOS REALIZADOS</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Login">
                            <form class="form-inline" onSubmit={SalirUsuario}>
                                <button class="btn btn-outline-primary" type="submit"><h3>SALIR</h3></button>
                            </form>
                        </NavLink>
                    </a></li>
                </ul>

            </div >
        </div>

    );
}