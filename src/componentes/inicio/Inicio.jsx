import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import image12 from '../../imagenes/horno_inicio_fondo_pantalla.jpg';

const Inicio = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const image1 = image12;

    const fetchProductos = async () => {
        try {
            const response = await axios.get(`http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/getAlltipoProductos`);
            setProductos(response.data.data);
            console.log(response.data.data);
            setCargando(false);
        } catch (error) {
            setError('Ocurrió un error al cargar los tipos de producto. Por favor, inténtalo de nuevo más tarde.');
            setCargando(false);
        }
    };

    const divStyle = {
        backgroundImage: 'url(../../imagenes/horno_inicio_fondo_pantalla.jpg)',
        height: '100vh'
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <div className="container">
            <div className="row">

                {cargando ? (
                    <p>Cargando productos...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : productos.length > 0 ? (
                    productos.map((producto) => (
                        <div className="container">
                            <div className="row">
                                {producto.id === 1 ? (
                                    <div className="col-lg-12">
                                        <a href={`/Pizzac`}>

                                            <p>{producto.descripcion}</p>
                                            <img src={`data:image/jpg;base64,${producto.ruta_imagen}`} alt={`Imagen de ${producto.descripcion}`} class="rounded mx-auto d-block" width="100%" height="700" />
                                        </a>
                                    </div>
                                ) : (


                                    <div className="col-6 col-md-4">
                                        <a href={`/Lazanac`}>
                                            <p>{producto.descripcion}</p>
                                            <img src={`data:image/jpg;base64,${producto.ruta_imagen}`} alt={`Imagen de ${producto.descripcion}`} class="rounded mx-auto d-block" width="100%" height="700" />
                                        </a>
                                    </div>



                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron productos.</p>
                )}
            </div>
        </div >
    );
};

export default Inicio;