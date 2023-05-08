import axios from 'axios';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";


const ProductosCarritoCompra = () => {

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [productos, setProductos] = useState([]);

    const baseURLusuario = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/ShowDetalleCarrito`;
    // consulta token almacenado en la localstorage
    const miToken = localStorage.getItem('miToken');
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);
    const consulta_usuario = async () => {
        try {
            const response = await axios.post(baseURLusuario, null, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                },
            });
            //setUsuario(response.data);
            setProductos(response.data.data);
            //console.log(response.data.data);
            setCargando(false);
            //valida_existe_carrito(usuario.id);
        } catch (error) {
            setUsuario(error);
            setCargando(false);
            //navigate('/Login');
        }
    };

    useEffect(() => {
        consulta_usuario();
        consulta_Saldo();
    }, []);

    const [cargandoA, setCargandoA] = useState(true);
    const [errorA, setErrorA] = useState(null);
    const [SaldoCarrito, setSaldoCarrito] = useState([]);

    const baseURLsaldo = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/ConsultaCarritoCompras`;

    const consulta_Saldo = async () => {
        try {
            const responseA = await axios.post(baseURLsaldo, null, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                },
            });
            //setUsuario(response.data);
            // console.log(responseA.data.data);
            setSaldoCarrito(responseA.data.data);
            //console.log(response.data.data);
            setCargandoA(false);
            //valida_existe_carrito(usuario.id);
        } catch (errorA) {
            setSaldoCarrito(errorA);
            setCargandoA(false);
            //navigate('/Login');
        }
    };





    return (
        <div>
            <h1>Detalle de Carrito de Compras</h1>
            <table class="table">
                <thead >
                    <tr>
                        <th scope="col">.</th>
                        <th scope="col">NOMBRE</th>
                        <th scope="col">CANTIDAD</th>
                        <th scope="col">MONTO</th>
                    </tr>
                </thead>
                <tbody>
                    {cargando ? (
                        <p>Cargando productos...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : productos.length > 0 ? (
                        productos.map((producto) => (
                            <tr>
                                <th scope="row">
                                    <img src={`data:image/jpg;base64,${producto.ruta_imagen}`} alt={`Imagen de ${producto.descripcion}`} class="rounded mx-auto d-block" width="60%" height="225" />
                                </th>
                                <td>
                                    {producto.descripcion}
                                </td>
                                <td>{producto.cantidad}</td>
                                <td>
                                    {producto.total}

                                </td>
                                <td>
                                    <button type="button" class="btn btn-sm btn-outline-secondary" >
                                        ELIMINAR
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <p>No se encontraron productos.</p>
                    )}
                </tbody>
                <tfoot>
                    {cargandoA && <p>Cargando...</p>}
                    {errorA && <p>Error cargando el Detalle del producto</p>}
                    {!cargandoA && (

                        <tr>
                            <td colspan="2">Total:</td>
                            <td> {SaldoCarrito.total}</td>
                            <td>
                                <button type="button" class="btn btn-sm btn-outline-secondary" >
                                    RELIZAR PEDIDO
                                </button>
                            </td>
                        </tr>
                    )}
                </tfoot>
            </table>
        </div>
    );
};

export default ProductosCarritoCompra;