import presetUno from '@unocss/preset-uno' // Utilidades básicas
import presetIcons from '@unocss/preset-icons' // Iconos
import { presetWind3 } from 'unocss' // Utilidades de Tailwind CSS
import { defineConfig } from 'unocss' // Configuración de Unocss

export default defineConfig({
  presets: [
    presetUno(),
    presetWind3(),
    presetIcons(),
  ],
  theme: {
    colors: {
      // Paleta principal moderna
      primary: {
        DEFAULT: '#3B82F6', // Azul principal
        50: '#EFF6FF',
        100: '#DBEAFE',
        200: '#BFDBFE',
        300: '#93C5FD',
        400: '#60A5FA',
        500: '#3B82F6',
        600: '#2563EB',
        700: '#1D4ED8',
        800: '#1E40AF',
        900: '#1E3A8A',
        950: '#172554',
      },
      // Paleta de acento
      accent: {
        DEFAULT: '#10B981', // Verde vibrante
        50: '#ECFDF5',
        100: '#D1FAE5',
        200: '#A7F3D0',
        300: '#6EE7B7',
        400: '#34D399',
        500: '#10B981',
        600: '#059669',
        700: '#047857',
        800: '#065F46',
        900: '#064E3B',
        950: '#022C22',
      },
      // Grises neutros mejorados
      neutral: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#E5E5E5',
        300: '#D4D4D4',
        400: '#A3A3A3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0A0A0A',
      }
    },
    // Fuentes personalizadas (puedes cambiar esto por la fuente que prefieras)
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    // Bordes redondeados más modernos
    borderRadius: {
      none: '0',
      sm: '0.25rem',
      DEFAULT: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      '2xl': '1.5rem',
      full: '9999px',
    },
    // Sombras estilizadas
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      md: '0 6px 16px -1px rgba(0, 0, 0, 0.1), 0 2px 6px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
  },
  // Personalizar las clases para una experiencia de desarrollo más intuitiva
  shortcuts: {
    'btn': 'py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50',
    'btn-primary': 'btn bg-primary text-white hover:bg-primary-600 focus:ring-primary-500',
    'btn-accent': 'btn bg-accent text-white hover:bg-accent-600 focus:ring-accent-500',
    'card': 'bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 transition-all duration-200',
    'input-field': 'w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-900 dark:text-white',
    'section': 'py-16 px-4',
  }
})