import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './lib/theme';
import { UfProvider } from './lib/uf';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider><UfProvider><App /></UfProvider></ThemeProvider>
  </StrictMode>,
);
