// App.js

import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import axios from 'axios';
// import ExcelImporter from '../backUp/ExcelImporter';
import Dropdown from './components/dropdown/Newdropdown';
import Footer from './components/footer/Footer';
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/navbar/Login';
import Navbar from './components/navbar/Navbar';
import Absent from './components/below_table';
import ParentComponent from './components/ParentComponent';
import Shyam from './components/master/shyam';
import LoginNikunj from './components/login';
const App = () => {
  const [data, setData] = useState([]);
  const [excelData, setExcelData] = useState([]);

  const handleDataLoaded = (data) => {
    setExcelData(data);
  };
  return (
    <div>
      <Router>
      <Navbar title="Text2" about="About Info"  />
          <Routes>
            {/* <Route path="/Login" element={<Login/>} /> */}
            <Route path="/" element={<Dropdown/>}/>
          </Routes>
      </Router>
      {/* <Dropdown/> */}
      <Footer/>
      
    </div>
  );
};

export default App;
