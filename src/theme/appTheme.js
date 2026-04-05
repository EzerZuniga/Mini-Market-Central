import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles';

const baseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0f766e',
      light: '#14b8a6',
      dark: '#115e59'
    },
    secondary: {
      main: '#f97316',
      light: '#fb923c',
      dark: '#c2410c'
    },
    success: {
      main: '#15803d'
    },
    warning: {
      main: '#d97706'
    },
    error: {
      main: '#dc2626'
    },
    background: {
      default: '#f5f7fb',
      paper: '#ffffff'
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569'
    },
    divider: '#dbe3f0'
  },
  shape: {
    borderRadius: 16
  },
  typography: {
    fontFamily: '"Manrope", "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Sora", "Manrope", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontFamily: '"Sora", "Manrope", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em'
    },
    h3: {
      fontFamily: '"Sora", "Manrope", sans-serif',
      fontWeight: 700
    },
    h4: {
      fontFamily: '"Sora", "Manrope", sans-serif',
      fontWeight: 700
    },
    button: {
      textTransform: 'none',
      fontWeight: 700
    }
  },
  shadows: [
    'none',
    '0 2px 8px rgba(15, 23, 42, 0.04)',
    '0 4px 12px rgba(15, 23, 42, 0.06)',
    '0 8px 20px rgba(15, 23, 42, 0.08)',
    '0 10px 24px rgba(15, 23, 42, 0.1)',
    '0 12px 26px rgba(15, 23, 42, 0.12)',
    '0 14px 30px rgba(15, 23, 42, 0.14)',
    '0 16px 32px rgba(15, 23, 42, 0.16)',
    '0 18px 34px rgba(15, 23, 42, 0.18)',
    '0 20px 36px rgba(15, 23, 42, 0.2)',
    '0 22px 38px rgba(15, 23, 42, 0.22)',
    '0 24px 40px rgba(15, 23, 42, 0.24)',
    '0 26px 42px rgba(15, 23, 42, 0.26)',
    '0 28px 44px rgba(15, 23, 42, 0.28)',
    '0 30px 46px rgba(15, 23, 42, 0.3)',
    '0 32px 48px rgba(15, 23, 42, 0.32)',
    '0 34px 50px rgba(15, 23, 42, 0.34)',
    '0 36px 52px rgba(15, 23, 42, 0.36)',
    '0 38px 54px rgba(15, 23, 42, 0.38)',
    '0 40px 56px rgba(15, 23, 42, 0.4)',
    '0 42px 58px rgba(15, 23, 42, 0.42)',
    '0 44px 60px rgba(15, 23, 42, 0.44)',
    '0 46px 62px rgba(15, 23, 42, 0.46)',
    '0 48px 64px rgba(15, 23, 42, 0.48)',
    '0 50px 66px rgba(15, 23, 42, 0.5)'
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          colorScheme: 'light'
        },
        body: {
          background:
            'radial-gradient(circle at 8% 12%, rgba(15,118,110,0.16), transparent 35%), radial-gradient(circle at 90% 6%, rgba(249,115,22,0.14), transparent 30%), #f5f7fb',
          minHeight: '100vh'
        },
        '#root': {
          minHeight: '100vh'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #dbe3f0',
          boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 16,
          minHeight: 40
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(12px)',
          backgroundColor: alpha('#ffffff', 0.9),
          color: '#0f172a',
          borderBottom: '1px solid #dbe3f0'
        }
      }
    }
  }
});

export const appTheme = responsiveFontSizes(baseTheme);
