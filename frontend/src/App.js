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
import Navbar from './components/navbar/Navbar';
import ParentComponent from './components/ParentComponent';
import MasterMain from './components/master/mainMaster';
import LoginForm from './components/login';
import ForgotPassword from './components/ForgotPassword';
import VerifyOTP from './components/VerifyOTP';
import ResendOTP from './components/resendOTP';
import ResetPassword from './components/resetPassword';
import Average from './components/average';
const App = () => {
  const [data, setData] = useState([]);
  const [excelData, setExcelData] = useState([]);

  const handleDataLoaded = (data) => {
    setExcelData(data);
  };
  return (
    <div>
      <Router>
        <Navbar title="Text2" about="About Info" />
        <Routes>
          {/* <Route path="/" element={<Shyam />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/resend-otp" element={<ResendOTP />}></Route>
          <Route path="/verify-otp" element={<VerifyOTP />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/average" element={<Average />} />
          <Route path="/home" element={<Dropdown />} />
          <Route path='/allocate-data' element={<MasterMain />} />

        </Routes>
      </Router>
      <Footer />

    </div>
  );
};

export default App;
