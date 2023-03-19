import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">ExerTrack</Link>
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav navbar-nav-scroll">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">
                            Exercises
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/create">
                            Create Exercise Log
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/user">
                            Create User
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Navbar;