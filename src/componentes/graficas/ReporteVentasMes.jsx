import axios from 'axios';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";


const ReporteVentasMes = () => {

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [productos, setProductos] = useState([]);

    const baseURLusuario = `${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/ReporteTiposProductos`;
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



    const [cargandoA, setCargandoA] = useState(true);
    const [errorA, setErrorA] = useState(null);
    const [productosA, setProductosA] = useState([]);
    const baseURLusuarioA = `${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/MostrarResultadosProductoMensual`;
    //const baseURLusuario = `http://${process.env.REACT_APP_API_URL}/pizzachesse-prod/appBackend/public/api/auth/ShowDetalleCarrito`;
    // consulta token almacenado en la localstorage
    const [usuarioA, setUsuarioA] = useState([]);
    const consulta_usuarioSS = async () => {
        try {
            const response = await axios.post(baseURLusuarioA, null, {
                headers: {
                    Authorization: `Bearer ${miToken}`,
                },
            });
            //setUsuario(response.data);
            setProductosA(response.data.data);
            //console.log(response.data.data);
            setCargandoA(false);
            //valida_existe_carrito(usuario.id);
        } catch (error) {
            setUsuarioA(error);
            setCargandoA(false);
            //navigate('/Login');
        }
    };



    useEffect(() => {
        consulta_usuario();
        consulta_usuarioSS();
        //  consulta_Saldo();
    }, []);


    const descargarPDF = () => {
        axios({
            url: `${process.env.REACT_APP_API_URL}/appBackend/public/api/auth/MostrarResultadosProductoMensualPDF`,
            method: 'POST',
            responseType: 'blob', // Especifica el tipo de respuesta como blob (binary large object)
            headers: {
                Authorization: `Bearer ${miToken}`,
            },
        })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'resultados_producto_mensual.pdf'); // Nombre de archivo deseado para la descarga
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error al descargar el PDF:', error);
            });
    };




    return (
        <div>
            <h1>REPORTE MENSUAL</h1>


            <h1>REPORTE POR TIPO DE PRODUCTO</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID TIPO PRODUCTO</th>
                        <th scope="col">DESCRIPCION GRUPO</th>
                        <th scope="col">TOTAL POR TIPO DE PRODUCTO</th>

                    </tr>
                </thead>
                <tbody>

                    {cargando ? (
                        <p>Cargando productos...</p>
                    ) : error ? (
                        <p>Error carga...</p>
                    ) : productos.length > 0 ? (
                        productos.map((producto) => (
                            <tr key={producto.id_tiposproducto}>

                                <th scope="row">{producto.id_tiposproducto}</th>
                                <th scope="row">{producto.id_tiposproducto === 1 ? 'PIZZAS' : producto.id_tiposproducto === 2 ? 'LAZAÑA' : producto.id_tiposproducto === 3 ? 'CALZONE' : producto.id_tiposproducto === 4 ? 'COMBOS' : 'BEBIDAS'}</th>
                                <td>{producto.total_por_tipo}</td>


                            </tr>
                        ))
                    ) : (
                        <p>Error carga...</p>
                    )}
                </tbody>

            </table>

            <h1>REPORTE POR PRODUCTO</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID TIPO PRODUCTO</th>
                        <th scope="col">DESCRIPCION GRUPO</th>
                        <th scope="col">TOTAL POR TIPO DE PRODUCTO</th>

                    </tr>
                </thead>
                <tbody>

                    {cargandoA ? (
                        <p>Cargando productos...</p>
                    ) : errorA ? (
                        <p>Error carga...</p>
                    ) : productosA.length > 0 ? (
                        productosA.map((productoA) => (
                            <tr key={productoA.id}>

                                <th scope="row">{productoA.id}</th>
                                <th scope="row">{productoA.descripcion}</th>
                                <td>{productoA.total_por_producto}</td>


                            </tr>
                        ))
                    ) : (
                        <p>Error carga...</p>
                    )}
                </tbody>

            </table>

            <button onClick={descargarPDF}>GENERA REPORTE EN PDF</button>
        </div>
    );
};

export default ReporteVentasMes;