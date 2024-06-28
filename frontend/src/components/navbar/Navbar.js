// import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import logoImage from "./pict.jpg"; // Make sure the path is correct
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";
import { UseData } from "../../NewContext";

export default function Navbar() {
  const navigate = useNavigate();
  // State variable to store the user's name
  const { loggedInUserName, setLoggedInUserName } = UseData();
  const { setValueForRole } = UseData();
  useEffect(() => {
    const loggedInUserNameFromStorage = localStorage.getItem("Userdata");
    const loggedInUserNameFromStorage1 = JSON.parse(
      loggedInUserNameFromStorage
    );
    if (loggedInUserNameFromStorage) {
      setLoggedInUserName(loggedInUserNameFromStorage1.name);
    }
    console.log(loggedInUserNameFromStorage)
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("Userdata");
    setLoggedInUserName(null);
    setValueForRole(null);
    navigate("/");
  };

  return (
<nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#0096FF', borderRadius: '15px', marginTop: '35px',  boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img src={logoImage} alt="Logo" style={{ maxHeight: '55px', borderRadius: '50%' }} />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/Home" style={{ textDecoration: 'none', color: 'white', marginRight: '15px' }}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/guidelines" style={{ textDecoration: 'none', color: 'white', marginRight: '15px' }}>
            Guidelines
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about" style={{ textDecoration: 'none', color: 'white', marginRight: '15px' }}>
            About Us
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ textDecoration: 'none', color: 'white', marginRight: '15px' }}>
            More
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="/average">Add Targets</Link></li>
            <li><Link className="dropdown-item" to="/allocate-data">Allocate Subjects</Link></li>
            <li><Link className="dropdown-item" to="/edit-pattern">Edit Pattern</Link></li>
            <li><Link className="dropdown-item" to="/edit-subject">Edit Subject</Link></li>
            <li><Link className="dropdown-item" to="/teacherCredentials">Teacher Credentials</Link></li>
          </ul>
        </li>
      </ul>
      {loggedInUserName ? (
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {loggedInUserName}
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ left: "-113px" }}>
              <li><button className="dropdown-item" style={{textAlign:"center"}}>Settings</button></li>
              <li><button className="dropdown-item" onClick={handleLogOut} style={{textAlign:"center"}}>Log Out</button></li>
            </ul>
          </li>
        </ul>
      ) : (
        <Button className="nav-link btn btn-light" style={{ borderRadius: '5px', padding: '6px', fontSize: '14px' }}>
          Need To Login
        </Button>
      )}
    </div>
  </div>
</nav>


  );
}
