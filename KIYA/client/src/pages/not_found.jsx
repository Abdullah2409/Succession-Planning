import React from 'react';
import notFoundImg from "../assets/not_found.svg";

const NotFound = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontWeight: 'bold' }}>404 - Not Found</h1>
        <p style={{ fontWeight: 'bold' }}>The page you're looking for does not exist.</p>
        <p style={{ fontWeight: 'bold' }}>If you need assistance, please contact support.</p>
        <p style={{ fontWeight: 'bold' }}>Alternatively, you can navigate back to the <a href="/" style={{ fontWeight: 'bold', color: 'blue', textDecoration: 'underline' }}>homepage</a>.</p>
      </div>
      <img src={notFoundImg} alt="Not Found" style={{ marginTop: '20px', maxWidth: '100%', height: 'auto' }} />
    </div>
  );
}

export default NotFound;
