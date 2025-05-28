import React from 'react';
import './App.css';

import Calculator from './Calculator';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" tabIndex={-1}>Template Button</button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{ minHeight: "100vh", paddingTop: "110px" }}>
          <h1 className="title" style={{textAlign:'center', marginBottom:"16px", fontSize:"2rem"}}>EasyCalc</h1>
          <Calculator />
        </div>
      </main>
    </div>
  );
}

export default App;