import React from 'react';

const UpdatePizza = (props) => {
    return (
        <div>
            {props.variable}
            <div class="container mt-5">
                <div class="row">
                    <div class="col-md-6">
                        <img src="producto.jpg" class="img-fluid" alt="Producto"></img>
                    </div>
                    <div class="col-md-6">
                        <h1>Nombre del producto</h1>
                        <p>Descripción del producto...</p>
                        <p>Precio: $100</p>
                        <form>
                            <div class="form-group">
                                <label for="queso">¿Quieres agregar queso extra?</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="queso" value="si" id="queso" />
                                    <label class="form-check-label" for="queso">
                                        Sí, agregar queso extra (+$10)
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="bebida">¿Quieres agregar una bebida?</label>
                                <select class="form-control" id="bebida" name="bebida">
                                    <option value="">- Selecciona una opción -</option>
                                    <option value="coca">Coca Cola (+$15)</option>
                                    <option value="sprite">Sprite (+$15)</option>
                                    <option value="fanta">Fanta (+$15)</option>
                                </select>
                            </div>
                            <button type="button" class="btn btn-primary">Agregar al carrito</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdatePizza;