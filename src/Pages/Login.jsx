import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get stored user from localStorage
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      setError('No account found. Please register first.');
      return;
    }

    const user = JSON.parse(storedUser);

    // Check if entered credentials match stored user
    if (email === user.email && password === user.password) {
      setError('');
      navigate('/home'); // Navigate to /home on successful login
    } else {
      setError('Incorrect credentials or account doesn’t exist.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-gray-900 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Email / Username</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Login
        </button>

        <p className="mt-4 text-center text-gray-400 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-red-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
