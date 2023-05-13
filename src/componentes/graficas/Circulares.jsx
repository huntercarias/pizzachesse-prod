import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Circulares = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const baseURLusuario = 'http://localhost/pizzachesse-prod/appBackend/public/api/auth/ReporteTiposProductos';
    const miToken = localStorage.getItem('miToken');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCargando(true);
                const response = await axios.post(baseURLusuario, null, {
                    headers: {
                        Authorization: `Bearer ${miToken}`,
                    },
                });
                setProductos(response.data.data);
                setCargando(false);
            } catch (error) {
                setError(error.message);
                setCargando(false);
            }
        };
        fetchData();
    }, []);

    if (cargando) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Ha ocurrido un error: {error}</div>;
    }

    return (


        <div>
            <h1>VENTAS POR TIPO DE PRODUCTO</h1>
            <BarChart
                width={600}
                height={500}
                data={productos}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="PRODUCTOS" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default Circulares;