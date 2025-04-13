import { createContext, useState, useEffect, useContext } from 'react';

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
    // Intentar recuperar preferencia guardada en localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'system';
  });

  // Efecto para aplicar el tema y guardarlo en localStorage
  useEffect(() => {
    const applyTheme = () => {
      const root = window.document.documentElement;
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const finalTheme = theme === 'system' ? systemTheme : theme;
      
      if (finalTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };
    
    // Guardar la preferencia del usuario
    localStorage.setItem('theme', theme);
    
    // Aplicar el tema actual
    applyTheme();
    
    // Escuchar cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Función para alternar entre temas (claro, oscuro, sistema)
  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'system';
      return 'light';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}