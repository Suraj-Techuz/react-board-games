import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TicTacToe from './games/tic-tac-toe/TicTacToe';
import FramerMotion from './games/framer-motion/App';
import MinesweeperGame from './games/minesweeper/MinesweeperGame'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/framer-motion" element={<FramerMotion />} />
        <Route path="/minesweeper" element={<MinesweeperGame />} />
      </Routes>
    </div>
  );
}

export default App;
