import React from 'react';
import './App.css';

import Routes from './routes';

function App() {
  return (
    <Routes />
  );
}

export default App;


/* 
// Interface do TypeScript atribui a essa palavra as propriedades obrigatórias ou não(com "?") do componente
interface HeaderProps {
  title: string;
}

// React.FC é a definição do typescript para um componente do React
// Para passar propriedades de um componente basta passar entre sinais de <> as propriedades da interface
// "{}" dentre de um JSX insere algo de JavaScript dentro de um HTML

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  )
}
*/