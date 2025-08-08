import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './BN (1).png';


const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/users/login', formData);
      // Save user info to localStorage if needed
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/blogplatform'); // or wherever you want to go after login
    } catch (err) {
      setMessage(err.response?.data || 'Invalid email or password');
    }
  };

  return (
    <div className="bg-light d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="bg-white p-4 rounded shadow-sm" style={{ width: '380px', maxWidth: '90%', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h2 className="text-center mb-4 fw-bold">Login</h2>
        
        <form onSubmit={handleSubmit}>
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
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label text-secondary fw-medium small m-0">Password</label>
              <a href="#" className="text-dark small text-decoration-none" style={{ fontSize: '0.8rem', fontWeight: '500' }}>Forgot password?</a>
            </div>
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
              placeholder="Enter your password"
            />
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
            Log In
          </button>
          
          {message && (
            <div className="mt-3 text-center p-2 rounded" style={{ 
              backgroundColor: 'rgba(220, 38, 38, 0.1)', 
              color: '#dc2626',
              fontSize: '0.85rem'
            }}>
              {message}
            </div>
          )}
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>
            Don't have an account? <a href="#" onClick={() => navigate('/signup')} className="text-dark fw-medium text-decoration-none">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;