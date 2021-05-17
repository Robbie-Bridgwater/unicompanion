import { Link } from "react-router-dom";
import React, { useState } from 'react';
import "./style.css";

function Navbar() {
    
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (

        <nav className="navbar navbar-expand-md theme-color navbar-dark">

            <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link
                            to="/"
                            className={window.location.pathname === "/" || window.location.pathname === "/home" ? "nav-link active" : "nav-link"}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/calendar"
                            className={window.location.pathname === "/" || window.location.pathname === "/calendar" ? "nav-link active" : "nav-link"}
                        >
                            Calendar
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/sportsAndSocieties"
                            className={window.location.pathname === "/" || window.location.pathname === "/sportsAndSocieties" ? "nav-link active" : "nav-link"}
                        >
                            Sports and Societies 
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/Account"
                            className={window.location.pathname === "/" || window.location.pathname === "/Account" ? "nav-link active" : "nav-link"}
                        >
                            Account
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/About"
                            className={window.location.pathname === "/" || window.location.pathname === "/About" ? "nav-link active" : "nav-link"}
                        >
                            About Us 
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>

    );
}
export default Navbar;