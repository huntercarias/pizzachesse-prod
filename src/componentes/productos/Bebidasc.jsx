import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';

import { useNavigate } from 'react-router-dom';

const Bebidasc = (props) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10; // Cambiar por la cantidad de productos por página

    const fetchProductos = async () => {
        try {
            const response = await axios.get(`http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/getAllProductos?page=${currentPage}&tipoproducto=${props.variable}`);
            setProductos(response.data.data);
            console.log(response.data.data);
            setCargando(false);
            //console.log(process.env.REACT_APP_API_HOST);
        } catch (error) {
            setError('Ocurrió un error al cargar los productos. Por favor, inténtalo de nuevo más tarde.');
            setCargando(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, [currentPage]);


    const navigate = useNavigate();

    async function handleEditarClick(id) {
        navigate(`/DetalleProducto/${id}`);
    };

    return (
        <div class="container-fluid">

            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Atras</button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={productos.length === 0 || productos.length < productsPerPage}>Next</button>

            <div class="album py-5 bg-body-tertiary">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-3 g-3">

                        {cargando ? (
                            <p>Cargando productos...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : productos.length > 0 ? (
                            productos.map((producto) => (
                                <div className="col" key={producto.id}>
                                    <div class="card shadow-sm">
                                        <div class="container text-center">
                                            <p>{producto.descripcion}</p>
                                        </div>

                                        <img src={`data:image/jpg;base64,${producto.ruta_imagen}`} alt={`Imagen de ${producto.descripcion}`} class="rounded mx-auto d-block" width="100%" height="225" />
                                        <div class="card-body">
                                            <p class="card-text">Q {producto.monto}</p>

                                        </div>
                                        <button type="button" class="btn btn-sm btn-outline-secondary" onClick={() => handleEditarClick(producto.id)}>
                                            VER DETALLE
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No se encontraron productos.</p>
                        )}
                    </div>
                </div>
            </div>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Atras</button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={productos.length === 0 || productos.length < productsPerPage}>Next</button>
        </div>
    );
};

export default Bebidasc;