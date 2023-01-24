import React from 'react';
import './App.css';
import Board from './Components/Board';
import Footer from './Components/Footer';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Board/>
      <Footer/>
    </div>
  );
}

export default App;
