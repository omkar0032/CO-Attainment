import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from './pict.jpg'; // Make sure the path is correct
import 'bootstrap/dist/css/bootstrap.css';
export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#0096FF' ,borderRadius:'15px',marginTop:'35px',marginLeft:'35px',marginRight:'35px',fontWeight:'80px'}}>
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#">Navbar</a> */}
          <img src={logoImage} alt="Logo" style={{ marginRight: '25px',marginLeft:'15px', maxHeight: '55px',borderRadius:'50%' }} />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* Use img element instead of Link for the "Home" */}
                {/* <Link to="/">
                  <img src={logoImage} alt="Home" style={{ maxHeight: '30px' }} />
                </Link> */}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" style={{ textDecoration: 'none', color: 'white', marginRight: '15px', transition: 'background-color 0.3s', borderRadius: '5px' , ':hover': { backgroundColor: 'red'}}}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" style={{ textDecoration: 'none', color: 'white', marginRight: '15px', transition: 'background-color 0.3s', borderRadius: '5px' , ':hover': { backgroundColor: 'red' }}}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Login" style={{ textDecoration: 'none', color: 'white',marginLeft:'1050px' ,transition: 'background-color 0.3s', borderRadius: '5px', ':hover': { backgroundColor: 'red' } }}>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
