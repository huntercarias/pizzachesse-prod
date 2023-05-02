import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';


const Inicio = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <div>

            <div class="album py-5 bg-body-tertiary">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-1">

                        {cargando ? (
                            <p>Cargando productos...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : productos.length > 0 ? (
                            productos.map((producto) => (

                                <div className="col" key={producto.id}>
                                    <div class="card shadow-sm">
                                        {producto.id === 1 ? (

                                            <a href={`${process.env.REACT_APP_API_URL} /Productos`}>
                                                ** {process.env.REACT_APP_API_URL} **
                                                <p>{producto.descripcion}</p>
                                                <img src={`data:image/jpg;base64,${producto.ruta_imagen}`} alt={`Imagen de ${producto.descripcion}`} class="rounded mx-auto d-block" width="100%" height="700" />
                                            </a>
                                        ) : (

                                            producto.id === 2 ? (
                                                <a href={`${process.env.REACT_APP_API_URL} /Productos`}>
                                                    <p>{producto.descripcion}</p>
                                                    <img src={`data:image/jpg;base64,${producto.ruta_imagen}`} alt={`Imagen de ${producto.descripcion}`} class="rounded mx-auto d-block" width="100%" height="700" />
                                                </a>
                                            ) : (
                                                <a href={`${process.env.REACT_APP_API_URL} /Productos`}>
                                                    <p>{producto.descripcion}</p>
                                                    <img src={`data:image/jpg;base64,${producto.ruta_imagen}`} alt={`Imagen de ${producto.descripcion}`} class="rounded mx-auto d-block" width="100%" height="700" />
                                                </a>
                                            )

                                        )}
                                    </div>
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