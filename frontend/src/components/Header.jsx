import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-900 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">ServicioTécnico</Link>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-blue-200">Inicio</Link>
          <Link to="/dev" className="hover:text-blue-200">Portafolio Dev</Link>
        </div>
      </nav>
    </header>
  );
}