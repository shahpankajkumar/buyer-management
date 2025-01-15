import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-fount" style={{ minHeight: '100vh', display:'flex', justifyContent:'center', alignItems:'center' }}>
        <Link to="/" className="btn btn-primary text-decoration-none">
          Go Back to Login
        </Link>
    </div>
  );
};

export default NotFound;
