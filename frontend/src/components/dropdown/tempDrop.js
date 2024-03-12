import React, { useContext, useState } from "react";
import Select from 'react-select';

import {ContextProvider,UseData} from "../../NewContext";
import './Dropdown.css';
function Dropdown() {
    
    // to select pattern
    const [valueforpattern, setValueforpattern] = useState(0);

    //to select year.
    const [valueforyear, setValueforyear] = useState();

    // for department
    const [valuefordepartment,setValuedepartment]=useState();
    // for departmentArray
    const [valuefordepartmentArray,setValuedepartmentArray]=useState([]);


    // useState for All divisions initial state is object
    const [valuefordivisionArray, setValuefordivisionArray] = useState([]);
    // this to use usestate for addition for subject selection
    const[valuefordivision,setValuefordivision]=useState();

    // to select semester and initialsing it by array
    const[valueforsemArray,setValueforsemArray]=useState([]);
    // this useState for addition to find subject
    const[valueforsem,setValueforsem]=useState("");

    // useState for Subject contaning initial value as object. 
    const[valueforsubjectArray,setValueforsubjectArray]=useState([]);
    // to is actual setValue for subject selection
    const[valueforsubject,setValueforsubject]=useState();

    // // this hook for test selection like ut 1 ut2
    const[valuefortest,setValuefortest]=useState();
    const {valuefortest1,setValuefortest1} = UseData();

    // passed in option={patternname}
    const patternname = [
        { value: "p2015", label: "2015 pattern" },
        { value: "p2019", label: "2019 pattern" }, // Corrected value
        { value: "p2024", label: "2024 pattern" },
    ];
   
   // passed in option={yearname}
    const yearname = [
        { value: "y1_q", label: "FE" },
        { value: "y2_d", label: "SE" },
        { value: "y3_d", label: "TE" },
        { value: "y4_d", label: "BE" },
    ]

    const q = [
        { value: "fe", label: "FE" },
       
    ]

    const d=[
        { value: "cs", label: "CS" },
        { value: "entc", label: "ENTC" },
        { value: "it", label: "IT" },
    ]
    // array for department
    const departmentname={q,d};

    
    // it for cs
    const cs=[
        { value: "cs1", label: "1" },
        { value: "cs2", label: "2" },
        { value: "cs3", label: "3" },
        { value: "cs4", label: "4" },
    ]

    // it for entc
    const entc=[
       
        { value: "entc5", label: "5" },
        { value: "entc6", label: "6" },
        { value: "entc7", label: "7" },
        { value: "entc8", label: "8" },
        
    ]

    // it for IT
    const it=[
        { value: "it9", label: "9" },
        { value: "it10", label: "10" },
        { value: "it11", label: "11" },
    ]

    // object of array for division
    const divisionname={cs,entc,it};

    // One of these Array of objects is passed when user hits YEAR section because sem depends on YEAR
    const fe=[
        {value:"sem1",label:"Sem_1"},
        {value:"sem2",label:"Sem_2"},  
    ]

    const se=[
        {value:"sem3",label:"Sem_3"},
        {value:"sem4",label:"Sem_4"},
       
    ]

    const te=[
        {value:"sem5",label:"Sem_5"},
        {value:"sem6",label:"Sem_6"},
       
    ]

    const be=[
        {value:"sem7",label:"Sem_7"},
        {value:"sem8",label:"Sem_8"},
       
    ]
    // this Object of Above Array.
    const semname={fe,se,te,be};


   
    // Values of Subject
    // For first year sem1
    const p2019y1type1sem1=[
        {value:"PHYSICS",label:"PHYSICS"},
        {value:"EM-1",label:"EM-1"},
        {value:"SME",label:"SME"},
        {value:"BEE",label:"BEE"},
        {value:"EM",label:"EM"}, 
        
        
    ];

    const  p2019y1type2sem1=[
        {value:"CHEMISTRY",label:"CHEMISTRY"},
        {value:"EM-1",label:"EM-1"},
        {value:"SME",label:"SME"},
        {value:"BXE",label:"BXE"},
        {value:"PPS",label:"PPS"},
    ];
    
    // for fe sem2
    const p2019y1type1sem2=[
        {value:"CHEMISTRY",label:"CHEMISTRY"},
        {value:"EM-2",label:"EM-2"},
        {value:"BXE",label:"BXE"},
        {value:"PPS",label:"PPS"},
        {value:"GRAPHICS",label:"GRAPHICS"},  
    ];
    
    const  p2019y1type2sem2=[
        {value:"PHYSICS",label:"PHYSICS"},
        {value:"EM-2",label:"EM-2"},
        {value:"GRAPHICS",label:"GRAPHICS"},
        {value:"BEE",label:"BEE"},
        {value:"EM",label:"EM"},
        
    ];

    // subject for CS
    // for se CS sem3
    const p2019y2_dcssem3=[
        {value:"DM",label:"DM"},
        {value:"FDS",label:"FDS"},
        {value:"CG",label:"CG"},
        {value:"OOP",label:"OOP"},
        {value:"DELD",label:"DELD"},
    ];
    // for se CS sem4
    const p2019y2_dcssem4=[
        {value:"EM-3",label:"EM-3"},
        {value:"DSA",label:"DSA"},
        {value:"SE",label:"SE"},
        {value:"MP",label:"MP"},
        {value:"PPL",label:"PPL"},
    ];
    // for te cs sem5
    const p2019y3_dcssem5=[
        {value:"TOC",label:"TOC"},
        {value:"DBMS",label:"DBMS"},
        {value:"OS",label:"OS"},
        {value:"CNS",label:"CNS"},
        {value:"ITES",label:"ITES"},
        {value:"HCI",label:"HCI"},
        {value:"DS",label:"DS"},
        {value:"SPM",label:"SPM"}
    ];
    // for te cs sem6
    const p2019y3_dcssem6=[
        {value:"WT",label:"WT"},
        {value:"IS",label:"IS"},
        {value:"DSBDA",label:"DSBDA"},
        {value:"AAVR",label:"AAVR"},
        {value:"AI",label:"AI"},
        {value:"CC",label:"CC"},
        {value:"SMAA",label:"SMAA"}
    ]
    // for be cs sem7
    const p2019y4_dcssem7=[
        {value:"DAA",label:"DAA"},
        {value:"ML",label:"ML"},
        {value:"BCT",label:"BCT"},
        {value:"E3",label:"E3"},
        {value:"E4",label:"E4"}
    ]

    // for be cs sem8
    const p2019y4_dcssem8=[
        {value:"HPC",label:"HPC"},
        {value:"DL",label:"DL"},
        {value:"E5",label:"E5"},
        {value:"E6",label:"E6"}
    ]


    // subject for ENTC
    // for se ENTC sem3
    const p2019y2_dentcsem3 = [
        { value: "EM3", label: "EM3 " },
        { value: "EC", label: "EC" },
        { value: "DC", label: "DC " },
        { value: "EC", label: "EC " },
        { value: "DSA", label: "DSA " },
    ];
    
    const p2019y2_dentcsem4 = [
        { value: "SS", label: "SS " },
        { value: "CS", label: "CS " },
        { value: "PCS", label: "PCS " },
        { value: "OOP", label: "OOP " },
        { value: "ESD", label: "ESD " },
    ];
    
    const p2019y3_dentcsem5= [
        { value: "DC", label: "DC" },
        { value: "EFT", label: "EFT " },
        { value: "DBM", label: "DBM " },
        { value: "MC", label: "MC" },
        { value: "EI", label: "Elective-I" },
    ];
    
    const p2019y3_dentcsem6 = [
        { value: "CN", label: "CN" },
        { value: "PM", label: "PM" },
        { value: "PDC", label: "PDC" },
        { value: "EI", label: "Elective-II" }
    ]

    const p2019y4_dentcsem7= [
        { value: "RMT", label: "RMT " },
        { value: "VLSI", label: "VLSI " },
        { value: "CC", label: "CC" },
        { value: "EI3", label: "Elective- 3" },
        { value: "EI4", label: "Elective- 4" },
    ];
    
    const p2019y4_dentcsem8 = [
        { value: "FOC", label: "FOC " },
        { value: "EI5", label: "Elective - 5" },
        { value: "EI6", label: "Elective - 6" },
    ];

    // subject for IT
    // for se it sem3
    const p2019y2_ditsem3=[
        {value:"DM",label:"DM"},
        {value:"LDCO",label:"LDCO"},
        {value:"DSA",label:"DSA"},
        {value:"OOP",label:"OOP"},
        {value:"BCN",label:"BCN"},
    ];
    // for se it sem4
    const p2019y2_ditsem4=[
        {value:"DMS",label:"DMS"},
        {value:"CG",label:"CG"},
        {value:"PA",label:"PA"},
        {value:"SE",label:"SE"},
        {value:"EM-3",label:"EM-3"},
    ];
    // for te it sem5
    const p2019y3_ditsem5=[
        {value:"TOC",label:"TOC"},
        {value:"OS",label:"OS"},
        {value:"ML",label:"ML"},
        {value:"HCI",label:"HCI"},
        {value:"DAA",label:"DAA"},
        {value:"ADBMS",label:"ADBMS"},
    ];
    // for te it sem6
    const p2019y3_ditsem6=[
        {value:"CN",label:"CN"},
        {value:"WAD",label:"WAD"},
        {value:"DSBDA",label:"DSBDA"},
        {value:"CC",label:"CC"},
        {value:"AI",label:"AI"},
    ]
    // for be it sem7
    const p2019y4_ditsem7=[
        {value:"DS",label:"DS"},
        {value:"SC",label:"SC"},
        {value:"BCT",label:"BCT"},
        {value:"S7E",label:"S&E"},
    ]

    // for be it sem8
    const p2019y4_ditsem8=[
        {value:"DS",label:"DS"},
        {value:"SC",label:"SC"},
        {value:"BCT",label:"BCT"},
        {value:"S7E",label:"S&E"},     
    ]

    
//    this Array for test pattern 
   const testname=[
    {value:"t1",label:"UT-1"},
    {value:"t2",label:"UT-2"},
    {value:"t3",label:"UT-3"},
    {value:"t4",label:"UA"},
]

// this hook for test selection like ut 1 ut2
const  handleOnChange =(selectedOption)=>{
    setValuefortest(selectedOption);
    setValuefortest1(selectedOption.label);
    // console.log(valuefortest1);
}

    // This is Object of Above value.
    const subjectname={
        p2019y1type1sem1,p2019y1type1sem2,p2019y1type2sem1,p2019y1type2sem2,
        p2019y2_dcssem3,p2019y2_dcssem4,p2019y3_dcssem5,p2019y3_dcssem6,p2019y4_dcssem7,p2019y4_dcssem8,
        p2019y2_dentcsem3,p2019y2_dentcsem4,p2019y3_dentcsem5,p2019y3_dentcsem6,p2019y4_dentcsem7,p2019y4_dentcsem8,
        p2019y2_ditsem3,p2019y2_ditsem4,p2019y3_ditsem5,p2019y3_ditsem6,p2019y4_ditsem7,p2019y4_ditsem8
    };
    
    
    return (

        <div className="boxComponent">
            <div className="buttonbox" >
                <label>Pattern:</label>
                <Select 
                    options={patternname} value={valueforpattern}
                    onChange={(selectedOption) => setValueforpattern(selectedOption)}
                    isSearchable 
                    placeholder="Select Pattern"
                    required
                />               
            </div>
            {/* <div style={{margin:20, width:165}}></div> */}
            
            <div className="buttonbox">
                <label>Engineering Year:</label>
                <Select 
                    options={yearname} 
                    value={valueforyear} 
                    onChange={(selectedOption) => {
                        setValueforyear(selectedOption);
                        // setValuefordivisionArray(divis[selectedOption.value]);
                        setValueforsemArray(semname[selectedOption.label.toLowerCase()]);
                        setValuedepartmentArray(departmentname[selectedOption.value.split('')[3]])
                        

                    }}
                    isSearchable 
                    placeholder="Select Year"
                    required
                    
                />
               
            </div>
            <div className="buttonbox" >
                <label>Department:</label>
                <Select 
                    options={valuefordepartmentArray} value={valuefordepartment}
                    onChange={(selectedOption) =>{
                            setValuedepartment(selectedOption)
                            setValuefordivisionArray(divisionname[selectedOption.value]);
                        }                       
                    }
                    isSearchable 
                    placeholder="department"
                    required
                />               
            </div>
            <div className="buttonbox">
                <label>Division:</label>
                <Select
                    // this array from above
                    options={valuefordivisionArray} 
                    value={valuefordivision}
                    onChange={(selectedOption)=>{
                        setValuefordivision(selectedOption);
                    }}
                    
                    isSearchable  
                    placeholder="Select Division"
                    required
                />
            </div> 

            <div className="buttonbox">
                <label>Semester:</label>
                <Select
                    // array from year
                    options={valueforsemArray} 
                    value={valueforsem}
                    onChange={(selectedOption)=>{
                        // console.log(selectedOption.value)
                        setValueforsem(selectedOption);
                        var additionString;
                        additionString=valueforpattern.value+valueforyear.value+valuefordepartment.value+selectedOption.value;
                        setValueforsubjectArray(subjectname[additionString]);
                    }}
                    isSearchable 
                    placeholder="Select Semester"
                    required
                />
            </div>

            <div className="buttonbox">
                <label>Subject:</label>
                <Select
                    options={valueforsubjectArray} 
                    value={valueforsubject}
                    onChange={(selectedOption)=>{
                        setValueforsubject(selectedOption);
                    }}
                    isSearchable 
                    placeholder="Select Subject"
                    required
                />
            </div>

            <div className="buttonbox">
                <label>Test:</label>
                <Select
                    options={testname} 
                    value={valuefortest}
                    onChange={(selectedOption)=>{
                        handleOnChange(selectedOption);
                    }}
                    isSearchable 
                    placeholder="Select Test"
                    required
                />
            </div>
            {/* <Context.Provider value={{valuefortest,setValuefortest}}>
                </Context.Provider> */}
        </div>
    );
}

export default Dropdown;
