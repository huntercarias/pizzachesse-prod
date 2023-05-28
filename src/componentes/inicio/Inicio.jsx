import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import image12 from '../../imagenes/horno_inicio_fondo_pantalla.jpg';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    async function handleEditarClick(id) {

        if (id == 1) {
            navigate(`/Pizzac`);
        } else if (id == 2) {
            navigate(`/Lazanac`);
        } else if (id == 3) {
            navigate(`/Calzonec`);
        } else if (id == 4) {
            navigate(`/Combosc`);
        } else {
            navigate(`/Bebidasc`);
        }

    };


    return (
        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
            {cargando ? (
                <p>Cargando productos...</p>
            ) : error ? (
                <p>{error}</p>
            ) : productos.length > 0 ? (
                productos.map((producto) => (
                    <div className="col" key={producto.id} onClick={() => handleEditarClick(producto.id)}>
                        <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
                            style={{ backgroundImage: `url(data:image/jpg;base64,${producto.ruta_imagen})` }}>
                            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{producto.titulo_corto}</h3>

                                <a onClick={() => handleEditarClick(producto.id)}>
                                    <h1>{producto.descripcion}</h1>
                                </a>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No se encontraron productos.</p>
            )}
        </div>
    );
};

export default Inicio;