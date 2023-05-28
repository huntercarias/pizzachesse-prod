import axios from 'axios';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";


const ProductosCarritoCompra = () => {

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [productos, setProductos] = useState([]);

    const baseURLusuario = `${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/ShowDetalleCarrito`;
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

    async function handleDelete(id) {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/EliminarProductoCarrito?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                },
            });
            setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id));
            window.location.reload();
            console.log(response.data.data);
            setCargando(false);
        } catch (error) {
            setError('Ocurrió un error al eliminar el producto. Por favor, inténtalo de nuevo más tarde.');
            setCargando(false);
        }
    }

    const [cargandoA, setCargandoA] = useState(true);
    const [errorA, setErrorA] = useState(null);
    const [SaldoCarrito, setSaldoCarrito] = useState([]);

    const baseURLsaldo = `${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/ConsultaCarritoCompras`;

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


    async function enviaruta(ruta) {
        navigate(ruta);
    };


    return (
        <div>
            <h1>Detalle de Carrito de Compras</h1>


            <div class="album py-5 bg-body-tertiary">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-3 g-3">

                        {cargando ? (
                            <p>Cargando productos...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : productos.length > 0 ? (
                            productos.map((producto) => (
                                <div className="col" key={producto.id}>
                                    <div class="card shadow-sm">
                                        <div class="container text-center">
                                            <p>{producto.descripcion}</p>
                                        </div>

                                        <img src={`data:image/jpg;base64,${producto.ruta_imagen}`} alt={`Imagen de ${producto.descripcion}`} class="rounded mx-auto d-block" width="100%" height="225" />
                                        <div class="card-body">
                                            <p class="card-text"></p>

                                            <div class="card-body">
                                                <h5 class="card-text">EXTRA QUESO = {producto.extra_queso === 1 ? "SI" : "NO"}</h5>
                                                <h5 class="card-text">EXTRA JAMON = {producto.extra_jamon === 1 ? "SI" : "NO"}</h5>
                                                <h5 class="card-text">EXTRA PEPERONI ={producto.extra_peperoni === 1 ? "SI" : "NO"}</h5>
                                                <h5 class="card-text">CANTIDAD ={producto.cantidad}</h5>
                                                <h5 class="card-text">MONTO = Q{producto.total}</h5>
                                            </div>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="btn-group">

                                                    <button type="button" class="btn btn-sm btn-outline-secondary" onClick={() => handleDelete(producto.id)} >
                                                        ELIMINAR
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No se encontraron productos.</p>
                        )}
                    </div>
                </div>
            </div>
            <table class="table">
                <tfoot>
                    {cargandoA && <p>Cargando...</p>}
                    {errorA && <p>Error cargando el Detalle del producto</p>}
                    {!cargandoA && (

                        <tr >
                            <td colspan="2">Total:</td>
                            <td> {SaldoCarrito.total}</td>
                            <td>

                                <button class="btn btn-primary btn-block" onClick={() => enviaruta("/DetalleDireccionTelefono")}>RELIZAR PEDIDO</button>
                            </td>
                        </tr>
                    )}
                </tfoot>
            </table>

        </div>
    );
};

export default ProductosCarritoCompra;