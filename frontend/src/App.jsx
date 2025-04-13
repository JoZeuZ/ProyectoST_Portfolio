import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Portfolio from './pages/Portfolio';
import { WhatsappButton } from './components/WspButton';
import BackToTop from './components/BackToTop';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-300">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/dev" element={<Portfolio />} />
        </Routes>
        <WhatsappButton number="123456789" />
        <BackToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;