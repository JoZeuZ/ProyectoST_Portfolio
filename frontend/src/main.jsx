import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './main.css'
import './index.css'

// Importar componentes con lazy loading
const App = lazy(() => import('./App.jsx'))

// Componente de carga para Suspense
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-neutral-900">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-neutral-600 dark:text-neutral-300">Cargando...</p>
      </div>
    </div>
  )
}

// Observador de rendimiento para mejorar métricas
if (import.meta.env.DEV) {
  const reportWebVitals = async () => {
    const { onCLS, onFID, onLCP, onTTFB } = await import('web-vitals')
    onCLS(console.log)
    onFID(console.log)
    onLCP(console.log)
    onTTFB(console.log)
  }
  reportWebVitals()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
)