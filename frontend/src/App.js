// App.js

import React, { useState, useEffect } from "react";
import DataTable from "./components/DataTable";
import axios from "axios";
import Dropdown from "./components/dropdown/Newdropdown";
import Footer from "./components/footer/Footer";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ParentComponent from "./components/ParentComponent";
import MasterMain from "./components/master/mainMaster";
import LoginForm from "./components/login";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOTP from "./components/VerifyOTP";
import ResendOTP from "./components/resendOTP";
import ResetPassword from "./components/resetPassword";
import Average from "./components/average";
import EditPattern from "./components/editPattern";
import EditSubject from "./components/editSubjects";
import { UseData } from "./NewContext";
import UnauthorizedAlert from "./Alert";
import TeacherCredentials from "./components/master/teacherCredentials";
import TableWithInput from "./components/new_average";
import AddTargetsDropdown from "./components/dropdown/AddTargetsDropdown";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const { loggedInUserName, setLoggedInUserName } = UseData();
  const { valueForRole, setValueForRole } = UseData();
  useEffect(() => {
    const loggedInUserNameFromStorage = localStorage.getItem("Userdata");
    const loggedInUserNameFromStorage1 = JSON.parse(
      loggedInUserNameFromStorage
    );
    if (loggedInUserNameFromStorage) {
      setValueForRole(loggedInUserNameFromStorage1.role);
      setLoggedInUserName(loggedInUserNameFromStorage1.name);
    }
  }, []);
  const handleDataLoaded = (data) => {
    setExcelData(data);
  };

  const UnauthorizedAlert1 = () => {
    useEffect(() => {
      alert("You are not an authorized person!");
    }, []);

    return null;
  };

  const UnauthorizedAlert2 = () => {
    useEffect(() => {
      alert("You are not an authorized person!");
    }, []);

    return null;
  };
  return (
    <div>
      <Router>
        {!loggedInUserName ? (
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/verify-otp" element={<VerifyOTP />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
            <Route path="/resend-otp" element={<ResendOTP />}></Route>
          </Routes>
        ) : (
          <>
            <Navbar title="Text2" about="About Info" />
            <Routes>
              <Route path="/average" element={<AddTargetsDropdown />} />
              <Route path="/Home" element={<Dropdown />} />
              <Route path="/" element={<Dropdown />} />
              {valueForRole === "HOD" ? (
                <Route path="/allocate-data" element={<MasterMain />} />
              ) : (
                <Route path="/allocate-data" element={<UnauthorizedAlert />} />
              )}
              {valueForRole === "HOD" ? (
                <Route path="/edit-pattern" element={<EditPattern />} />
              ) : (
                <Route path="/edit-pattern" element={<UnauthorizedAlert1 />} />
              )}
              {valueForRole === "HOD" ? (
                <Route path="/edit-subject" element={<EditSubject />} />
              ) : (
                <Route path="/edit-subject" element={<UnauthorizedAlert2 />} />
              )}
              {valueForRole === "HOD" ? (
                <Route
                  path="/teacherCredentials"
                  element={<TeacherCredentials />}
                />
              ) : (
                <Route
                  path="/teacherCredentials"
                  element={<UnauthorizedAlert2 />}
                />
              )}
            </Routes>
            <Footer />
          </>
        )}
      </Router>
    </div>
  );
};
export default App;
