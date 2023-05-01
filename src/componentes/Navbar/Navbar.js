import { Link, NavLink } from 'react-router-dom';
import '../../App.css';
import image1 from '../../imagenes/logoPizzaCheese.jpg';

export const Navbar = () => {
    return (
        <nav class="text-light bg-dark" >
            <div class="row justify-content-between">

                <Link class="col-sm-4 col-md-3 col-lg-2" to="/">
                    <img src={image1} alt="Logo" class="rounded" width="80%" height="175" />
                </Link>

                <div class="col-sm-4 col-md-4 col-lg-10">
                    <div class="row justify-content-end">
                        <NavLink class="col-sm-12 col-md-6 col-lg-2 align-self-end" className="p-2" to="/Pizza">
                            <h3>Pizza</h3>
                        </NavLink>
                        <NavLink class="col-sm-12 col-md-6 col-lg-2 align-self-end" className="p-2" to="http://localhost:3000/Lazana">
                            <h3>Lazaña</h3>
                        </NavLink>
                        <NavLink class="col-sm-12 col-md-6 col-lg-2 align-self-end" className="p-2" to="http://localhost:3000/Calzone">
                            <h3>Calzone</h3>
                        </NavLink>
                        <NavLink class="col-sm-12 col-md-6 col-lg-2 align-self-end" className="p-2" to="http://localhost:3000/Combos">
                            <h3>Combos</h3>
                        </NavLink>
                        <NavLink class="col-sm-12 col-md-6 col-lg-2 align-self-end" className="p-2" to="http://localhost:3000/Bebidas">
                            <h3>Bebidas</h3>
                        </NavLink>
                        <NavLink class="col-sm-12  col-md-12 col-lg-2" className="p-2" to="http://localhost:3000/Login">
                            <form>
                                <button class="btn btn-outline-primary" type="submit"><h3>Login</h3></button>
                            </form>
                        </NavLink>
                    </div>
                </div>

            </div>
        </nav >
    );
}