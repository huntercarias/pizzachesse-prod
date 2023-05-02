import React from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import Inicio from '../componentes/inicio/Inicio';
import Pizza from '../componentes/productos/Pizza';
import Lazana from '../componentes/productos/Lazana';
import Calzone from '../componentes/productos/Calzone';
import Combos from '../componentes/productos/Combos';
import Bebidas from '../componentes/productos/Bebidas';
import Login from '../componentes/aut/Login';
import Registro from '../componentes/aut/Registro';
import { Navbar } from '../componentes/Navbar/Navbar';

export const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Inicio />} />
                <Route exact path='/Pizza' element={<Pizza />} />
                <Route exact path='/Lazana' element={<Lazana />} />
                <Route exact path='/Calzone' element={<Calzone />} />
                <Route exact path='/Combos' element={<Combos />} />
                <Route exact path='/Bebidas' element={<Bebidas />} />
                <Route exact path='/Login' element={<Login />} />
                <Route exact path='/Registro' element={<Registro />} />
            </Routes>
        </Router>
    )
}
