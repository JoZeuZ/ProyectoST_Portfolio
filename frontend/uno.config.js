import { defineConfig, presetUno, presetIcons, presetTypography, presetWebFonts, transformerVariantGroup } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(), 
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // fuentes principales
        sans: 'Inter:300,400,500,600,700',
        serif: 'Merriweather:400,700',
        mono: 'JetBrains Mono:400,500',
      },
      provider: 'google',
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
  safelist: [
    'i-carbon-laptop',
    'text-primary',
    'animate-spin',
    'bg-white',
    'dark:bg-neutral-900',
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#0066cc',
        '50': '#f0f7ff',
        '100': '#e0eefe',
        '200': '#b9ddfe',
        '300': '#7cc2fd',
        '400': '#36a3fa',
        '500': '#0c87eb',
        '600': '#0066cc',
        '700': '#0054a6',
        '800': '#004686',
        '900': '#003d71',
      },
      accent: {
        DEFAULT: '#ff6b00',
        '50': '#fff6ed',
        '100': '#ffead4',
        '200': '#ffd2a9',
        '300': '#ffb773',
        '400': '#ff933c',
        '500': '#ff6b00',
        '600': '#e55800',
        '700': '#cc4102',
        '800': '#a03508',
        '900': '#82310d',
      },
    },
  },
  shortcuts: {
    'btn-primary': 'px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-700 transition-colors',
    'btn-accent': 'px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-600 transition-colors',
    'card': 'bg-white dark:bg-neutral-800 rounded-xl shadow-md p-4 sm:p-6',
    'input-field': 'w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-primary dark:focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary-400',
    'animate-on-scroll': 'transition-all duration-500 ease-out',
    'animate-fade-in': 'animate-fade-in-up duration-500',
  },
});