import { createContext, useContext, useState, useEffect } from 'react';

// Creamos el contexto del tema
export const ThemeContext = createContext({
  theme: 'system', // 'light', 'dark', o 'system'
  toggleTheme: () => {},
  setTheme: () => {},
});

// Hook personalizado para usar el contexto del tema
export const useTheme = () => useContext(ThemeContext);

// Proveedor del contexto del tema
export function ThemeProvider({ children }) {
  // Estado para almacenar la preferencia del tema
  const [theme, setTheme] = useState(() => {
    // Recuperar el tema del localStorage si existe
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      return savedTheme;
    }
    
    // Por defecto, usar 'system'
    return 'system';
  });

  // Efecto para aplicar el tema y guardarlo en localStorage
  useEffect(() => {
    // Guardar el tema en localStorage
    localStorage.setItem('theme', theme);
    
    // Aplicar la clase 'dark' según el tema seleccionado
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (theme === 'dark' || (theme === 'system' && prefersDark)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Efecto para escuchar cambios en las preferencias del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Función para actualizar el tema cuando cambian las preferencias del sistema
    const handleChange = () => {
      if (theme === 'system') {
        const root = document.documentElement;
        
        if (mediaQuery.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };
    
    // Suscribirse a cambios en la preferencia del sistema
    mediaQuery.addEventListener('change', handleChange);
    
    // Limpiar la suscripción al desmontar
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Función para alternar entre temas (claro, oscuro, sistema)
  const toggleTheme = () => {
    setTheme(prevTheme => {
      switch (prevTheme) {
        case 'light':
          return 'dark';
        case 'dark':
          return 'system';
        case 'system':
        default:
          return 'light';
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}