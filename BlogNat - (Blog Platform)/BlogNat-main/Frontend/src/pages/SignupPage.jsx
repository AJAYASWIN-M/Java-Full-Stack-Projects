import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './BN (1).png';



const SignupPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/users/signup', formData);
      setMessage('Registered successfully! You can now log in.');
    } catch (err) {
      setMessage(err.response?.data || 'Something went wrong!');
    }
  };

  return (
    <div className="bg-light d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="bg-white p-4 rounded shadow-sm" style={{ width: '380px', maxWidth: '90%', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h2 className="text-center mb-4 fw-bold">Sign Up</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-secondary fw-medium small mb-2">Name</label>
            <input 
              type="text" 
              name="username" 
              className="form-control" 
              onChange={handleChange} 
              required
              style={{ 
                borderRadius: '6px', 
                padding: '10px 14px', 
                borderColor: '#e5e7eb',
                fontSize: '0.95rem'
              }}
              placeholder="Enter your name"
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label text-secondary fw-medium small mb-2">Email</label>
            <input 
              type="email" 
              name="email"
              className="form-control" 
              onChange={handleChange} 
              required
              style={{ 
                borderRadius: '6px', 
                padding: '10px 14px', 
                borderColor: '#e5e7eb',
                fontSize: '0.95rem'
              }}
              placeholder="Enter your email"
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label text-secondary fw-medium small mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              className="form-control" 
              onChange={handleChange} 
              required
              style={{ 
                borderRadius: '6px', 
                padding: '10px 14px', 
                borderColor: '#e5e7eb',
                fontSize: '0.95rem'
              }}
              placeholder="Create a password"
            />
            <div className="form-text mt-1" style={{ fontSize: '0.75rem' }}>
              Password must be at least 8 characters
            </div>
          </div>

          <div className="position-absolute top-0 start-0 m-4 d-flex align-items-center">
        <img 
          src={logo} 
          alt="BlogNat Logo" 
          style={{ width: '40px', height: '40px', marginRight: '10px' }} 
        />
        <span className="fw-bold fs-4">BlogNat</span>
      </div>
          
          <button 
            type="submit" 
            className="btn btn-dark w-100 py-2"
            style={{ 
              borderRadius: '6px', 
              fontWeight: '500',
              marginTop: '8px'
            }}
          >
            Create Account
          </button>
          
          {message && (
            <div className={`mt-3 text-center p-2 rounded ${message.includes('successfully') ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`} style={{ fontSize: '0.85rem' }}>
              {message}
            </div>
          )}
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>
            Already have an account? <a href="#" onClick={() => navigate('/login')} className="text-dark fw-medium text-decoration-none">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;