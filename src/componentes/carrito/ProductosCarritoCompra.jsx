import axios from 'axios';
import '../../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";


const ProductosCarritoCompra = () => {
    const params = useParams();
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
            console.log(response.data.data);
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
            <h1>Detalle de Carrito de Compras</h1>
            <table class="table">
                <thead >
                    <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Precio unitario</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Subtotal</th>
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
                                <th scope="row">{producto.ruta_imagen}</th>
                                <td>{producto.descripcion}</td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.monto}</td>
                            </tr>
                        ))
                    ) : (
                        <p>No se encontraron productos.</p>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3">Total:</td>
                        <td>$35.00</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default ProductosCarritoCompra;