
import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [states, setStates] = useState([]);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.success) {
      setStates(data.states);
      setError("");
    } else {
      setStates([]);
      setError("username or password wrong");
    }
  };

  return (
    <div className="App">
      {states.length === 0 ? (
        <div>
          <h2>Login</h2>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          {error && <p style={{color: "red"}}>{error}</p>}
        </div>
      ) : (
        <div>
          <h2>List of US States</h2>
          <ul>
            {states.map(state => <li key={state}>{state}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
