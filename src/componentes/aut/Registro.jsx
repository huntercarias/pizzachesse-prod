import React from 'react'
import '../../App.css';

const Registro = () => {
    return (
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="text-center">Registro de usuario</h4>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="form-group">
                                    <label for="nombre">Nombre:</label>
                                    <input type="text" class="form-control" id="nombre" placeholder="Ingresa tu nombre" required></input>
                                </div>
                                <div class="form-group">
                                    <label for="apellido">Apellido:</label>
                                    <input type="text" class="form-control" id="apellido" placeholder="Ingresa tu apellido" required></input>
                                </div>
                                <div class="form-group">
                                    <label for="email">Correo electrónico:</label>
                                    <input type="email" class="form-control" id="email" placeholder="Ingresa tu correo electrónico" required></input>
                                </div>
                                <div class="form-group">
                                    <label for="contrasena">Contraseña:</label>
                                    <input type="password" class="form-control" id="contrasena" placeholder="Ingresa tu contraseña" required></input>
                                </div>
                                <div class="form-group">
                                    <label for="confirmar-contrasena">Confirmar contraseña:</label>
                                    <input type="password" class="form-control" id="confirmar-contrasena" placeholder="Confirma tu contraseña" required></input>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block">Registrarse</button>
                            </form>
                        </div>
                        <div class="card-footer">
                            <p class="text-center">¿Ya tienes cuenta? <a href="#">Inicia sesión aquí</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Registro;