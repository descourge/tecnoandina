// Borra las importaciones de 'useState', 'reactLogo' y 'App.css'
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css' // <-- (Puedes borrar el contenido de este archivo)

// --- Importa tu página ---
import PokedexPage from './features/pokedex/PokedexPage';

function App() {
  // Borra todo el estado y el JSX por defecto de Vite

  // Simplemente retorna tu página
  return (
    <div className="app-container">
      <PokedexPage />
    </div>
  );
}

export default App;