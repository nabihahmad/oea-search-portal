import React, { useState } from 'react';
import './Login.css';
import Cookies from 'js-cookie';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check username and password from environment variables
    const validUsername = process.env.REACT_APP_USER;
    const validPassword = process.env.REACT_APP_PASS;

    if (username === validUsername && password === validPassword) {
      // Set base64 encoded value in a cookie
      const token = btoa(`${username}:${password}`);
      Cookies.set('token', token);
      // Redirect to main page
      window.location.href = '/main';
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="app">
      <div className="center">
        <h2 style={{ fontSize: '26px', color: '#007bff' }} >OEA Search System</h2>
        <form className="center" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
