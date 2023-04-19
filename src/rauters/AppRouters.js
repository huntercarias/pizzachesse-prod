import React from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import Inicio from '../componentes/inicio/Inicio';
import Productos from '../componentes/productos/Produtos';
import { Navbar } from '../componentes/Navbar/Navbar';

export const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Inicio />} />
                <Route exact path='/productos' element={<Productos />} />
            </Routes>
        </Router>
    )
}
