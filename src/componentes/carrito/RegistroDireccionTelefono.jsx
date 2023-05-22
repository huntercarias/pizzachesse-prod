import React, { useState } from "react";
import '../../App.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const baseURL = `${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/GuardaDireccionTelefono`;



const RegistroDireccionTelefono = () => {

    const miToken = localStorage.getItem('miToken');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nomenclatura: '',
        zona: '',
        ciudad: '',
        departamento: '',
        municipio: '',
        lote: '',
        numero_telefono: '',
        numero_celular: '',
        numero_de_whatzap: '',
    });

    // Función para manejar los cambios en los campos del formulario
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value

        });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(baseURL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${miToken}`,
                },
            });
            alert("guardado exitosamente");
            console.log(response);
            //navigate('/');

        } catch (error) {
            alert(error.message);
            alert("Error Login");
            console.log(error);
        }
    };

    async function enviaruta(ruta) {
        navigate(ruta);
    };


    return (
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="text-center">Registro Direcciones</h4>
                        </div>
                        <div class="card-body">
                            <form class="form-inline" onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <label for="nomenclatura">Nomenclatura:</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="nomenclatura"
                                        placeholder="Ingresa tu nomenclatura"
                                        required
                                        name="nomenclatura"
                                        value={formData.nomenclatura}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div class="form-group">
                                    <label for="zona">zona:</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="zona"
                                        placeholder="Ingresa tu zona"
                                        required
                                        name="zona"
                                        value={formData.zona}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div class="form-group">
                                    <label for="ciudad">Ciudad:</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="ciudad"
                                        placeholder="Ingresa tu ciudad"
                                        required
                                        name="ciudad"
                                        value={formData.ciudad}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>

                                <div class="form-group">
                                    <label for="departamento">Departamento:</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="confirmar-contrasena"
                                        placeholder="Confirma tu departamento"
                                        required
                                        name="departamento"
                                        value={formData.departamento}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="municipio">Municipio:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="municipio"
                                        name="municipio"
                                        required
                                        value={formData.municipio}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lote">Lote:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="lote"
                                        name="lote"
                                        required
                                        value={formData.lote}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="telefono">numero telefono:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="numero_telefono"
                                        name="numero_telefono"
                                        required
                                        value={formData.numero_telefono}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="extension">extension:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="extension"
                                        name="extension"
                                        required
                                        value={formData.extension}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fecha">numero celular:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="numero_celular"
                                        name="numero_celular"
                                        required
                                        value={formData.numero_celular}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="whatzap">numero de whatzap:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="numero_de_whatzap"
                                        name="numero_de_whatzap"
                                        required
                                        value={formData.numero_de_whatzap}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>

                                <button class="btn btn-primary btn-block" onClick={() => enviaruta("/DetalleDireccionTelefono")}>ATRAS</button>
                                <button type="submit" class="btn btn-primary btn-block">Registrarse</button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default RegistroDireccionTelefono;