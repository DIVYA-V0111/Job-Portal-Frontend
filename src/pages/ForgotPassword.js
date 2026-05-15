import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { forgotPassword, verifyOtp, resetPassword } from '../services/api';

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await forgotPassword(email);
      setMessage('OTP sent to your email successfully!');
      setStep(2);
    } catch (err) {
      setError('Email not found');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await verifyOtp(email, otp);
      setMessage('OTP verified successfully!');
      setStep(3);
    } catch (err) {
      setError('Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await resetPassword(email, otp, newPassword);
      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Job Portal</h2>
            <h5 className="text-center mb-4">Forgot Password</h5>

            {/* Progress Steps */}
            <div className="d-flex justify-content-center mb-4 gap-2">
              <span className={`badge ${step >= 1 ? 'bg-primary' : 'bg-secondary'}`}>
                1. Email
              </span>
              <span className={`badge ${step >= 2 ? 'bg-primary' : 'bg-secondary'}`}>
                2. OTP
              </span>
              <span className={`badge ${step >= 3 ? 'bg-primary' : 'bg-secondary'}`}>
                3. New Password
              </span>
            </div>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Step 1 - Enter Email */}
            {step === 1 && (
              <form onSubmit={handleSendOtp}>
                <div className="mb-3">
                  <label className="form-label">Enter your registered email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}>
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            )}

            {/* Step 2 - Enter OTP */}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp}>
                <div className="mb-3">
                  <label className="form-label">Enter OTP sent to {email}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter 6 digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
            )}

            {/* Step 3 - New Password */}
            {step === 3 && (
              <form onSubmit={handleResetPassword}>
                <div className="mb-3">
                  <label className="form-label">Enter New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}>
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            )}

            <div className="text-center mt-3">
              <Link to="/login">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;