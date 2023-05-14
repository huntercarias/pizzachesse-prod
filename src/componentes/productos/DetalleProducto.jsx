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

    const [extras, setExtras] = useState({
        extra_queso: false,
        extra_jamon: false,
        extra_peperoni: false
    });
    const handleExtrasChange = (event) => {
        setExtras({
            ...extras,
            [event.target.name]: event.target.checked
        });
        if (event.target.checked) {
            setProductos({ ...productos, monto: Number(productos.monto) + 8 });
        } else {
            setProductos({ ...productos, monto: Number(productos.monto) - 8 });
        }
    };


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
        formData.append("cantidad", "1");
        formData.append("id_productos", productos.id);
        formData.append("extra_queso", extras.extra_queso ? "1" : "0");
        formData.append("extra_jamon", extras.extra_jamon ? "1" : "0");
        formData.append("extra_peperoni", extras.extra_peperoni ? "1" : "0");
        try {
            const response = await axios.post(baseURLusuario, formData, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                },
            });
            //setUsuario(response.data);
            alert("Agregado al carrito de compras")
            //window.location.reload();
            //console.log(response);
            //valida_existe_carrito(usuario.id);
        } catch (error) {
            setUsuario(error);
            navigate('/Login');
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








                                <div class="form-group">
                                    <label>Extras:</label>
                                    <div>
                                        <div class="form-check form-check-inline">
                                            <input
                                                type="checkbox"
                                                id="extra_queso"
                                                name="extra_queso"
                                                checked={extras.extra_queso}
                                                onChange={handleExtrasChange}
                                                class="form-check-input"
                                                disabled={productos.id_tiposproducto === 5 && true}
                                            />
                                            <label class="form-check-label" for="extra_queso">Extra Queso</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input
                                                type="checkbox"
                                                id="extra_jamon"
                                                name="extra_jamon"
                                                checked={extras.extra_jamon}
                                                onChange={handleExtrasChange}
                                                class="form-check-input"
                                                disabled={productos.id_tiposproducto === 5 && true}
                                            />
                                            <label class="form-check-label" for="extra_jamon">Extra Jamón</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input
                                                type="checkbox"
                                                id="extra_peperoni"
                                                name="extra_peperoni"
                                                checked={extras.extra_peperoni}
                                                onChange={handleExtrasChange}
                                                class="form-check-input"
                                                disabled={productos.id_tiposproducto === 5 && true}
                                            />
                                            <label class="form-check-label" for="extra_peperoni">Extra Pepperoni</label>
                                        </div>
                                    </div>
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