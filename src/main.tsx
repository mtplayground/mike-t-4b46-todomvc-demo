import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
