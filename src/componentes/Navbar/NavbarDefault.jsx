import { NavLink } from 'react-router-dom';

export const NavbarDefault = () => {
    //`${process.env.REACT_APP_API_URL}/Login`

    return (
        <div class="col-sm-7 col-md-5 col-lg-2">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <h1>MENU</h1>
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Pizza"> <h3>PIZZA</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Lazana"><h3>LAZAÑA</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Calzone"><h3>CALZONE</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Combos"><h3>COMBOS</h3></NavLink>
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Bebidas"><h3>BEBIDAS</h3></NavLink>
                    </a></li>

                    <li><a class="dropdown-item" href="#">
                        <NavLink className="nav-link" to="/Login">
                            <form>
                                <button class="btn btn-outline-primary" type="submit"><h3>Login</h3></button>
                            </form>
                        </NavLink>
                    </a></li>
                </ul>

            </div >
        </div>

    );
}