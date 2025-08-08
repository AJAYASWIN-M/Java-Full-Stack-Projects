import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './BN (1).png';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-light position-relative vh-100 d-flex flex-column justify-content-center align-items-center">
      {/* Top-left logo and branding */}
      <div className="position-absolute top-0 start-0 m-4 d-flex align-items-center">
        <img 
          src={logo} 
          alt="BlogNat Logo" 
          style={{ width: '40px', height: '40px', marginRight: '10px' }} 
        />
        <span className="fw-bold fs-4">BlogNat</span>
      </div>

      {/* Main content */}
      <div className="text-center px-4" style={{ maxWidth: '600px' }}>
        <img 
          src={logo} 
          alt="BlogNat Logo" 
          style={{ width: '80px', height: '80px', marginBottom: '20px' }} 
        />

        <h1 className="display-4 fw-bold mb-3" style={{ letterSpacing: '-0.025em' }}>Welcome to BlogNat</h1>
        <p className="lead text-secondary mb-5" style={{ fontWeight: '400', fontSize: '1.125rem' }}>
          Express your thoughts, read others, and connect with ideas.
        </p>
        <div className="d-flex gap-3 justify-content-center">
          <button 
            className="btn btn-dark px-4 py-2" 
            onClick={() => navigate('/login')}
            style={{ 
              borderRadius: '6px', 
              fontWeight: '500',
              minWidth: '120px',
              transition: 'all 0.2s ease'
            }}
          >
            Login
          </button>
          <button 
            className="btn btn-outline-dark px-4 py-2" 
            onClick={() => navigate('/signup')}
            style={{ 
              borderRadius: '6px', 
              fontWeight: '500',
              minWidth: '120px',
              transition: 'all 0.2s ease'
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
