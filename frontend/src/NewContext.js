import { createContext, useContext, useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const Context = createContext();

export const ContextProvider = ({ children }) => {

    // this hook to save selected test value (because we can not pass object hook. you may use arry of hook)  
    const [valuefortest1, setValuefortest1] = useState();

    // this hook to be set in level.js and used in below_table.js
    const [countLevelOneUT, setCountLevelOneUT] = useState(82);
    const [countLevelOneUA, setCountLevelOneUA] = useState(97);
    const [countLevelTwoUT, setCountLevelTwoUT] = useState(69);
    const [countLevelTwoUA, setCountLevelTwoUA] = useState(83);

    const [countLevelThreeUT, setCountLevelThreeUT] = useState(61);
    const [countLevelThreeUA, setCountLevelThreeUA] = useState(76);


    // this hook to store toggle button of show result
    const [resultState, setResultState] = useState(false);


    const [valueforacadamicyearlabel, setValueForAcademicYearlabel] = useState();
    const [valuefordepartmentlabel, setvaluefordepartmentlabel] = useState();
    const [valueforyearlabel, setvalueforyearlabel] = useState();
    const [valueforsubjectlabel, setvalueforsubjectlabel] = useState();
    const [valueforsemlabel, setvalueforsemlabel] = useState();
    const [valuefordivisionlabel,setValuefordivisionlabel]=useState();
    const [data, setData] = useState([]);

    //sending email fron forgotpass to verifyotp
    const [email, setEmail] = useState('');

    //sending name in navbar login to navbar
    const [name, setName] = useState();

    // check logged in ore not
    const [loggedInUserName, setLoggedInUserName] = useState('');
    const [valueForRole, setValueForRole] = useState('');

    const [showbtn, setShowbtn] = useState(false);
    const createTable = async (tableName) => {
        console.log("context"); 
        try {
          setShowbtn(true);
          console.log("valuetest1", valuefortest1);
          console.log("valueacadamicyear", valueforacadamicyearlabel);
          const response = await axios.get(
            `http://localhost:3000/createTable/${tableName}/${valueforyearlabel}/${valuefordepartmentlabel}/${valuefordivisionlabel}`
          );
          console.log(response);
          if (response.data.length === 0) {
            // Display toast notification for empty table
            toast.warn("Table is empty. Upload to the database.");
          } else if (response.status === 200) {
            if (response.data === "Table created successfully.") {
              // Table created successfully, show success notification
              toast.success("Table Created Successfully. Enter Data.");
            } else {
              // Table data fetched successfully, show success notification
              toast.success("Data Fetched Successfully.");
              // Handle table data if needed
              if (response.data.length === 0) {
                // Display toast notification for empty table
                toast.warning("Table is empty. Upload to the database.");
              } else {
                const updatedData = response.data.map((row) => {
                  const totalUT1 = (row["UT1-Q1"] !== null && row["UT1-Q2"] !== null) ? row["UT1-Q1"] + row["UT1-Q2"] : null;
                  const totalUT2 = (row["UT2-Q1"] !== null && row["UT2-Q2"] !== null) ? row["UT2-Q1"] + row["UT2-Q2"] : null;
                  const totalUT3 = (row["UT3-Q1"] !== null && row["UT3-Q2"] !== null) ? row["UT3-Q1"] + row["UT3-Q2"] : null;
                  return {
                    ...row,
                    ["Total-UT1"]: totalUT1,
                    ["Total-UT2"]: totalUT2,
                    ["Total-UT3"]: totalUT3,
                  };
                });
            
                setData(updatedData);
                console.log(updatedData)
                // console.log(data)
              }
            }
          } else {
            // Unexpected response, handle it
            console.error("Unexpected response:", response);
            // Handle unexpected response if needed
          }
        } catch (error) {
          console.error("Error creating table:", error);
          // Handle error if needed
        }
      };
    
    
    return (
        <Context.Provider value={{
            valuefortest1, setValuefortest1,
            countLevelOneUT, setCountLevelOneUT,
            countLevelOneUA, setCountLevelOneUA,
            countLevelTwoUT, setCountLevelTwoUT,
            countLevelTwoUA, setCountLevelTwoUA,
            countLevelThreeUT, setCountLevelThreeUT,
            countLevelThreeUA, setCountLevelThreeUA,
            resultState, setResultState,
            valueforacadamicyearlabel, setValueForAcademicYearlabel,
            valuefordepartmentlabel, setvaluefordepartmentlabel,
            valueforyearlabel, setvalueforyearlabel,
            valueforsubjectlabel, setvalueforsubjectlabel,
            valueforsemlabel, setvalueforsemlabel,
            valuefordivisionlabel,setValuefordivisionlabel,
            data, setData,
            email, setEmail,
            name, setName,
            loggedInUserName, setLoggedInUserName,
            valueForRole, setValueForRole,
            createTable,
        }}>
            {children}
        </Context.Provider>
    )
}

export const UseData = () => {
    return useContext(Context);
}

export default ContextProvider
