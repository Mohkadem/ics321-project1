import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const validUsername = 'admin';
  const validPassword = 'admin';
  // const toggle =
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === validUsername && password === validPassword) {
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };
  return (
    <section className="main">
      <form onSubmit={handleSubmit}>
        <div className="login w-[450px] h-[400px] bg-gray-900 rounded-2xl">
          <h1>Login</h1>
          <p>Nice to have you back sir</p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
