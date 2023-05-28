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
            <div class="bd-example-snippet bd-code-snippet"><div class="bd-example">
                <table class="table table-hover text-center" >
                    <thead >
                        <tr>
                            <th scope="col">.</th>
                            <th scope="col">NOMBRE</th>
                            <th scope="col">EXTRAS</th>
                            <th scope="col" class="text-center">CANTIDAD</th>
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
                                    <th scope="row" >











                                        <img src={`data:image/jpg;base64,${producto.ruta_imagen}`} alt={`Imagen de ${producto.descripcion}`} class="rounded mx-auto d-block" width="60%" height="225" />
                                    </th>
                                    <td>
                                        {producto.descripcion}
                                    </td>
                                    <td><b>EXTRA QUESO =</b> {producto.extra_queso === 1 ? "SI" : "NO"}<br></br> <b>EXTRA JAMON =</b> {producto.extra_jamon === 1 ? "SI" : "NO"}<br></br><b>EXTRA PEPERONI =</b>{producto.extra_peperoni === 1 ? "SI" : "NO"} </td>
                                    <td class="text-center">{producto.cantidad}</td>
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
            </div>
        </div>
    );
};

export default DetallePedidosAdmin;