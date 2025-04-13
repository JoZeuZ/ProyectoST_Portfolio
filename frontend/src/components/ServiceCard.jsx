import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ id, title, price, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="card hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 w-full max-w-sm mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        backgroundColor: isHovered ? 'var(--un-preset-wind-color-primary-50)' : 'white',
      }}
    >
      <div className="relative overflow-hidden mb-4">
        <div className={`absolute top-0 right-0 bg-accent text-white px-3 py-1 rounded-bl-lg transition-transform duration-300 ${isHovered ? 'translate-x-0' : 'translate-x-full'}`}>
          Disponible
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2 font-serif">{title}</h3>
        <div className="h-1 w-12 bg-primary rounded mb-3"></div>
      </div>
      
      <p className="text-accent text-xl sm:text-2xl font-bold mb-3">{price}</p>
      <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base">{description}</p>
      
      <div className={`mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70 sm:opacity-0'}`}>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link to={`/servicios/${id}`} className="btn-primary w-full sm:w-1/2 text-center">
            Ver detalles
          </Link>
          <Link to="/#contacto" className="btn-accent w-full sm:w-1/2 text-center">
            Solicitar
          </Link>
        </div>
      </div>
    </div>
  );
}