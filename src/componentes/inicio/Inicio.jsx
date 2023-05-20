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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/appBackend/public/api/getAlltipoProductos`);
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
                <div className="container">
                    <div className="row">
                        {cargando ? (
                            <p>Cargando productos...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : productos.length > 0 ? (
                            productos.map((producto) => (
                                <div className="col-lg-6 col-6 col-md-2">
                                    <a href={producto.id === 1 ? '/Pizzac' : '/Lazanac'}>
                                        <h1>{producto.descripcion}</h1>
                                        <img src={`data:image/jpg;base64,${producto.ruta_imagen}`} alt={`Imagen de ${producto.descripcion}`} className="rounded mx-auto d-block" width="100%" height="700" />
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p>No se encontraron productos.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inicio;