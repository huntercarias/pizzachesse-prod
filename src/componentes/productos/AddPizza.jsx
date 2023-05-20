import React, { useState } from "react";
import axios from "axios";
import image1 from '../../imagenes/logoPizzaCheese.jpg';
import { useNavigate } from 'react-router-dom';

const baseURL = `${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/ADDProductos`;
// consulta token almacenado en la localstorage
const miToken = localStorage.getItem('miToken');

function AddPizza() {


    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        descripcion: "",
        id_tiposproducto: "",
        monto: "",
        cantidad: "",
        ruta_imagen: null,
    });

    // Función para manejar los cambios en los campos del formulario
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value

        });
    };

    // Función para manejar la carga del archivo
    const handleFileChange = (event) => {
        setFormState({
            ...formState,
            ruta_imagen: event.target.files[0],
        });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("descripcion", formState.descripcion);
        formData.append("id_tiposproducto", formState.id_tiposproducto);
        formData.append("monto", formState.monto);
        formData.append("ruta_imagen", formState.ruta_imagen);
        try {
            const response = await axios.post(baseURL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${miToken}`,
                },
            });
            alert(response.data.mensaje + "\n" + response.data.data.descripcion);
            console.log(response.data.data.descripcion);
            navigate('/');
            //window.location.reload();
        } catch (error) {
            console.log(error);
            alert("Error al agregar Producto intente mas tarde");
            navigate('/');
        }
    };

    return (
        <form class="form-inline mt-5" onSubmit={handleSubmit}>
            <div class="row">
                <div class="col-sm-12  col-md-6 col-lg-6  offset-s1">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="text-center">AGREGA NUEVO PRODUCTO</h4>
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

                            <button type="submit" class="btn btn-primary btn-block">AGREGAR PRODUCTO</button>

                        </div>

                    </div>

                </div>
                <div class="col-sm-12  col-md-6 col-lg-6 offset-s1">

                    <div class="card-content">
                        <div class="card-image">
                            <img src={formState.ruta_imagen ? URL.createObjectURL(formState.ruta_imagen) : image1} alt="default" class="img-fluid" width="80%" height="100" />
                        </div>
                    </div>


                    <div class="form-group mx-sm-3 mb-2 mt-3">
                        <label htmlFor="ruta_imagen">Seleccionar archivo:</label>
                        <input
                            type="file"
                            id="ruta_imagen"
                            name="ruta_imagen"
                            accept=".jpg,.png"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
            </div>

        </form>
    );
}

export default AddPizza;