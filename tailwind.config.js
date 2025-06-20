module.exports = {
  darkMode: 'class', // Explicitly set to 'class' strategy
  theme: {
    extend: {
      colors: {
        // Optionally extend with your custom variables if needed
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: 'var(--color-primary)',
        // Add other custom variables as needed
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
    },
  },
  plugins: [],
};