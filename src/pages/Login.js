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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ebf4ff, #e0e7ff)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '440px',
        padding: '32px'
      }}>

        {/* Logo */}
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <div style={{
            background: 'linear-gradient(135deg, #12B3EB, #5460F9)',
            color: 'white',
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            JP
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: '0 0 4px'
          }}>
            Job Portal
          </h1>
          <p style={{color: '#6b7280', margin: 0}}>
            Sign in to your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fef2f2',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>

          {/* Email */}
          <div style={{marginBottom: '16px'}}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
                color: '#1f2937',
                background: 'white'
              }}
            />
          </div>

          {/* Password */}
          <div style={{marginBottom: '8px'}}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
                color: '#1f2937',
                background: 'white'
              }}
            />
          </div>

          {/* Forgot Password */}
          <div style={{textAlign: 'right', marginBottom: '16px'}}>
            <Link
              to="/forgot-password"
              style={{
                fontSize: '14px',
                color: '#4f46e5',
                textDecoration: 'none'
              }}>
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              background: loading
                ? '#9ca3af'
                : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxSizing: 'border-box'
            }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Register Link */}
        <p style={{
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '14px',
          marginTop: '24px',
          marginBottom: 0
        }}>
          Don't have an account?{' '}
          <Link
            to="/register"
            style={{
              color: '#4f46e5',
              fontWeight: '600',
              textDecoration: 'none'
            }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;