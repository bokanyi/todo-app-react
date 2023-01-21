
import { createTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const light = createTheme({
  typography: {
    fontFamily: 'Figtree',
  },
  palette:{
    primary: {
      main: '#c0b8fa',
      light: '#c0b8fa',
      dark: '#c0b8fa',
      contrastText: '#c0b8fa',
    },
    secondary: {
      main: '#f8d97e',
    },
    error: {
      main: '#f2b1b6',
    },
    warning: {
      main: '#a1fcf5',
    },
    info: {
      main: '#9ecefb',
    },
    success: {
      main: '#fdf7e4',
    },
    button: {
      main: '#000',
      contrastText: '#fff',
      
    },
    
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' && {
              backgroundColor: '#202020',
              color: '#fff',
            }),
        }),
      },
    },
  }

})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={light}>
    <App />
  </ThemeProvider>
)
