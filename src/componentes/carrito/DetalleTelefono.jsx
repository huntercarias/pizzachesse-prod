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





    return (
        <div>
            <h1>Detalle Telefono</h1>
            <button type="button" className="btn btn-sm btn-outline-secondary">
                <a href="http://localhost:3000/RegistroDireccionTelefono">REGISTRAR DIRECCIONES Y TELEFONOS</a>
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">NUMERO TELEFONO</th>
                        <th scope="col">EXTENSION</th>
                        <th scope="col">NUMERO CELULAR</th>
                        <th scope="col">NUMERO DE WHATZAP</th>

                    </tr>
                </thead>
                <tbody>

                    {cargando ? (
                        <p>Cargando productos...</p>
                    ) : error ? (
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                            <a href="http://localhost:3000/RegistroDireccionTelefono">REGISTRAR DIRECCIONES Y TELEFONOS</a>
                        </button>
                    ) : productos.length > 0 ? (
                        productos.map((producto) => (
                            <tr key={producto.id}>

                                <th scope="row">{producto.numero_telefono}</th>
                                <td>{producto.extension}</td>
                                <td>{producto.numero_celular}</td>
                                <td>{producto.numero_de_whatzap}</td>

                                <td>
                                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => SeleccionarDireccion(producto.id)}>
                                        SELECCIONAR
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                            <a href="http://localhost:3000/RegistroDireccionTelefono">REGISTRAR DIRECCIONES Y TELEFONOS</a>
                        </button>
                    )}
                </tbody>

            </table>
        </div>
    );
};

export default DetalleDirecciones;