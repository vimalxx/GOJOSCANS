import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { CustomThemeProvider } from "./contexts/ThemeContext"; // ✅ Import theme provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomThemeProvider> {/* ✅ Wrap entire app */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CustomThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
