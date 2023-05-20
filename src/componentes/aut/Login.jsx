import React, { useState } from "react";
import '../../App.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const baseURL = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/login`;

const Login = () => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });

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
        formData.append("email", formState.email);
        formData.append("password", formState.password);
        try {
            const response = await axios.post(baseURL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            //console.log(response.data.access_token);
            //almacena variable en la locallstorage de la maquina

            localStorage.setItem('miToken', response.data.access_token);
            navigate('/');
            window.location.reload();
        } catch (error) {
            //alert(error.message);
            localStorage.setItem('miToken', "");
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
                            <h4 class="text-center">Iniciar sesión</h4>
                        </div>
                        <div class="card-body">
                            <form class="form-inline" onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <label for="email">Correo electrónico:</label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="email"
                                        placeholder="Ingresa tu correo electrónico"
                                        required
                                        name="email"
                                        value={formState.email}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div class="form-group">
                                    <label for="contrasena">Contraseña:</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="password"
                                        placeholder="Ingresa tu contraseña"
                                        name="password"
                                        required
                                        value={formState.password}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block">Iniciar sesión</button>
                            </form>
                        </div>
                        <div class="card-footer">
                            <p class="text-center">¿No tienes cuenta? <a href="http://localhost:3000/Registro">Regístrate aquí</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;