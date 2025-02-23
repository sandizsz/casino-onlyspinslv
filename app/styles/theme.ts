export const theme = {
  colors: {
    primary: '#FFDD00', // Electric Yellow
    secondary: '#00A3FF', // Electric Blue
    background: '#0D1117', // Deep Black
    backgroundAlt: '#1E2A44', // Storm Blue
    text: '#FFFFFF', // White
    textMuted: '#C0C0C0', // Metallic Silver
  },
  effects: {
    glow: {
      primary: '[text-shadow:_0_0_30px_#FFDD00]',
      secondary: 'shadow-[0_0_20px_rgba(0,163,255,0.3)]',
      hover: 'shadow-[0_0_30px_rgba(0,163,255,0.5)]',
    },
    gradients: {
      main: 'bg-gradient-to-b from-[#1E2A44] to-[#0D1117]',
    },
  },
  components: {
    card: {
      base: 'border border-[#00A3FF] bg-[#1E2A44]/50 hover:bg-[#1E2A44] transition-all duration-300',
      glow: 'shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:shadow-[0_0_30px_rgba(0,163,255,0.5)]',
    },
    button: {
      base: 'bg-[#00A3FF] hover:bg-[#FFDD00] text-white hover:text-[#0D1117] transition-all duration-300',
      glow: 'shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:shadow-[0_0_30px_rgba(255,221,0,0.5)]',
    },
  },
}
