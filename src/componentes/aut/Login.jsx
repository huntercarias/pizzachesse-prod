import React from 'react'
import '../../App.css';

const Login = () => {
    return (
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="text-center">Iniciar sesión</h4>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="form-group">
                                    <label for="email">Correo electrónico:</label>
                                    <input type="email" class="form-control" id="email" placeholder="Ingresa tu correo electrónico" required></input>
                                </div>
                                <div class="form-group">
                                    <label for="contrasena">Contraseña:</label>
                                    <input type="password" class="form-control" id="contrasena" placeholder="Ingresa tu contraseña" required></input>
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