import { Link, NavLink } from 'react-router-dom';
import '../../App.css';

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

            <div>
                <Link className="navbar-brand" to="/">
                    Estetica BS
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
                        Informacion sobre nosotros
                    </NavLink>

                    <NavLink className="nav-item nav-link" to="/Contactanos">
                        Contactanos
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}