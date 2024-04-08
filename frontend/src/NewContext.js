import { createContext, useContext, useState } from 'react';

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
    // const [valueforacadamicyearlabel,setValueForAcademicYearlabel]=useState();

    //sending email fron forgotpass to verifyotp
    const [email, setEmail] = useState('');

    //sending name in navbar login to navbar
    const [name, setName] = useState();

    // check logged in ore not
    const [loggedInUserName, setLoggedInUserName] = useState('');
    const [valueForRole, setValueForRole] = useState('');

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
            email, setEmail,
            name, setName,
            loggedInUserName, setLoggedInUserName,
            valueForRole, setValueForRole,

        }}>
            {children}
        </Context.Provider>
    )
}

export const UseData = () => {
    return useContext(Context);
}

export default ContextProvider
