import axios from 'axios';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";


const DetalleCompra = () => {


    const [paymentMethod, setPaymentMethod] = useState("");


    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(paymentMethod);
        DetalleCompra(paymentMethod);
        // Aquí podrías enviar los datos del formulario al servidor o realizar otra acción
    };



    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [productos, setProductos] = useState([]);
    const baseURLusuario = `${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/ConsultaDatosPedidos`;
    //const baseURLusuario = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/ShowDetalleCarrito`;
    // consulta token almacenado en la localstorage
    const miToken = localStorage.getItem('miToken');
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);
    const consulta_usuario = async () => {
        try {
            const response = await axios.post(baseURLusuario, null, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                },
            });
            //setUsuario(response.data);
            setProductos(response.data.data);

            setCargando(false);
            //valida_existe_carrito(usuario.id);
        } catch (error) {
            setUsuario(error);
            setCargando(false);
            //navigate('/Login');
        }
    };

    useEffect(() => {
        consulta_usuario();
        //  consulta_Saldo();
    }, []);




    async function DetalleCompra(id) {
        try {
            const formData = new FormData();

            switch (id) {
                case "cash":
                    id = 1;
                    break;
                case "pos":
                    id = 2;
                    break;
                case "paymentButton":
                    id = 3;
                    break;
                default:
                    id = "";
            }



            formData.append("status_pedido", "SOLICITADO");
            formData.append("forma_pago", id);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/RealizaSolicituInicial`, formData, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                },
            });

            // window.location.reload();
            console.log(response.data.data);
            alert("PEDIDO REALIZADO");

            navigate('/PedidosRealizadosUsuarios');
            //setCargando(false);
        } catch (error) {
            //setError('Ocurrió un error al eliminar el producto. Por favor, inténtalo de nuevo más tarde.');
            //setCargando(false);
            console.log(error);
            alert("error en seleccion intente mas tarde");
        }
    }

    async function handleEditarClick() {
        navigate('/PagoTarjeta');
    };

    async function enviaruta(ruta) {
        navigate(ruta);
    };



    return (
        <div>
            <h1>Confirmacion direcciones</h1>
            <button class="btn btn-primary btn-block" onClick={() => enviaruta("/RegistroDireccionTelefono")}>REGISTRAR DIRECCIONES Y TELEFONOS</button>


            <div class="bd-example-snippet bd-code-snippet"><div class="bd-example">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">NOMENCLATURA</th>
                            <th scope="col">ZONA</th>
                            <th scope="col">CIUDAD</th>
                            <th scope="col">DEPARTAMENTO</th>
                            <th scope="col">MUNICIPIO</th>
                            <th scope="col">LOTE</th>
                        </tr>
                    </thead>
                    {cargando ? (
                        <p>Cargando productos...</p>
                    ) : error ? (
                        <button class="btn btn-primary btn-block" onClick={() => enviaruta("/RegistroDireccionTelefono")}>REGISTRAR DIRECCIONES Y TELEFONOS</button>
                    ) : (
                        <tbody>
                            {productos.direcciones && Object.keys(productos.direcciones).length > 0 ? (
                                <tr scope="row" key={productos.direcciones.id}>
                                    <th scope="row">{productos.direcciones.nomenclatura}</th>
                                    <td>{productos.direcciones.zona}</td>
                                    <td>{productos.direcciones.ciudad}</td>
                                    <td>{productos.direcciones.departamento}</td>
                                    <td>{productos.direcciones.municipio}</td>
                                    <td>{productos.direcciones.lote}</td>
                                </tr>
                            ) : null}


                        </tbody>
                    )}
                </table>
            </div></div>

            <div class="bd-example-snippet bd-code-snippet"><div class="bd-example">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">NUMERO TELEFONO</th>
                            <th scope="col">EXTENSION</th>
                            <th scope="col">NUMERO CELULAR</th>
                            <th scope="col">NUMERO DE WHATSAPP</th>
                        </tr>
                    </thead>
                    <tbody>

                        {productos.telefonos && Object.keys(productos.telefonos).length > 0 ? (
                            <tr key={productos.telefonos.id}>
                                <th scope="row">{productos.telefonos.numero_telefono}</th>
                                <td>{productos.telefonos.extension}</td>
                                <td>{productos.telefonos.numero_celular}</td>
                                <td>{productos.telefonos.numero_de_whatzap}</td>
                            </tr>
                        ) : null}
                    </tbody>



                    <tbody>
                        {cargando ? (
                            <p>Cargando productos...</p>
                        ) : error ? (
                            <tr>
                                <td colSpan="4">
                                    <h1>error</h1>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <th scope="row">SALDO:</th>
                                <td>Q {productos.pedido_encabezado ? productos.pedido_encabezado.total : 0}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div></div>


            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="cash"
                                checked={paymentMethod === "cash"}
                                onChange={handlePaymentMethodChange}
                            />
                            Con efectivo
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="pos"
                                checked={paymentMethod === "pos"}
                                onChange={handlePaymentMethodChange}
                            />
                            Con POS
                        </label>
                    </div>

                    <button type="button" class="btn btn-sm btn-outline-secondary" onClick={() => handleEditarClick()}>
                        PAGO CON TARJETA DE CREDITO
                    </button>
                </div>
                <button type="submit" class="btn btn-primary">REALIZAR PEDIDO</button>
            </form>

        </div>
    )
};

export default DetalleCompra;