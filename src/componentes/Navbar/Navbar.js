import { Link, NavLink } from 'react-router-dom';
import '../../App.css';
import image1 from '../../imagenes/logoPizzaCheese.jpg';

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div>
                <Link className="navbar-brand" to="/">
                    <img src={image1} alt="Logo" className="logo" width="80%" height="150" />
                </Link>
            </div>

            <div className="d-flex flex-row-reverse bd-highlight">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/Productos">
                        Productos
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/Consejos">
                        Consejos
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/Informacion">
                        Información sobre nosotros
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/Contactanos">
                        Contáctanos
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}