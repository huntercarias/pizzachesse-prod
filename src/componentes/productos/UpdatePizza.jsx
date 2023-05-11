import { useParams } from 'react-router-dom';
import image1 from '../../imagenes/logoPizzaCheese.jpg';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const baseURL = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/updateProducto`;
// consulta token almacenado en la localstorage
const miToken = localStorage.getItem('miToken');

const UpdatePizza = () => {
    const params = useParams();

    // Función para manejar los cambios en los campos del formulario
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('id', productos.id);
        formData.append('descripcion', formState.descripcion);
        formData.append('id_tiposproducto', formState.id_tiposproducto);
        formData.append('monto', formState.monto);
        formData.append('ruta_imagen', formState.ruta_imagen);

        // Utilizar imagen o ruta_imagen según imagenCargada
        if (formState.imagenCargada) {
            formData.append('ruta_imagen', formState.imagen);
        } else {
            formData.append('ruta_imagen', formState.ruta_imagen);
        }

        try {
            const response = await axios.post(baseURL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${miToken}`,
                },
            });
            alert(`${response.data.mensaje}\n${response.data.data.descripcion}`);
            console.log(response.data.data.descripcion);
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert('Error al agregar Producto');
        }
    };

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [formState, setFormState] = useState({
        id: '',
        descripcion: '',
        id_tiposproducto: '',
        monto: '',
        ruta_imagen: null,
        imagenCargada: false, // Agregar imagenCargada al estado
    });

    // Función para manejar la carga del archivo
    const handleFileChange = (event) => {
        setFormState({
            ...formState,
            ruta_imagen: event.target.files[0],
            imagenCargada: false, // Cambiar a false cuando se carga una nueva imagen
        });
    };
    const [productos, setProductos] = useState([]);
    const [imagenCargada, setImagenCargada] = useState(false);

    const fetchProductos = async () => {
        try {
            const response = await axios.get(`http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/getProducto?id=${params.id}`);
            console.log(response.data.data);
            const { id, id_tiposproducto, descripcion, ruta_imagen, monto } = response.data.data;
            setFormState({ ...formState, descripcion, id_tiposproducto, monto });
            setProductos(response.data.data);
            setCargando(false);
        } catch {
            setError('Ocurrió un error al cargar los productos. Por favor, inténtalo de nuevo más tarde.');
            setCargando(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    useEffect(() => {
        if (productos.ruta_imagen && !imagenCargada) {
            setFormState({
                ...formState,
                imagen: productos.ruta_imagen,
            });
            setImagenCargada(true);
        }
    }, [productos.ruta_imagen, imagenCargada]);

    return (
        <div>
            <h1>ProductDetails: {params.id}</h1>
            {cargando && <p>Cargando...</p>}
            {
                error && <p>{error}</p>
            }
            {!cargando && (
                <form class="form-inline mt-5" onSubmit={handleSubmit}>
                    <div class="row">
                        <div class="col-sm-12  col-md-6 col-lg-6  offset-s1">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="text-center">MODIFICAR NUEVO PRODUCTO</h4>
                                </div>
                                <div class="card-body">

                                    <div class="form-group">
                                        <label for="email">Descripción:</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="descripcion"
                                            placeholder="Ingresa la descripcion"
                                            required
                                            name="descripcion"
                                            value={formState.descripcion}
                                            onChange={handleInputChange}
                                        ></input>
                                    </div>
                                    <div class="form-group">

                                        <label>Seleccione tipo producto:</label>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="id_tiposproducto" id="1" value="1" onChange={handleInputChange} required />
                                            <label className="form-check-label" htmlFor="1">
                                                Pizza
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="id_tiposproducto" id="2" value="2" onChange={handleInputChange} required />
                                            <label className="form-check-label" htmlFor="2">
                                                Lazaña
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="id_tiposproducto" id="3" value="3" onChange={handleInputChange} required />
                                            <label className="form-check-label" htmlFor="3">
                                                Calzone
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="id_tiposproducto" id="4" value="4" onChange={handleInputChange} required />
                                            <label className="form-check-label" htmlFor="4">
                                                Combos
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="id_tiposproducto" id="5" value="5" onChange={handleInputChange} required />
                                            <label className="form-check-label" htmlFor="5">
                                                Bebidas
                                            </label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="monto">Monto:</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            class="form-control"
                                            id="monto"
                                            placeholder="Ingresa el monto"
                                            required
                                            name="monto"
                                            value={formState.monto}
                                            onChange={handleInputChange}
                                        ></input>
                                    </div>

                                    <button type="submit" class="btn btn-primary btn-block">MODIFICAR PRODUCTO</button>

                                </div>

                            </div>

                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 offset-s1">
                            <div class="card-content">
                                <div class="card-image">
                                    <img
                                        src={formState.ruta_imagen ? URL.createObjectURL(formState.ruta_imagen) : `data:image/jpg;base64,${productos.ruta_imagen}`}
                                        alt="default"
                                        class="img-fluid"
                                        width="80%"
                                        height="100"
                                    />
                                </div>
                            </div>
                            <div class="form-group mx-sm-3 mb-2 mt-3">
                                <label for="ruta_imagen">Seleccionar archivo:</label>
                                <input
                                    type="file"
                                    id="ruta_imagen"
                                    name="ruta_imagen"
                                    accept=".jpg,.png"
                                    onchange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>

                </form>

            )}



        </div>
    )
}

export default UpdatePizza;