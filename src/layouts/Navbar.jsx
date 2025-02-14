import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const routes = [
        { path: '/', name: 'Home' },
        { path: '/products', name: 'Products' },
        { path: '/carts', name: 'Carts' },
        { path: '/login', name: 'Admin' },
    ];

    return (
        <nav className="sticky-md-top navbar_style">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <FontAwesomeIcon icon="utensils" />
                        <span className="ms-2 logo">The Food Heaven</span>
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse justify-content-end"
                        id="navbarNav"
                    >
                        <ul className="navbar-nav">
                            {routes.map(route => {
                                return (
                                    <li className="nav-item" key={route.name}>
                                        <NavLink
                                            className="nav-link"
                                            aria-current="page"
                                            to={route.path}
                                        >
                                            {route.name}
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        </nav>
    );
};

export default Navbar;
