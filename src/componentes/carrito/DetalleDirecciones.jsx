import axios from 'axios';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";


const DetalleDirecciones = () => {

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [productos, setProductos] = useState([]);
    const baseURLusuario = `${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/ConsultaDirecciones`;
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
            formData.append("id_direcciones", id);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/RealizaPedido`, formData, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                },
            });

            // window.location.reload();
            console.log(response.data.data);
            //alert("seleccion exitosa");

            navigate('/DetalleTelefono');
            //setCargando(false);
        } catch (error) {
            //setError('Ocurrió un error al eliminar el producto. Por favor, inténtalo de nuevo más tarde.');
            //setCargando(false);
            console.log(error);
            alert("error en seleccion intente mas tarde");
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
            <h1>Detalle Direcciones</h1>
            <button type="button" className="btn btn-sm btn-outline-secondary">
                <a href="http://localhost:3000/RegistroDireccionTelefono">REGISTRAR DIRECCIONES Y TELEFONOS</a>
            </button>
            <table className="table">
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

                                <th scope="row">{producto.nomenclatura}</th>
                                <td>{producto.zona}</td>
                                <td>{producto.ciudad}</td>
                                <td>{producto.departamento}</td>
                                <td>{producto.municipio}</td>
                                <td>{producto.lote}</td>
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