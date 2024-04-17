import React, { useEffect, useState } from "react";
import { UseData } from "../NewContext";
import axios from "axios";
const Level = ({ tableName }) => {
  const [countLevelOne, setCountLevelOne] = useState({
    UT: 0,
    UA: 0,
  });

  const [averageData1, setAverageData1] = useState({});

  const [countLevelTwo, setCountLevelTwo] = useState({
    UT: 0,
    UA: 0,
  });

  const [countLevelThree, setCountLevelThree] = useState({
    UT: 0,
    UA: 0,
  });

  // from NewContext.js and value modified i.e set not used
  const { countLevelOneUT, setCountLevelOneUT } = UseData();
  const { countLevelOneUA, setCountLevelOneUA } = UseData();

  const { countLevelTwoUT, setCountLevelTwoUT } = UseData();
  const { countLevelTwoUA, setCountLevelTwoUA } = UseData();

  const { countLevelThreeUT, setCountLevelThreeUT } = UseData();
  const { countLevelThreeUA, setCountLevelThreeUA } = UseData();

  const { valueforacadamicyearlabel, setValueForAcademicYearlabel } = UseData();
  const handleOnChange = (level, key, value) => {
    switch (level) {
      case 1:
        setCountLevelOne((prevState) => ({
          ...prevState,
          [key]: value,
        }));
        if (key == "UT") {
          setCountLevelOneUT(value);
        } else {
          setCountLevelOneUA(value);
        }
        break;
      case 2:
        setCountLevelTwo((prevState) => ({
          ...prevState,
          [key]: value,
        }));
        if (key == "UT") {
          setCountLevelTwoUT(value);
        } else {
          setCountLevelTwoUA(value);
        }
        break;
      case 3:
        setCountLevelThree((prevState) => ({
          ...prevState,
          [key]: value,
        }));
        if (key == "UT") {
          setCountLevelThreeUT(value);
        } else {
          setCountLevelThreeUA(value);
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    calculate_average();
  }, []);
  const calculate_average = async () => {
    try {
      // Validate academicYear
      const academicYear = valueforacadamicyearlabel;
      if (!academicYear) {
        console.error("Academic year is not defined");
        return;
      }

      // Split the academic year and validate
      const academicYearParts = academicYear.split("-");
      if (academicYearParts.length !== 2) {
        console.error("Invalid academic year format");
        return;
      }

      const startingYear = parseInt(academicYearParts[0], 10);

      // API call and data processing
      const response = await axios.get(
        `http://localhost:3000/average_attainment_pastYears/${tableName}/${startingYear}`
      );

      const rows = response.data;
      let sumUA60 = 0;
      let sumUA66 = 0;
      let sumUAPass = 0;
      let sumUT60 = 0;
      let sumUT66 = 0;
      let sumUTPass = 0;
      rows.forEach((row) => {
        sumUA60 += row.UA_60;
        sumUA66 += row.UA_66;
        sumUAPass += row.UA_PASS;
        sumUT60 += row.UT_60;
        sumUT66 += row.UT_66;
        sumUTPass += row.UT_PASS;
      });

      const numRows = rows.length;

      const averageData = {
        averageUA60: sumUA60 / numRows + 2,
        averageUA66: sumUA66 / numRows + 2,
        averageUAPass: sumUAPass / numRows + 2,
        averageUT60: sumUT60 / numRows + 2,
        averageUT66: sumUT66 / numRows + 2,
        averageUTPass: sumUTPass / numRows + 2,
      };

      // Update contexts
      setCountLevelOneUA(averageData.averageUA66);
      setCountLevelOneUT(averageData.averageUT66);
      setCountLevelTwoUA(averageData.averageUA60);
      setCountLevelTwoUT(averageData.averageUT60);
      setCountLevelThreeUA(averageData.averageUAPass);
      setCountLevelThreeUT(averageData.averageUTPass);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  return (
    <div className="level-container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>UT</th>
            <th>UA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Level 3</td>
            <td>
              <input
                type="number"
                value={countLevelThreeUT}
                onChange={(e) => handleOnChange(3, "UT", e)}
              />
            </td>
            <td>
              <input
                type="number"
                value={countLevelThreeUA}
                onChange={(e) => handleOnChange(3, "UA", e)}
              />
            </td>
          </tr>
          <tr>
            <td>Level 2</td>
            <td>
              <input
                type="number"
                value={countLevelTwoUT}
                onChange={(e) => handleOnChange(2, "UT", e)}
              />
            </td>
            <td>
              <input
                type="number"
                value={countLevelTwoUA}
                onChange={(e) => handleOnChange(2, "UA", e)}
              />
            </td>
          </tr>
          <tr>
            <td>Level 1</td>
            <td>
              <input
                type="number"
                value={countLevelOneUT}
                onChange={(e) => handleOnChange(1, "UT", e)}
              />
            </td>
            <td>
              <input
                type="number"
                value={countLevelOneUA}
                onChange={(e) => handleOnChange(1, "UA", e)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Level;