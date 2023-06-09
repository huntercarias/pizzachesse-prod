import axios from 'axios';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";


const DetalleDirecciones = () => {

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [productos, setProductos] = useState([]);
    const baseURLusuario = `${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/ConsultaTelefonos`;
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
            //console.log(response.data.data);
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




    async function SeleccionarDireccion(id) {
        try {
            const formData = new FormData();
            formData.append("status_pedido", "CREACION PEDIDO");
            formData.append("id_telefonos", id);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/RealizaPedido`, formData, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                },
            });

            // window.location.reload();
            console.log(response.data.data);
            //setCargando(false);
            //alert("seleccion exitosa");
            navigate('/DetalleCompra');
        } catch (error) {
            //setError('Ocurrió un error al eliminar el producto. Por favor, inténtalo de nuevo más tarde.');
            //setCargando(false);
            console.log(error);
            alert("error en la seleccion, intente de nuevo");
        }
    }

    const [cargandoA, setCargandoA] = useState(true);
    const [errorA, setErrorA] = useState(null);
    const [SaldoCarrito, setSaldoCarrito] = useState([]);

    const baseURLsaldo = `${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/ConsultaCarritoCompras`;

    const consulta_Saldo = async () => {
        try {
            const responseA = await axios.post(baseURLsaldo, {
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

    async function enviaruta(ruta) {
        navigate(ruta);
    };



    return (
        <div>
            <h1>Detalle Telefono</h1>

            <button class="btn btn-primary btn-block" onClick={() => enviaruta("/RegistroDireccionTelefono")}>REGISTRAR DIRECCIONES Y TELEFONOS</button>
            <div class="bd-example-snippet bd-code-snippet"><div class="bd-example">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">NUMERO TELEFONO</th>
                            <th scope="col">EXTENSION</th>
                            <th scope="col">NUMERO CELULAR</th>
                            <th scope="col">NUMERO  WHATSAPP</th>
                        </tr>
                    </thead>
                    <tbody>


                        {cargando ? (
                            <p>Cargando productos...</p>
                        ) : error ? (
                            <button class="btn btn-primary btn-block" onClick={() => enviaruta("/RegistroDireccionTelefono")}>REGISTRAR DIRECCIONES Y TELEFONOS</button>
                        ) : productos.length > 0 ? (
                            productos.map((producto) => (

                                <tr key={producto.id} class="table-warning" onClick={() => SeleccionarDireccion(producto.id)}>
                                    <th scope="row">{producto.numero_telefono}</th>
                                    <td>{producto.extension}</td>
                                    <td>{producto.numero_celular}</td>
                                    <td>{producto.numero_de_whatzap}</td>
                                </tr>
                            ))
                        ) : (
                            <button class="btn btn-primary btn-block" onClick={() => enviaruta("/RegistroDireccionTelefono")}>REGISTRAR DIRECCIONES Y TELEFONOS</button>
                        )}
                    </tbody>
                </table>
            </div></div>
        </div>

    );
};

export default DetalleDirecciones;