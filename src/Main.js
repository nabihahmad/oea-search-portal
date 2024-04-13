import React, { useState } from 'react';
import jsonData from './data/data.json';
// import axios from 'axios';
import './Main.css';
import Cookies from 'js-cookie';

const BALLOT_BOXES = [
    {from: 1, to: 7065, floor: "GF", box: 1},
    {from: 7066, to: 9957, floor: "GF", box: 2},
    {from: 9958, to: 12541, floor: "GF", box: 3},
    {from: 12542, to: 15865, floor: "GF", box: 4},
    {from: 15866, to: 19316, floor: "GF", box: 5},
    {from: 19317, to: 22892, floor: "GF", box: 6},
    {from: 22893, to: 26270, floor: "GF", box: 7},
    {from: 26271, to: 29515, floor: 1, box: 8},
    {from: 29516, to: 32679, floor: 1, box: 9},
    {from: 32680, to: 35858, floor: 1, box: 10},
    {from: 35859, to: 39124, floor: 1, box: 11},
    {from: 39125, to: 42315, floor: 1, box: 12},
    {from: 42316, to: 45606, floor: 1, box: 13},
    {from: 45607, to: 48896, floor: 1, box: 14},
    {from: 48897, to: 52156, floor: 2, box: 15},
    {from: 52157, to: 55336, floor: 2, box: 16},
    {from: 55337, to: 58415, floor: 2, box: 17},
    {from: 58416, to: 61277, floor: 2, box: 18},
    {from: 61278, to: 63940, floor: 3, box: 19},
    {from: 63941, to: 66121, floor: 3, box: 20}
];

function Main() {
  const isLoggedIn = !!Cookies.get('token');
  if (!isLoggedIn)
    window.location.href = '/';
  const [message, setMessage] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [mobileNumberValue, setMobileNumberValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    setMessage('');
    const result = jsonData.find(item => item.Code === parseInt(searchValue));
    if (result != null) {
      setMobileNumberValue(result.Mobile);
      result.Updated_Mobile = "";
      for (var i = 0; i < BALLOT_BOXES.length; i++) {
        if (parseInt(searchValue) >= BALLOT_BOXES[i].from && parseInt(searchValue) <= BALLOT_BOXES[i].to) {
          result.Floor = BALLOT_BOXES[i].floor;
          result.Ballot_Box = BALLOT_BOXES[i].box;
          setMessage('Floor: ' + result.Floor + ', Ballot Box: ' + result.Ballot_Box);
        }
      }
      result.Registered = "YES/NO";
      console.log(result);
      setSearchResult(result);
    } else {
      setMessage('Engineer with ID ' + searchValue + ' not found'); 
    }
  };

  const handleRegister = () => {
    setMessage('Engineer registered successfully');
    console.log(parseInt(searchValue));
  }

  const handleMobileNumberUpdate = () => {
    setMessage('Mobile updated successfully');
    console.log("update mobile", mobileNumberValue);
  }
  
  const logout = () => {
    Cookies.remove('token');
    window.location.href = '/';
  }

  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: '20px', position: 'top' }}>
      <button className="red-button" onClick={logout}>logout</button>
      </div>
        <div className="app">
        <div className="center">
            <p style={{ fontSize: '20px', color: 'green' }} >{message}</p>
            <input
                className="input"
                type="number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Enter a number"
                autoComplete="on" // Enable autocompletion
                list="data-keys" // Specify the datalist ID for autocompletion
            />
            <datalist id="data-keys">
            {jsonData.map((item, index) => (
                <option key={index} value={item.Code} />
            ))}
            </datalist>
            <button className="button" onClick={handleSearch}>Search</button>
            {searchResult && (
            <div>
                <table className="table">
                <tbody>
                    {Object.keys(searchResult).map(key => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td><strong>{searchResult[key]}</strong></td>
                    </tr>
                    ))}
                </tbody>
                </table>
                <button style={{ marginTop: '10px' }} className="button" onClick={handleRegister}>Register Engineer</button>
                <br/>
                {/* <a style={{ fontSize: '20px'}} href={process.env.REACT_APP_OEA_BACKEND_HOST+"/register"} target="_blank" >Export Registered Engineers</a>
                <br/> */}
                <input
                className="input"
                type="number"
                value={mobileNumberValue}
                onChange={(e) => setMobileNumberValue(e.target.value)}
                placeholder="Enter a number"
                style={{ marginTop: '20px' }}
                />
                <br/>
                <button style={{ marginTop: '10px' }} className="button" onClick={handleMobileNumberUpdate}>Update Mobile Number</button>
                {/* <br/>
                <a style={{ fontSize: '20px'}} href={process.env.REACT_APP_OEA_BACKEND_HOST+"/mobile"} target="_blank" >Export Updated Mobiles</a> */}
            </div>
            )}
        </div>
        </div>
    </div>
  );
}

export default Main;
