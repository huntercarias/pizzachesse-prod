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
                        <p>{producto.descripcion}</p>
                        <img src={`data:image/jpg;base64,${producto.ruta_imagen}`} alt={`Imagen de ${producto.descripcion}`} width="50%" height="80%" />
                    </div>
                ))
            ) : (
                <p>No se encontraron productos.</p>
            )}
        </div>
    );
};

export default Inicio;