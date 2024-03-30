import React, { useState } from 'react';

function Login({ onLogin }) {
  const [netid, setNetid] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    onLogin(netid);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        NetID:
        <input type="text" value={netid} onChange={(e) => setNetid(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
