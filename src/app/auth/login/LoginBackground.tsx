import React from 'react';

export default function LoginBackground() {
  return (
      <div style={{ backgroundColor: '#f9fafc', position: 'relative' }}>
        <img
            src="/images/login-background.jpg"
            alt="Login background image"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <h1>Co-assemble</h1>
          <h3>WELCOME!</h3>
          <p>Co-assemble is an app that will connect people all over the world.</p>
        </div>
      </div>
  );
}