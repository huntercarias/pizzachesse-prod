import { useParams } from "react-router-dom";
import image1 from '../../imagenes/logoPizzaCheese.jpg';
import axios from "axios";
import React, { useState, useEffect } from "react";



const DetalleProducto = () => {
    const params = useParams();

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);



    const [productos, setProductos] = useState([]);
    const fetchProductos = async () => {
        try {
            const response = await axios.get(`http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/getProducto?id=${params.id}`);
            console.log(response.data.data);


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

    return (
        <div>
            <h1>ProductDetails: {params.id}</h1>



            {cargando && <p>Cargando...</p>}
            {!cargando && (
                <form class="form-inline mt-5" >
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

                                    <button type="submit" class="btn btn-primary btn-block">Agregar Carrito</button>

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

                </form>

            )}



        </div>
    )
}

export default DetalleProducto;