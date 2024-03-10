import React, { useState } from 'react';
import jsonData from './data/data.json';
import './App.css';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    const result = jsonData.find(item => item.Code === parseInt(searchValue));
    setSearchResult(result);
  };

  return (
    <div className="app">
      <div className="center">
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
          <table className="table">
            <tbody>
              {Object.keys(searchResult).map(key => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{searchResult[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
