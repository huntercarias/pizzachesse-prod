import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    { producto: 'Producto A', ventas: 900 },
    { producto: 'Producto B', ventas: 200 },
    { producto: 'Producto C', ventas: 300 },
    { producto: 'Producto D', ventas: 400 },
    { producto: 'Producto E', ventas: 500 },
];

const Circulares = () => {
    return (
        <BarChart
            width={600}
            height={300}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="producto" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ventas" fill="#8884d8" />
        </BarChart>
    );
};

export default Circulares;