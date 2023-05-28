import axios from 'axios';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";


const Pedidos = () => {

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [productos, setProductos] = useState([]);
    const baseURLusuario = `${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/ListaPedidosRealizadosUser`;
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
        //  consulta_Saldo();
    }, []);




    async function SeleccionarDireccion(id) {
        try {
            const formData = new FormData();
            formData.append("status_pedido", "CREACION PEDIDO");
            formData.append("id_direcciones", id);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/RealizaPedido`, formData, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                },
            });

            // window.location.reload();
            console.log(response.data.data);
            alert("seleccion exitosa");

            navigate('/DetalleTelefono');
            //setCargando(false);
        } catch (error) {
            //setError('Ocurrió un error al eliminar el producto. Por favor, inténtalo de nuevo más tarde.');
            //setCargando(false);
            console.log(error);
            alert("error en seleccion intente mas tarde");
        }
    }

    const [cargandoA, setCargandoA] = useState(true);
    const [errorA, setErrorA] = useState(null);
    const [SaldoCarrito, setSaldoCarrito] = useState([]);

    const baseURLsaldo = `${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/ConsultaCarritoCompras`;

    const consulta_Saldo = async () => {
        try {
            const responseA = await axios.post(baseURLsaldo, {
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


    async function handleEditarClick(id) {
        navigate(`/DetalleProductosAdmin/${id}`);
    };


    return (
        <div>
            <h1>PEDIDOS REALIZADOS</h1>

            <div class="bd-example-snippet bd-code-snippet"><div class="bd-example">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">CARRITO</th>
                            <th scope="col">TOTAL</th>
                            <th scope="col">ESTATUS PEDIDO</th>
                            <th scope="col">FORMA DE PAGO</th>
                        </tr>
                    </thead>
                    <tbody>

                        {cargando ? (
                            <p>Cargando productos...</p>
                        ) : error ? (
                            <p>NO TIENE PEDIDOS...</p>
                        ) : productos.length > 0 ? (
                            productos.map((producto) => (
                                <tr key={productos.id}>

                                    <th scope="row">{producto.id_carrito}</th>
                                    <td>Q {producto.total}</td>
                                    <td>{producto.status_pedido}</td>
                                    <td>
                                        {producto.forma_pago === 1 ? 'EFECTIVO' : producto.forma_pago === 2 ? 'POS' : producto.forma_pago === 3 ? 'BOTON DE PAGO' : ''}
                                    </td>

                                    <td>
                                        <button type="button" class="btn btn-sm btn-outline-secondary" onClick={() => handleEditarClick(producto.id_carrito)}>
                                            DETALLE PEDIDO
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <p>en espera</p>
                        )}
                    </tbody>

                </table>
            </div>
            </div>
        </div>
    );
};

export default Pedidos;