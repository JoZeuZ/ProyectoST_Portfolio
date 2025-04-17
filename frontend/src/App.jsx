import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { WhatsappButton } from './components/WspButton';
import BackToTop from './components/BackToTop';
import { ThemeProvider } from './contexts/ThemeContext';

// Carga perezosa de las páginas
const Home = lazy(() => import('./pages/Home'));
const Servicios = lazy(() => import('./pages/Servicios'));
const ServicioDetalle = lazy(() => import('./pages/ServicioDetalle'));
const SeguimientoSolicitud = lazy(() => import('./pages/SeguimientoSolicitud'));
const Portfolio = lazy(() => import('./pages/Portfolio'));

// Componente de carga para páginas con Suspense
function PageLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center">
        <div className="inline-block w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-3 text-neutral-600 dark:text-neutral-300 text-sm">Cargando página...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-300">
        <NavBar />
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/servicios/:id" element={<ServicioDetalle />} />
            <Route path="/seguimiento" element={<SeguimientoSolicitud />} />
            <Route path="/dev" element={<Portfolio />} />
          </Routes>
        </Suspense>
        <WhatsappButton number="123456789" />
        <BackToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;