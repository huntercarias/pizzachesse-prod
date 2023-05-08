import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const NavbarCliente = () => {
    //`${process.env.REACT_APP_API_URL}/Login`

    //console.log("estoy aqui ciente");
    const baseURL = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/logout`;

    // consulta token almacenado en la localstorage
    const miToken = localStorage.getItem('miToken');
    const navigate = useNavigate();
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
                        <NavLink className="nav-link" to="/Pizzac"> <h3>PIZZA</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Lazanac"><h3>LAZAÑA</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Calzonec"><h3>CALZONE</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Combosc"><h3>COMBOS</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Bebidasc"><h3>BEBIDAS</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/ProductosCarritoCompra"><h3>CARRITO DE COMPRAS</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Pedidos"><h3>PEDIDOS REALIZADOS</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" >

                            <button type="button" class="btn btn-sm btn-outline-secondary" onClick={() => SalirUsuario()}>
                                SALIR
                            </button>
                        </NavLink>
                    </a></li>
                </ul>

            </div >
        </div>

    );
}