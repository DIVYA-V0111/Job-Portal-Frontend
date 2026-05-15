import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await loginUser({ email, password });
      const data = response.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);
      localStorage.setItem('email', data.email);
      localStorage.setItem('userId', data.userId);
      if (data.role === 'CANDIDATE') {
        navigate('/candidate-dashboard');
      } else {
        navigate('/recruiter-dashboard');
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 
                    flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl
       w-full max-w-md p-8">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-indigo-600 text-white w-16 h-16 rounded-2xl 
                          flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            JP
          </div>
         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
  Job Portal</h1>
<p className="text-gray-500 dark:text-gray-400 mt-1">
  Sign in to your account</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700
                  dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-transparent transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              cclassName="w-full px-4 py-3 rounded-lg border border-gray-300
           dark:border-gray-600 dark:bg-gray-800 dark:text-white
           focus:outline-none focus:ring-2 focus:ring-indigo-500
           focus:border-transparent transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-800">
              Forgot Password?
            </Link>
          </div>

          <button
  type="submit"
  disabled={loading}
  className="w-full bg-gradient-to-r from-blue-500 to-purple-600
             hover:from-blue-600 hover:to-purple-700
             active:from-blue-700 active:to-purple-800
             text-white font-semibold py-3 rounded-lg
             transition hover:shadow-lg hover:scale-105 duration-200
             disabled:opacity-50 disabled:cursor-not-allowed
             disabled:hover:scale-100">
  {loading ? 'Signing in...' : 'Sign In'}
</button>
        </form>

        {/* Register link */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;