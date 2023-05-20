import axios from 'axios';
import '../../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";


const DetallePedidosAdmin = () => {
    const params = useParams();

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [productos, setProductos] = useState([]);

    const baseURLusuario = `${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/ListaDetallePedido`;
    // consulta token almacenado en la localstorage
    const miToken = localStorage.getItem('miToken');
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);
    const consulta_usuario = async () => {
        const formData = new FormData();
        formData.append("id_carrito_compras", params.id);
        try {
            const response = await axios.post(baseURLusuario, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
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
    }, []);


    return (
        <div>
            <h1>DETALLE DE PRODUCTOS DEL PEDIDO</h1>
            <table class="table">
                <thead >
                    <tr>
                        <th scope="col">.</th>
                        <th scope="col">NOMBRE</th>
                        <th scope="col">EXTRA QUESO</th>
                        <th scope="col">EXTRA JAMON</th>
                        <th scope="col">EXTRA PEPPERONI</th>
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
                            <tr key={producto.id}>
                                <th scope="row">
                                    <img src={`data:image/jpg;base64,${producto.ruta_imagen}`} alt={`Imagen de ${producto.descripcion}`} class="rounded mx-auto d-block" width="60%" height="225" />
                                </th>
                                <td>
                                    <h1>{producto.descripcion}</h1>
                                </td>
                                <td><h1>{producto.extra_queso === 1 ? "SI" : "NO"}</h1></td>
                                <td><h1>{producto.extra_jamon === 1 ? "SI" : "NO"}</h1></td>
                                <td><h1>{producto.extra_peperoni === 1 ? "SI" : "NO"}</h1></td>
                                <td>{producto.cantidad}</td>
                                <td>
                                    {producto.total}

                                </td>

                            </tr>
                        ))
                    ) : (
                        <p>No se encontraron productos.</p>
                    )}
                </tbody>

            </table>
        </div>
    );
};

export default DetallePedidosAdmin;