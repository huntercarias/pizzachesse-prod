import React, { useState, useEffect } from "react";
import '../../App.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const baseURL = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/register`;



const PagoTarjeta = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        apellido: '',
        email: '',
        password: '',
        fecha: '',
        genero: '',
        rol: 'CLIENTE'
    });

    // Función para manejar los cambios en los campos del formulario
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value

        });
    };

    // Función para manejar el envío del formulario
    /*const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(baseURL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert(response.data.mensaje + "\n" + response.data.data.descripcion);
            console.log(response);
            navigate('/');

        } catch (error) {
            alert(error.message);
            alert("Error Login");
            console.log(error);
        }
    };
*/
    const miToken = localStorage.getItem('miToken');
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();




            formData.append("status_pedido", "SOLICITADO");
            formData.append("forma_pago", 3);
            const response = await axios.post(`http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/RealizaSolicituInicial`, formData, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                },
            });

            // window.location.reload();
            console.log(response.data.data);
            alert("PAGO EXITOSO");

            navigate('/PedidosRealizadosUsuarios');
            //setCargando(false);
        } catch (error) {
            //setError('Ocurrió un error al eliminar el producto. Por favor, inténtalo de nuevo más tarde.');
            //setCargando(false);
            console.log(error);
            alert("error en seleccion intente mas tarde");
        }
    };

    const [cargandoA, setCargandoA] = useState(true);
    const [errorA, setErrorA] = useState(null);
    const [SaldoCarrito, setSaldoCarrito] = useState([]);

    const baseURLsaldo = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/ConsultaCarritoCompras`;

    const consulta_Saldo = async () => {
        try {
            const responseA = await axios.post(baseURLsaldo, null, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                },
            });
            //setUsuario(response.data);
            // console.log(responseA.data.data);
            setSaldoCarrito(responseA.data.data);
            //console.log(response.data.data);
            setCargandoA(false);
            //valida_existe_carrito(usuario.id);
        } catch (errorA) {
            setSaldoCarrito(errorA);
            setCargandoA(false);
            //navigate('/Login');
        }
    };

    useEffect(() => {
        consulta_Saldo();
    }, []);

    return (
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-md-6">
                    <div class="card">

                        {cargandoA && <p>Cargando...</p>}
                        {errorA && <p>Error cargando el Detalle del producto</p>}
                        {!cargandoA && (

                            <h1>
                                <td colspan="2">Total:</td>
                                <td> {SaldoCarrito.total}</td>

                            </h1>
                        )}


                        <div class="card-header">
                            <h1>Formulario de Pago</h1>
                        </div>
                        <div class="card-body">
                            <form class="form-inline" onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <label for="nombre_tarjeta">Nombre en la Tarjeta:</label>
                                    <input type="text" id="nombre_tarjeta" name="nombre_tarjeta" required />
                                </div>
                                <div class="form-group">
                                    <label for="numero_tarjeta">Número de Tarjeta:</label>
                                    <input type="text" id="numero_tarjeta" name="numero_tarjeta" required />
                                </div>

                                <div class="form-group">
                                    <label for="fecha_vencimiento">Fecha de Vencimiento:</label>
                                    <input type="text" id="fecha_vencimiento" name="fecha_vencimiento" placeholder="MM/AA" required />
                                </div>

                                <div class="form-group">
                                    <label for="cvv">CVV:</label>
                                    <input type="text" id="cvv" name="cvv" required />
                                </div>
                                <div class="form-group">
                                    <label for="direccion">Dirección de Facturación:</label>
                                    <input type="text" id="direccion" name="direccion" required />
                                </div>

                                <div class="form-group">
                                    <label for="ciudad">Ciudad:</label>
                                    <input type="text" id="ciudad" name="ciudad" required />
                                </div>

                                <div class="form-group">
                                    <label for="codigo_postal">Código Postal:</label>
                                    <input type="text" id="codigo_postal" name="codigo_postal" required />
                                </div>

                                <input type="submit" value="Pagar" />
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default PagoTarjeta;