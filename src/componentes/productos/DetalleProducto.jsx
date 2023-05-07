import { useParams } from "react-router-dom";
import image1 from '../../imagenes/logoPizzaCheese.jpg';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const DetalleProducto = () => {
    const params = useParams();

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [productos, setProductos] = useState([]);

    const baseURLproductos = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/getProducto?id=${params.id}`;
    const fetchProductos = async () => {
        try {
            const response = await axios.get(baseURLproductos);
            setProductos(response.data.data);
            setCargando(false);
        } catch (error) {
            setError('Ocurrió un error al cargar los productos. Por favor, inténtalo de nuevo más tarde.');
            setCargando(false);
        }
    };


    useEffect(() => {
        fetchProductos();
    }, []);



    const baseURLusuario = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/StoreProducto`;
    //const baseURLusuario = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/ShowDetalleCarrito`;
    // consulta token almacenado en la localstorage
    const miToken = localStorage.getItem('miToken');
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);
    const consulta_usuario = async (productos) => {
        console.log("carrito de compras");
        const formData = new FormData();
        formData.append("total", productos.monto);
        formData.append("cantidad", productos.cantidad);
        formData.append("id_productos", productos.id);
        try {
            const response = await axios.post(baseURLusuario, formData, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                },
            });
            //setUsuario(response.data);
            console.log(response);
            //valida_existe_carrito(usuario.id);
        } catch (error) {
            setUsuario(error);
            //navigate('/Login');
        }
    };

    async function handleEditarClick(productos) {
        consulta_usuario(productos);
    };

    return (
        <div>
            <h1>ProductDetails: {params.id}</h1>
            {cargando && <p>Cargando...</p>}
            {error && <p>Error cargando el Detalle del producto</p>}
            {!cargando && (

                <div class="row">
                    <div class="col-sm-12  col-md-6 col-lg-6  offset-s1">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="text-center">DETALLE PRODUCTO</h4>
                            </div>
                            <div class="card-body">

                                <div class="form-group">
                                    <label for="email">Descripción:</label>
                                    {productos.descripcion}
                                </div>

                                <div class="form-group">
                                    <label for="cantidad">Cantidad: </label>
                                    {productos.cantidad}
                                </div>
                                <div class="form-group">
                                    <label for="monto">Monto:</label>
                                    {productos.monto}
                                </div>
                                <button type="button" class="btn btn-sm btn-outline-secondary" onClick={() => handleEditarClick(productos)}>
                                    AGREGAR AL CARRITO DE COMPRAS
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12  col-md-6 col-lg-6 offset-s1">
                        <div class="card-content">
                            <div class="card-image">
                                <img
                                    src={`data:image/jpg;base64,${productos.ruta_imagen}`}
                                    alt="default"
                                    class="img-fluid"
                                    width="80%"
                                    height="100"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}

export default DetalleProducto;