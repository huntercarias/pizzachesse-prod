import React from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Inicio from '../componentes/inicio/Inicio';
import Lazana from '../componentes/productos/Lazana';
import Calzone from '../componentes/productos/Calzone';
import Combos from '../componentes/productos/Combos';
import Bebidas from '../componentes/productos/Bebidas';
import Pizza from '../componentes/productos/Pizza';
import Pizzac from '../componentes/productos/Pizzac';
import Lazanac from '../componentes/productos/Lazanac';
import Calzonec from '../componentes/productos/Calzonec';
import Combosc from '../componentes/productos/Combosc';
import Bebidasc from '../componentes/productos/Bebidasc';
import RegistroAdmin from '../componentes/aut/RegistroAdmin';
import ProductosCarritoCompras from '../componentes/carrito/ProductosCarritoCompra';
import DetalleDireccionTelefono from '../componentes/carrito/DetalleDirecciones';
import RegistroDireccionTelefono from '../componentes/carrito/RegistroDireccionTelefono';
import DetalleTelefono from '../componentes/carrito/DetalleTelefono';
import DetalleCompra from '../componentes/carrito/DetalleCompra';
import Pedidos from '../componentes/pedidos/Pedidos';

import DetalleProducto from '../componentes/productos/DetalleProducto';

import Login from '../componentes/aut/Login';
import Registro from '../componentes/aut/Registro';
import { Navbar } from '../componentes/Navbar/Navbar';
import UpdatePizza from '../componentes/productos/UpdatePizza';
import Circulares from '../componentes/graficas/Circulares';
import Graficas from '../componentes/graficas/Graficas';
import AddPizza from '../componentes/productos/AddPizza';


const productoPizza = 1;
const productoLazana = 2;
const productoCalzone = 3;
const productoCombos = 4;
const productoBebidas = 5;

export const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Inicio />} />
                <Route exact path='/Login' element={<Login />} />



                <Route exact path='/Pizza' element={<Pizza variable={productoPizza} />} />
                <Route exact path='/Lazana' element={<Lazana variable={productoLazana} />} />
                <Route exact path='/Calzone' element={<Calzone variable={productoCalzone} />} />
                <Route exact path='/Combos' element={<Combos variable={productoCombos} />} />
                <Route exact path='/Bebidas' element={<Bebidas variable={productoBebidas} />} />


                <Route exact path='/Pizzac' element={<Pizzac variable={productoPizza} />} />
                <Route exact path='/Lazanac' element={<Lazanac variable={productoLazana} />} />
                <Route exact path='/Calzonec' element={<Calzonec variable={productoCalzone} />} />
                <Route exact path='/Combosc' element={<Combosc variable={productoCombos} />} />
                <Route exact path='/Bebidasc' element={<Bebidasc variable={productoBebidas} />} />
                <Route exact path='/DetalleProducto/:id' element={<DetalleProducto />} />
                <Route exact path='/RegistroAdmin/:id' element={<RegistroAdmin />} />
                <Route exact path='/PedidosRealizadosUsuarios' element={<Pedidos />} />

                <Route exact path='/DetalleCompra' element={<DetalleCompra />} />
                <Route exact path='/ProductosCarritoCompra' element={<ProductosCarritoCompras />} />
                <Route exact path='/Registro' element={<Registro />} />
                <Route exact path='/UpdatePizza/:id' element={<UpdatePizza />} />
                <Route exact path='/Circulares' element={<Circulares />} />
                <Route exact path='/Graficas' element={<Graficas />} />
                <Route exact path='/AddProducto' element={<AddPizza />} />
                <Route exact path='/DetalleDireccionTelefono' element={<DetalleDireccionTelefono />} />
                <Route exact path='/RegistroDireccionTelefono' element={<RegistroDireccionTelefono />} />
                <Route exact path='/DetalleTelefono' element={<DetalleTelefono />} />
            </Routes>
        </Router>
    )
}


