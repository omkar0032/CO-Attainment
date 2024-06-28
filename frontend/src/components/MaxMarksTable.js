import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { f } from "html2pdf.js";

function MaxMarkTable({ tableName }) {
    // 
    const [data, setData] = useState(0);


    // to store maximunm marks of each co;
    const [valueForMaxMarks, setValueForMaxMarks] = useState({
        CO_1: 1,
        CO_2: 1,
        CO_3: 1,
        CO_4: 1,
        CO_5: 1,
        CO_6: 1
    })

    const [valueForMaxMarksget, setValueForMaxMarksget] = useState({
        CO_1: 0,
        CO_2: 0,
        CO_3: 0,
        CO_4: 0,
        CO_5: 0,
        CO_6: 0
    })


    useEffect(() => {

        getMaxMarks();

    }, []);
    // to handel change in maximum marks
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setValueForMaxMarks((prevState) => ({
            ...prevState,
            [name]: Number(value),
        }))
    };

    // 
    const handelOnclick = () => {
        setData((prev) => !prev);
        getMaxMarks();
        setValueForMaxMarks(valueForMaxMarksget);
    }


    // to get maximum marks from backend
    const getMaxMarks = async () => {
        try {
            const result = await axios.get(`http://localhost:3000/max_marks_for_each_co/${tableName}`);

            if (Array.isArray(result.data) && result.data.length > 0) {
                const firstResult = result.data[0];
                // console.log(firstResult);
                setValueForMaxMarksget(prevState => ({
                    ...prevState,
                    CO_1: firstResult['CO-1'],
                    CO_2: firstResult['CO-2'],
                    CO_3: firstResult['CO-3'],
                    CO_4: firstResult['CO-4'],
                    CO_5: firstResult['CO-5'],
                    CO_6: firstResult['CO-6']
                }));
                //  console.log(valueForMaxMarks);
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    const updateMarks = async (e) => {
        e.preventDefault();
        try {
            console.log(valueForMaxMarks);
            await axios.post(`http://localhost:3000/update_marks/${tableName}`, { valueForMaxMarks });
            toast.success("Data updatde successfullyy!!");

        } catch (error) {
            console.error("Error inserting data:", error);
        }
    };
    return (
        <>
            <Button style={{marginLeft: '47%',marginBottom: '10px'}} onClick={handelOnclick} >{data ? "Hide Marks" : "Enter Marks"}</Button>
            {data && <div className="level-container col-md-9">
                <form >
                    <Table>
                        <thead>
                            <tr>
                                <th>CO-1</th>
                                <th>CO-2</th>
                                <th>CO-3</th>
                                <th>CO-4</th>
                                <th>CO-5</th>
                                <th>CO-6</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="number" name="CO_1" defaultValue={valueForMaxMarksget.CO_1} onChange={handleOnChange}></input></td>
                                <td><input type="number" name="CO_2" defaultValue={valueForMaxMarksget.CO_2} onChange={handleOnChange}></input></td>
                                <td><input type="number" name="CO_3" defaultValue={valueForMaxMarksget.CO_3} onChange={handleOnChange} ></input></td>
                                <td><input type="number" name="CO_4" defaultValue={valueForMaxMarksget.CO_4} onChange={handleOnChange}></input></td>
                                <td><input type="number" name="CO_5" defaultValue={valueForMaxMarksget.CO_5} onChange={handleOnChange}></input></td>
                                <td><input type="number" name="CO_6" defaultValue={valueForMaxMarksget.CO_6} onChange={handleOnChange}></input></td>
                            </tr>
                        </tbody>
                    </Table>
                    {/* <Button className="bg-primary" type="submit">Save</Button> */}
                    <Button style={{marginLeft: '48%',marginBottom: '10px'}} className="bg-primary" onClick={updateMarks}>Edit</Button>
                </form>
            </div>}
        </>
    )
}
export default MaxMarkTable;