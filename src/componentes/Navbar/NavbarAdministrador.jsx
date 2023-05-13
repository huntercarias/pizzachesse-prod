import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const NavbarAdministrador = () => {
    //`${process.env.REACT_APP_API_URL}/Login`
    const navigate = useNavigate();
    const baseURL = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/logout`;

    // consulta token almacenado en la localstorage
    const miToken = localStorage.getItem('miToken');
    const [usuario, setUsurio] = useState([]);
    const [cargandoU, setCargandoU] = useState(true);
    const [error, setError] = useState(null);

    async function SalirUsuario() {



        try {
            const response = await axios.post(baseURL, null, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                },
            });
            window.location.reload();
            navigate('/Login');


        } catch (error) {
            console.log(error);
            alert("error salida");

            setError('Ocurrió un error con el usuario. Por favor, inténtalo de nuevo más tarde.');
            setCargandoU(false);
        }
    };



    return (
        <div class="col-sm-7 col-md-5 col-lg-2">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <h1>MENU</h1>
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Pizza"> <h3>PIZZA</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="/Lazana">
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
                        <NavLink className="nav-link" to="/AddProducto"><h3>AGREGAR PRODUCTOS</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Circulares"><h3>RESUMEN DE VENTAS</h3></NavLink>
                    </a></li>
                    <li> <form class="form-inline" onSubmit={SalirUsuario}>
                        <NavLink className="nav-link" >

                            <button type="button" class="btn btn-sm btn-outline-secondary" onClick={() => SalirUsuario}>
                                SALIR
                            </button>

                        </NavLink>
                    </form></li>
                </ul>

            </div >
        </div>

    );
}