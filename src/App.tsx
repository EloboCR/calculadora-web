import React from 'react';
import { Calculator } from './ui/Calculator';
import './styles/app.css';

export const App: React.FC = () => {
  return (
    <main className="app-wrapper">
      <header className="app-header">
        <h1>
          <span>🧮</span> Calculadora Web
        </h1>
        <p className="app-subtitle">Cálculo aritmético de alta precisión con soporte de teclado</p>
      </header>

      <Calculator />
    </main>
  );
};

export default App;
