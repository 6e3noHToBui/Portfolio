import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import './i18n';
import { LanguageProvider } from './hooks/ChangeLanguage';
import { GlobalProvider } from "./context/globalContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </GlobalProvider>
);
