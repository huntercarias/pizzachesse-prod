import React, { useState } from "react";
import axios from "axios";

const baseURL = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/ADDProductos`;
// consulta token almacenado en la localstorage
const miToken = localStorage.getItem('miToken');

function AddPizza() {
    const [formState, setFormState] = useState({
        descripcion: "",
        id_tiposproducto: 0,
        monto: 0.00,
        cantidad: 0,
        ruta_imagen: null,
    });

    // Función para manejar los cambios en los campos del formulario
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
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
        formData.append("cantidad", formState.cantidad);
        formData.append("ruta_imagen", formState.ruta_imagen);
        try {
            const response = await axios.post(baseURL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${miToken}`,
                },
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form class="form-inline" onSubmit={handleSubmit}>
            <div class="form-group mx-sm-3 mb-2">
                <label class="sr-only" htmlFor="descripcion">Descripcion:</label>
                <input
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    value={formState.descripcion}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Seleccione su género:</label>
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
            <div class="form-group mx-sm-3 mb-2">
                <label htmlFor="monto">monto:</label>
                <input
                    type="number"
                    id="monto"
                    name="monto"
                    value={formState.monto}
                    onChange={handleInputChange}
                />
            </div>
            <div class="form-group mx-sm-3 mb-2">
                <label htmlFor="cantidad">Cantidad:</label>
                <input
                    type="number"
                    id="cantidad"
                    name="cantidad"
                    value={formState.cantidad}
                    onChange={handleInputChange}
                />
            </div>


            <div class="form-group mx-sm-3 mb-2">
                <label htmlFor="ruta_imagen">Seleccionar archivo:</label>
                <input
                    type="file"
                    id="ruta_imagen"
                    name="ruta_imagen"
                    accept=".jpg,.png"
                    onChange={handleFileChange}
                />
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
}

export default AddPizza;