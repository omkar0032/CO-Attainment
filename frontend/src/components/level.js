import React, { useState } from 'react';
import {UseData} from "../NewContext";
const Level = () => {
  const [countLevelOne, setCountLevelOne] = useState({
    UT: 0,
    UA: 0
  });

  const [countLevelTwo, setCountLevelTwo] = useState({
    UT: 0,
    UA: 0
  });

  const [countLevelThree, setCountLevelThree] = useState({
    UT: 0,
    UA: 0
  });

  // from NewContext.js and value modified i.e set not used
  const {countLevelOneUT,setCountLevelOneUT}=UseData();
  const {countLevelOneUA,setCountLevelOneUA}=UseData();

  const {countLevelTwoUT,setCountLevelTwoUT}=UseData();
  const {countLevelTwoUA,setCountLevelTwoUA}=UseData();

  const {countLevelThreeUT,setCountLevelThreeUT}=UseData();
  const {countLevelThreeUA,setCountLevelThreeUA}=UseData();

  const handleOnChange = (level, key, value) => {
    switch (level) {
      case 1:
        setCountLevelOne((prevState) => ({
          ...prevState,
          [key]: value
        }));
        if(key=="UT"){
          setCountLevelOneUT(value);
        }else{
          setCountLevelOneUA(value);
        }
        break;
      case 2:
        setCountLevelTwo((prevState) => ({
          ...prevState,
          [key]: value
        }));
        if(key=="UT"){
          setCountLevelTwoUT(value);
          // console.log(countLevelThreeUT);
        }else{
          setCountLevelTwoUA(value);
        }
        break;
      case 3:
        setCountLevelThree((prevState) => ({
          ...prevState,
          [key]: value
        }));
        if(key=="UT"){
          setCountLevelThreeUT(value);
          // console.log(countLevelThreeUT);
        }else{
          setCountLevelThreeUA(value);
          // console.log(countLevelThreeUT);
        }
        break;
      default:
        break;
    }
  };

  const inputdata = (level, key) => {
    return (
      <input
        type="number"
        onChange={(e) => {
          handleOnChange(level, key, e.target.value);
        }}
      />
    );
  };

  return (
    <div className='level-container'>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>MT</th>
            <th>UA</th>
          </tr>
          <tr>
            <td>Level 3</td>
            <td>{inputdata(3, 'UT')}</td>
            <td>{inputdata(3, 'UA')}</td>
          </tr>
          <tr>
            <td>Level 2</td>
            <td>{inputdata(2, 'UT')}</td>
            <td>{inputdata(2, 'UA')}</td>
          </tr>
          <tr>
            <td>Level 1</td>
            <td>{inputdata(1, 'UT')}</td>
            <td>{inputdata(1, 'UA')}</td>
          </tr>
        </tbody>
      </table>
      <br />
    </div>
  );
};

export default Level;
