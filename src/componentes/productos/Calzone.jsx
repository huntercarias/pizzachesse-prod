import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
const Calzone = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10; // Cambiar por la cantidad de productos por página

    const fetchProductos = async () => {
        try {
            const response = await axios.get(`https://pizzacheesse.com/appBackend/public/api/getAllProductos?page=${currentPage}&tipoproducto=1`);
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
                                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                                </div>
                                                <small class="text-body-secondary">9 mins</small>
                                            </div>
                                        </div>
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

export default Calzone;