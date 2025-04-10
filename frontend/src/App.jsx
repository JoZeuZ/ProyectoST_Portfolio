import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
// import Portfolio from './pages/Portfolio';
// import { WhatsappButton } from './components/WspButton';

function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        {/* <Route path="/dev" element={<Portfolio />} /> */}
      </Routes>
      {/* <WhatsappButton /> */}
    </div>
  );
}

export default App;