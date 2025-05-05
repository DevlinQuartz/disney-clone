import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/Images/logo.png';
import { API_ROUTES } from '../config/api';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(API_ROUTES.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      // Registration successful, redirect to login
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="w-32 mb-6" />
          <h2 className="text-3xl font-bold text-white">Create your account</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-500 text-white p-3 rounded text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-white">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 mt-1
                         border border-gray-300 bg-gray-700 text-white
                         placeholder-gray-400 focus:outline-none focus:ring-blue-500
                         focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="text-white">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 mt-1
                         border border-gray-300 bg-gray-700 text-white
                         placeholder-gray-400 focus:outline-none focus:ring-blue-500
                         focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-white">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 mt-1
                         border border-gray-300 bg-gray-700 text-white
                         placeholder-gray-400 focus:outline-none focus:ring-blue-500
                         focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-black text-white font-medium rounded-md
                      border-1 border-white
                      hover:bg-white hover:text-black hover:scale-110 hover:border-2 hover:border-black
                      transition-all duration-300 no-underline text-center whitespace-nowrap
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? 'CREATING ACCOUNT...' : 'REGISTER'}
          </button>
        </form>

        <div className="text-center text-white">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-400">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
