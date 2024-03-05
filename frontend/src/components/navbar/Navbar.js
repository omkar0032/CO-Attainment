// import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from './pict.jpg'; // Make sure the path is correct
import 'bootstrap/dist/css/bootstrap.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#0096FF', borderRadius: '15px', marginTop: '35px', marginLeft: '35px', marginRight: '35px' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logoImage} alt="Logo" style={{ maxHeight: '55px', borderRadius: '50%' }} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ textDecoration: 'none', color: 'white', marginRight: '15px', borderRadius: '5px', transition: 'background-color 0.3s' }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{ textDecoration: 'none', color: 'white', marginRight: '15px', borderRadius: '5px', transition: 'background-color 0.3s' }}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" style={{ textDecoration: 'none', color: 'white', borderRadius: '5px', transition: 'background-color 0.3s' }}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
