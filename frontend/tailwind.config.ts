/// Tailwind CSS config
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

/* Export config */
export default <Config>{
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        smiley: ['smiley-sans', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
};
