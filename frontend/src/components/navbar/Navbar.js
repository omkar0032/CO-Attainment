// import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import logoImage from './pict.jpg'; // Make sure the path is correct
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';
import { UseData } from '../../NewContext';

export default function Navbar() {
  const navigate = useNavigate();
  // State variable to store the user's name
  const {loggedInUserName, setLoggedInUserName}=UseData();
  const {setValueForRole}=UseData();
  useEffect(() => {
    const loggedInUserNameFromStorage = localStorage.getItem('Userdata');
    const loggedInUserNameFromStorage1=JSON.parse(loggedInUserNameFromStorage)
    if (loggedInUserNameFromStorage) {
      setLoggedInUserName(loggedInUserNameFromStorage1.name);
    }
  }, []);


  const handleLogOut=()=>{
    localStorage.removeItem('Userdata');
    setLoggedInUserName(null);
    setValueForRole(null);
    navigate('/');
  }

  
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
              <Link className="nav-link" to="/Home" style={{ textDecoration: 'none', color: 'white', marginRight: '15px', borderRadius: '5px', transition: 'background-color 0.3s' }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{ textDecoration: 'none', color: 'white', marginRight: '15px', borderRadius: '5px', transition: 'background-color 0.3s' }}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/guidelines" style={{ textDecoration: 'none', color: 'white', marginRight: '15px', borderRadius: '5px', transition: 'background-color 0.3s' }}>
                Guidelines
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" style={{ textDecoration: 'none', color: 'white', marginRight: '15px', borderRadius: '5px', transition: 'background-color 0.3s' }}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/average" style={{ textDecoration: 'none', color: 'white', marginRight: '15px', borderRadius: '5px', transition: 'background-color 0.3s' }}>
                Add Previous
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/allocate-data" style={{ textDecoration: 'none', color: 'white', marginRight: '15px', borderRadius: '5px', transition: 'background-color 0.3s' }}>
                Allocate Data
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/edit-pattern" style={{ textDecoration: 'none', color: 'white', marginRight: '15px', borderRadius: '5px', transition: 'background-color 0.3s' }}>
                Edit Pattern
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/edit-subject" style={{ textDecoration: 'none', color: 'white', marginRight: '15px', borderRadius: '5px', transition: 'background-color 0.3s' }}>
                Edit Subject
              </Link>
            </li>
          </ul>
          {loggedInUserName ? (
            <div className="nav-item">
              <Button className="nav-link" style={{ color: 'white', marginRight: '10px ', borderRadius: '5px', transition: 'background-color 0.3s', border: '1px dotted black', padding: '6px', margin: '0   0  0 650px' }}>
                Welcome, {loggedInUserName}!
              </Button>
              <Button onClick={handleLogOut}  className="nav-link" style={{ color: 'white', marginRight: '10px ', borderRadius: '5px', transition: 'background-color 0.3s', border: '1px dotted black', padding: '6px', margin: '0   0  0 650px' }}>
               LogOut{!loggedInUserName ? navigate('/') :''};
              </Button>
            </div>     
          ) : <div className="nav-item">
            <Button className="nav-link" style={{ color: 'white', marginRight: '10px ', borderRadius: '5px', transition: 'background-color 0.3s', border: '1px dotted black', padding: '6px', margin: '0   0  0 650px' }}>
             Need To Login
            </Button>
        </div>
          }
        </div>
      </div>
    </nav>
  );
}
