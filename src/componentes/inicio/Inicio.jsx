import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inicio = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const fetchProductos = async () => {
        try {
            const response = await axios.get('http://localhost/pizzachesse-prod/appBackend/public/api/getAlltipoProductos');
            setProductos(response.data.data);
            console.log(response.data.data);
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

            {cargando ? (
                <p>Cargando productos...</p>
            ) : error ? (
                <p>{error}</p>
            ) : productos.length > 0 ? (
                productos.map((producto) => (

                    <div className="col" key={producto.id}>
                        {producto.id === 1 ? (
                            <a href="http://localhost:3000/Productos">
                                <p>{producto.descripcion}</p>
                                <img src={`data:image/jpg;base64,${producto.ruta_imagen}`} alt={`Imagen de ${producto.descripcion}`} class="rounded mx-auto d-block" />
                            </a>
                        ) : (

                            producto.id === 2 ? (
                                <a href="http://localhost:3000/Productos">
                                    <p>{producto.descripcion}</p>
                                    <img src={`data:image/jpg;base64,${producto.ruta_imagen}`} alt={`Imagen de ${producto.descripcion}`} class="rounded mx-auto d-block" />
                                </a>
                            ) : (
                                <a href="http://localhost:3000/Productos">
                                    <p>{producto.descripcion}</p>
                                    <img src={`data:image/jpg;base64,${producto.ruta_imagen}`} alt={`Imagen de ${producto.descripcion}`} class="rounded mx-auto d-block" />
                                </a>
                            )

                        )}
                    </div>
                ))
            ) : (
                <p>No se encontraron productos.</p>
            )}
            <a href="http://localhost:3000/Productos">Ir a la página de productos</a>
        </div>
    );
};

export default Inicio;