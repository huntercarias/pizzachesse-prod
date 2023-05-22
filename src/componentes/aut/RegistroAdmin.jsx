import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../../App.css';
import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/register`;



const RegistroAdmin = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        apellido: '',
        email: '',
        password: '',
        fecha: '',
        genero: '',
        rol: params.id
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
                },
            });
            //alert(response.data.mensaje + "\n" + response.data.data.descripcion);
            alert("REGISTRADO EXITOSAMENTE");
            console.log(response.data);
            navigate('/Login');
        } catch (error) {
            alert(error.message);
            alert("Error Login");
            console.log("Error");
        }
    };


    return (
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="text-center">Registro de usuario</h4>
                        </div>
                        <div class="card-body">
                            <form class="form-inline" onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <label for="name">Nombre:</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="name"
                                        placeholder="Ingresa tu nombre"
                                        required
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div class="form-group">
                                    <label for="apellido">Apellido:</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="apellido"
                                        placeholder="Ingresa tu apellido"
                                        required
                                        name="apellido"
                                        value={formData.apellido}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div class="form-group">
                                    <label for="email">Correo electrónico:</label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="email"
                                        placeholder="Ingresa tu correo electrónico"
                                        required
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>

                                <div class="form-group">
                                    <label for="confirmar-contrasena">contraseña:</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="confirmar-contrasena"
                                        placeholder="Confirma tu contraseña"
                                        required
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="fecha">Ingrese la fecha:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="fecha"
                                        name="fecha"
                                        required
                                        value={formData.fecha}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>

                                <div className="form-group">
                                    <label>Seleccione su género:</label>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="genero" id="femenino" value="Femenino" onChange={handleInputChange} required />
                                        <label className="form-check-label" htmlFor="femenino">
                                            Femenino
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="genero" id="masculino" value="Masculino" onChange={handleInputChange} required />
                                        <label className="form-check-label" htmlFor="masculino">
                                            Masculino
                                        </label>
                                    </div>
                                </div>



                                <button type="submit" class="btn btn-primary btn-block">Registrarse</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RegistroAdmin;