module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        '8xl': '1920px'
      },
      colors: {
        primary: 'var(--primary)',
        hover: 'var(--hover)',
        'hover-1': 'var(--hover-1)',
        'hover-2': 'var(--hover-2)',
        black: 'var(--black)',
        lightBlack: 'var(--lighter-black)',
        lightestBlack: 'var(--lightest-black)',
        white: 'var(--white)',
        violet: 'var(--violet)',
        pink: 'var(--pink)',
        cyan: 'var(--cyan)',
        blue: 'var(--blue)',
        green: 'var(--green)',
        red: 'var(--red)'
      },
      textColor: {
        base: 'var(--text-base)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
