import React from 'react'
import '../../App.css';

const RegristoDireccion = () => {
    return (
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="text-center">Registro de dirección</h4>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="form-group">
                                    <label for="calle">Calle:</label>
                                    <input type="text" class="form-control" id="calle" placeholder="Ingresa el nombre de la calle" required>
                                </div>
                                <div class="form-group">
                                    <label for="numero-exterior">Número exterior:</label>
                                    <input type="text" class="form-control" id="numero-exterior" placeholder="Ingresa el número exterior" required>
                                </div>
                                <div class="form-group">
                                    <label for="numero-interior">Número interior:</label>
                                    <input type="text" class="form-control" id="numero-interior" placeholder="Ingresa el número interior (opcional)">
                                </div>
                                <div class="form-group">
                                    <label for="colonia">Colonia:</label>
                                    <input type="text" class="form-control" id="colonia" placeholder="Ingresa el nombre de la colonia" required>
                                </div>
                                <div class="form-group">
                                    <label for="municipio">Municipio:</label>
                                    <input type="text" class="form-control" id="municipio" placeholder="Ingresa el nombre del municipio o delegación" required>
                                </div>
                                <div class="form-group">
                                    <label for="estado">Estado:</label>
                                    <input type="text" class="form-control" id="estado" placeholder="Ingresa el nombre del estado" required>
                                </div>
                                <div class="form-group">
                                    <label for="codigo-postal">Código postal:</label>
                                    <input type="text" class="form-control" id="codigo-postal" placeholder="Ingresa el código postal" required>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block">Registrar dirección</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegristoDireccion;